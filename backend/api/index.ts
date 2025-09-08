import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "../src/app.module";
import { ValidationPipe } from "@nestjs/common";
import express from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";

// Create Express instance
const expressApp = express();

// Create NestJS app instance (singleton)
let nestApp: any = null;

async function createNestApp() {
  if (nestApp) {
    return nestApp;
  }

  try {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      {
        logger:
          process.env.NODE_ENV === "production"
            ? ["error", "warn"]
            : ["log", "error", "warn", "debug", "verbose"],
      }
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
      "https://frontend-3yp7san12-dev-eb0dacb6.vercel.app",
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

    // Set global prefix for all routes
    app.setGlobalPrefix("api");

    // Initialize the app
    await app.init();

    nestApp = app;
    console.log("NestJS app initialized successfully");
    return app;
  } catch (error) {
    console.error("Error creating NestJS app:", error);
    throw error;
  }
}

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Initialize NestJS app if not already done
    await createNestApp();

    // Handle the request through Express/NestJS
    return expressApp(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
