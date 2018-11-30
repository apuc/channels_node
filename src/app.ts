import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import {createServer, Server} from 'http';
import SocketIO from 'socket.io';

import { AppRouter } from './router';
import { AppSocket } from './components/AppSocket';

export class App {

  private readonly app: express.Application;
  private readonly io: SocketIO.Server;
  private readonly http: Server;

  constructor(NODE_ENV: string = 'development', PORT: string = '2368') {
    dotenv.config();
    process.env.NODE_ENV = process.env.NODE_ENV || NODE_ENV;
    process.env.PORT = process.env.PORT || PORT;

    this.app = express();
    this.http = createServer(this.app);
    this.io = SocketIO(this.http);

    this.config();
    this.httpListen();
    this.socketListen();
  }

  private config(): void {
    this.app.use(helmet());
    new AppRouter(this.app);
  }

  private httpListen(): void {
    this.http.listen(process.env.PORT, () => {
      console.log('The server is running in port: ', process.env.PORT)
    });
  }

  private socketListen(): void {
    new AppSocket(this.io);
  }

}
