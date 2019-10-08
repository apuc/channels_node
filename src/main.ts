import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const { port, views_dir } = config.get('server');
    const logger = new Logger('Bootstrap');

    app.engine('html', require('ejs').renderFile);
    app.useStaticAssets(join(__dirname, views_dir));
    app.setBaseViewsDir(join(__dirname, views_dir));

    await app.listen(port, () => logger.log(`Server is running on port ${port}`));
}

bootstrap();
