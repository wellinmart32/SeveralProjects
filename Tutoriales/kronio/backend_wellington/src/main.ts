import { addAliases } from 'module-alias';

addAliases({
	'@app'  : __dirname,
	'@env': __dirname + '/../environment',
});

import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	const swaggerBaseConfig = new DocumentBuilder()
		.setTitle('Kronio')
		.setDescription('Kronio')
		.setVersion('1.0.0')
		.addBearerAuth()
		.build();
	const swaggerDocument = SwaggerModule.createDocument(app, swaggerBaseConfig);
	SwaggerModule.setup('docs', app, swaggerDocument);
	await app.listen(9000);
}
bootstrap();
