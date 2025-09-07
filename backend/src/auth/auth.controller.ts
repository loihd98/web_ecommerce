import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { SocialLoginDto } from "./dto/social-login.dto";

interface RegisterDto {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "User login" })
  @ApiResponse({
    status: 200,
    description: "Login successful",
    schema: {
      type: "object",
      properties: {
        access_token: { type: "string" },
        user: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  @ApiBody({
    description: "Login credentials",
    schema: {
      type: "object",
      properties: {
        email: { type: "string", example: "user@example.com" },
        password: { type: "string", example: "password123" },
      },
    },
  })
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password
      );
      if (!user) {
        throw new HttpException(
          "Email hoặc mật khẩu không đúng",
          HttpStatus.UNAUTHORIZED
        );
      }
      return this.authService.login(user);
    } catch (error) {
      throw new HttpException("Đăng nhập thất bại", HttpStatus.UNAUTHORIZED);
    }
  }

  @ApiOperation({ summary: "User registration" })
  @ApiResponse({ status: 201, description: "Registration successful" })
  @ApiResponse({ status: 400, description: "Registration failed" })
  @ApiBody({
    description: "Registration details",
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "John Doe" },
        email: { type: "string", example: "john@example.com" },
        phone: { type: "string", example: "+1234567890" },
        password: { type: "string", example: "password123" },
      },
    },
  })
  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    try {
      const existingUser = await this.authService.findUserByEmail(
        registerDto.email
      );
      if (existingUser) {
        throw new HttpException("Email đã được sử dụng", HttpStatus.CONFLICT);
      }

      const user = await this.authService.register(registerDto);
      return this.authService.login(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException("Đăng ký thất bại", HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: "Social login" })
  @ApiResponse({
    status: 200,
    description: "Social login successful",
    schema: {
      type: "object",
      properties: {
        token: { type: "string" },
        user: {
          type: "object",
          properties: {
            id: { type: "number" },
            email: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            role: { type: "string" },
            image: { type: "string" },
          },
        },
      },
    },
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        provider: { type: "string", example: "google" },
        providerId: { type: "string", example: "12345" },
        email: { type: "string", example: "user@example.com" },
        name: { type: "string", example: "John Doe" },
        image: { type: "string", example: "https://example.com/avatar.jpg" },
      },
    },
  })
  @Post("social-login")
  async socialLogin(@Body() socialLoginDto: SocialLoginDto) {
    try {
      return await this.authService.socialLogin(socialLoginDto);
    } catch (error) {
      throw new HttpException("Đăng nhập thất bại", HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Get user profile" })
  @ApiResponse({ status: 200, description: "Profile retrieved successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @Get("profile")
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId);
  }
}
