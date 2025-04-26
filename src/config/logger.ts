import { createLogger, format, transports } from "winston";

const { combine, errors, json, timestamp } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp(),
    json(),
  ),
  transports: [
    new transports.File({
      filename: 'error.log',
      level: 'error'
    }),
    new transports.File({
      filename: 'combined.log',
      level: 'info'
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      errors({ stack: true }),
      timestamp(),
      json(),
    )
  }))
}

export default logger;