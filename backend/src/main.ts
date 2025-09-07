import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend communication
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  app.enableCors({
    origin: [frontendUrl, "http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // API prefix
  app.setGlobalPrefix("api");

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle("E-commerce API")
    .setDescription(
      "Complete e-commerce backend API with authentication, products, orders, and payments"
    )
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth"
    )
    .addTag("Authentication", "User authentication and authorization")
    .addTag("Users", "User management operations")
    .addTag("Products", "Product catalog management")
    .addTag("Categories", "Product category management")
    .addTag("Orders", "Order management system")
    .addTag("Cart", "Shopping cart operations")
    .addTag("Payments", "Payment processing")
    .addTag("Chatbot", "AI chatbot support")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(5000);
  console.log("🚀 Backend server is running on http://localhost:5000");
  console.log(
    "📚 API Documentation is available at http://localhost:5000/api/docs"
  );
}
bootstrap();
