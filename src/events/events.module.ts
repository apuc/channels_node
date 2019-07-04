import { HttpModule, Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ChannelsGateway } from './channels/channels.gateway';
import { MessagesGateway } from './messages/messages.gateway';
import { EventsService } from './events.service';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [HttpModule],
  providers: [EventsGateway, ChannelsGateway, MessagesGateway, EventsService, ConfigService]
})
export class EventsModule {}
