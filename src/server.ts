import { app } from './app';

const PORT = 8080;
const server = app.listen(PORT, () => {
  process.stdout.write(`server listening on port: ${PORT}\n`)
})

function gracefulShutdown() {
  server.close();
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);