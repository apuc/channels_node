import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {UserMessageResponse} from "../messages/messages.interfaces";

@WebSocketGateway({namespace: '/'})
export class ChannelsGateway {

    @WebSocketServer()
    server: Server;

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

    /**
     * Отправляет интеграцию в каналы
     */
    sendIntegration(channel_ids:number [],message:UserMessageResponse){
        for (let id of channel_ids){
            this.server.to(`${id}`).emit('userMessage', message);
        }
    }

}
