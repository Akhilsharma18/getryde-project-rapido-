import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for Next.js frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  // Set global API prefix
  app.setGlobalPrefix("api");

  // Swagger OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle("GETRYDE API")
    .setDescription(
      "Comprehensive REST & Real-time WebSocket API for the GETRYDE Mobility Platform"
    )
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 GETRYDE API is running on http://localhost:${port}/api`);
  console.log(`📖 Swagger API Docs available on http://localhost:${port}/api/docs`);
}

bootstrap();
