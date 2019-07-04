import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ConfigModule, EventsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
