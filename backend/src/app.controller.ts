import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getStatus() {
    return {
      status: "OK",
      message: "Vuaxemohinh Backend API is running",
      timestamp: new Date().toISOString(),
    };
  }

  @Get("health")
  getHealth() {
    return {
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
