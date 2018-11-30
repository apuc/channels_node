import SocketIO from 'socket.io';

import { AppChannelsAction } from "../actions/channels.action";
import { AppMessagesAction } from "../actions/messages.action";

export class AppSocket {

  constructor(private io: SocketIO.Server) {
    this.listen();
  }

  private listen(): void {
    this.io.on('connection', (socket: SocketIO.Socket) => {
      console.log('Connected client on port %s.', process.env.PORT);
      this.initSocketActions(this.io, socket);
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  private initSocketActions(io: SocketIO.Server, socket: SocketIO.Socket): void {
    new AppChannelsAction(io, socket);
    new AppMessagesAction(io, socket);
  }


}