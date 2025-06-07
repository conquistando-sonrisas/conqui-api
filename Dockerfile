FROM node:22-alpine AS base
WORKDIR /home/node
EXPOSE 8080

FROM base AS prod
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.npm \
    yarn install
ENV NODE_ENV=production
COPY --chown=node:node . .
USER node
CMD ["yarn", "run", "start"]