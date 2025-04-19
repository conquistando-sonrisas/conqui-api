"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 8080;
const server = app_1.app.listen(PORT, () => {
    process.stdout.write(`server listening on port: ${PORT}\n`);
});
function gracefulShutdown() {
    server.close();
}
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
