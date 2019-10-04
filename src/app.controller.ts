import { Controller, Get, Logger, Render } from '@nestjs/common';

@Controller()
export class AppController {

  private logger = new Logger('AppController');

  @Get('*')
  @Render('index.html')
  root(): {message: string} {
    this.logger.error('Something went wrong!');
    return { message: 'Sorry something went wrong!' };
  }
}
