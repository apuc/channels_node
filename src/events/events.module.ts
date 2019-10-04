import { HttpModule, Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ChannelsGateway } from './channels/channels.gateway';
import { MessagesGateway } from './messages/messages.gateway';
import { MessagesService } from './messages/messages.service';

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        EventsGateway,
        ChannelsGateway,
        MessagesGateway,
        MessagesService,
    ],
})
export class EventsModule {
}
