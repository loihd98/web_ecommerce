import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "../src/app.module";
import { ValidationPipe } from "@nestjs/common";
import express from "express";

const server = express();

async function createNestServer(expressInstance: express.Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    { logger: ["error", "warn"] }
  );

  // Enable CORS for production
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    process.env.FRONTEND_URL,
    process.env.VERCEL_FRONTEND_URL,
    "https://vuaxemohinh.vercel.app",
    "https://web-thuong-mai-frontend.vercel.app",
    "https://frontend-56lsu7mmf-dev-eb0dacb6.vercel.app",
    "https://frontend-hyilemiib-dev-eb0dacb6.vercel.app",
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if origin is in allowed list or matches Vercel pattern
      if (
        allowedOrigins.includes(origin) ||
        origin.includes("vercel.app") ||
        origin.includes("localhost")
      ) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
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

  return app.init();
}

createNestServer(server)
  .then(() => console.log("Nest Ready"))
  .catch((err) => console.error("Nest broken", err));

export default server;
