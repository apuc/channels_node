import { AppSocketActionModel } from "../models/socketAction.model";

export class AppChannelsAction extends AppSocketActionModel {

  bootstrap() {
    this.socket.on('joinChannels', (channelsIds: string[]) => {
      channelsIds.forEach((id: string) => {
        this.socket.join(id);
        this.socket.emit('systemMessage', {message: `You joined to ${id}`});
      });
    });

    this.socket.on('joinChannel', (channelId: string) => {
      this.socket.join(channelId);
      this.socket.emit('systemMessage', {message: `You joined to ${channelId}`});
      this.socket.broadcast.to(channelId).emit('systemMessage', {message: `Someone joined!`});
    });

    this.socket.on('leaveChannel', (channelId: string) => {
      this.socket.leave(channelId, () => {
        this.socket.emit('systemMessage', {message: `You leave channel ${channelId}!`});
        this.socket.broadcast.to(channelId).emit('systemMessage', {message: `Someone leave channel!`});
      });
    });
  }

}