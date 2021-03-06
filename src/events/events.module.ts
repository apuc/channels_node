import { HttpModule, Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ChannelsGateway } from './channels/channels.gateway';
import { MessagesGateway } from './messages/messages.gateway';
import { UsersGateway } from './users/users.gateway';
import { MessagesService } from './messages/messages.service';
import {AppService} from "../app.service";

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        EventsGateway,
        ChannelsGateway,
        MessagesGateway,
        UsersGateway,
        MessagesService,
        AppService,
    ],
    exports:[
        ChannelsGateway
    ]
})
export class EventsModule {
}
