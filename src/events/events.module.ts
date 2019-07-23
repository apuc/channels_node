import { HttpModule, Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ChannelsGateway } from './channels/channels.gateway';
import { MessagesGateway } from './messages/messages.gateway';
import { MessagesService } from './messages/messages.service';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [HttpModule],
  providers: [EventsGateway, ChannelsGateway, MessagesGateway, MessagesService, ConfigService],
})
export class EventsModule {}
