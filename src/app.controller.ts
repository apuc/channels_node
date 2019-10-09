import {Body, Controller, Get,Post, Logger, Render} from '@nestjs/common';
import {ChannelsGateway} from "./events/channels/channels.gateway";
import {IntegrationMessage} from "./events/messages/messages.interfaces";
import * as config from 'config';

@Controller()
export class AppController {

  private logger = new Logger('AppController');

  constructor(private channelsGateway:ChannelsGateway){}

  @Post(config.get('routes').integration)
  integration(@Body() integrationRequest:IntegrationMessage){
    this.channelsGateway.sendIntegration(integrationRequest.channels_ids,integrationRequest.message)
  }

  @Get('*')
  @Render('index.html')
  root(): {message: string} {
    this.logger.error('Something went wrong!');
    return { message: 'Sorry something went wrong!' };
  }
}
