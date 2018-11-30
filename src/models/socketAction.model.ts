import SocketIO from 'socket.io';
import appRequest from "request";

export class AppSocketActionModel {

  public request: any;

  constructor(public io: SocketIO.Server, public socket: SocketIO.Socket) {
    this.request = appRequest;
    this.bootstrap();
  }

  public bootstrap() {}

}