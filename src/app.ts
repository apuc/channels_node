import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

class App {

  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void{

  }

  public getApp() {
    return this.app
  }

}

export default new App().getApp();