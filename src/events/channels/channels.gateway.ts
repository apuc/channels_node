import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ServerWithUsers } from '../events.gateway';

@WebSocketGateway({namespace: '/'})
export class ChannelsGateway {

    @WebSocketServer()
    server: ServerWithUsers;

    @SubscribeMessage('joinChannels')
    onJoinChannels(socket: Socket, channelsIds: number[]): void {
        socket.join(channelsIds.join().split(','));
        channelsIds.forEach((id: number) => {
            socket.emit('systemMessage', { message: `You joined to ${id}` });
        });
    }

    @SubscribeMessage('joinChannel')
    onJoinChannel(socket: Socket, channelId: number): void {
        socket.join(`${channelId}`);
        socket.emit('systemMessage', {message: `You joined to ${channelId}`});
        socket.broadcast.to(`${channelId}`).emit('systemMessage', {message: `Someone joined!`});
    }

    @SubscribeMessage('leaveChannel')
    onLeaveChannel(socket: Socket, channelId: number): void {
        socket.leave(`${channelId}`, () => {
            socket.emit('systemMessage', {message: `You leave channel ${channelId}!`});
            socket.broadcast.to(`${channelId}`).emit('systemMessage', {message: `Someone leave channel!`});
        });
    }

}
