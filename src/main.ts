import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get('ConfigService');

    app.engine('html', require('ejs').renderFile);
    app.useStaticAssets(join(__dirname, config.get('PATH_TO_VIEW_FILES')));
    app.setBaseViewsDir(join(__dirname, config.get('PATH_TO_VIEW_FILES')));

    await app.listen(config.get('PORT'), () => console.log(`Server is running on port ${config.get('PORT')}`));
}

bootstrap();
