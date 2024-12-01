import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true, transformOptions: { enableImplicitConversion: true } }),
    );

    const options = new DocumentBuilder()
        .setTitle('Reservation API')
        .setVersion('1.0')
        .addBearerAuth()
        .setExternalDoc('Reservation API - Collection', '/docs-json')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 3000;
    await app.listen(port as number, host);
    console.info(`Server running on ${host}:${port}`);
}
bootstrap();
