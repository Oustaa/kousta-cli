import 'dotenv/config';
import 'module-alias/register';
import http from 'node:http';
import APP from './app';
import validateEnv from './utils/validateEnv';
import PostController from './resources/post/post.controler';
import logger from './utils/Logger';

validateEnv();

const PORT = process.env.PORT;

const app = APP.getApp([new PostController()]);

const server = http.createServer(app);

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

  switch (error.code) {
    case 'EACCES':
      logger.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  logger.log(`Server started listening on ${bind}`, 'info');
}

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
