import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get('ConfigService');
    const logger = new Logger('Bootstrap');

    app.engine('html', require('ejs').renderFile);
    app.useStaticAssets(join(__dirname, config.get('PATH_TO_VIEW_FILES')));
    app.setBaseViewsDir(join(__dirname, config.get('PATH_TO_VIEW_FILES')));

    await app.listen(config.get('PORT'), () => logger.log(`Server is running on port ${config.get('PORT')}`));
}

bootstrap();
