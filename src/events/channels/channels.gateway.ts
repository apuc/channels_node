import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChannelsGateway {
    @WebSocketServer()
    private server: Server;

    @SubscribeMessage('joinChannels')
    onJoinChannels(socket: Socket, channelsIds: number[]): void {
        socket.join(channelsIds.join().split(','));
        channelsIds.forEach((id: number) => {
            socket.emit('systemMessage', { message: `You joined to ${id}` });
        });
    }

    @SubscribeMessage('joinChannel')
    onJoinChannel(socket: Socket, channelId: number): void {
        console.log('channelId', channelId);
        socket.join(`${channelId}`);
        socket.emit('systemMessage', {message: `You joined to ${channelId}`});
        socket.broadcast.to(`${channelId}`).emit('systemMessage', {message: `Someone joined!`});
    }

    @SubscribeMessage('leaveChannel')
    onLeaveChannel(socket: Socket, channelId: number): void {
        console.log(channelId);
        socket.leave(`${channelId}`, () => {
            socket.emit('systemMessage', {message: `You leave channel ${channelId}!`});
            socket.broadcast.to(`${channelId}`).emit('systemMessage', {message: `Someone leave channel!`});
        });
    }

}