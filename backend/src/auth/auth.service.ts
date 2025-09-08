import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.schema";
import { SocialLoginDto } from "./dto/social-login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const userObj = (user as any).toObject ? (user as any).toObject() : user;
      const { password, ...result } = userObj;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const userId = user._id || user.id;
    const payload = {
      email: user.email,
      sub: userId.toString(),
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userId.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(userData: any) {
    const user = await this.usersService.create(userData);
    const { password, ...result } = user;
    return result;
  }

  async socialLogin(socialLoginDto: SocialLoginDto) {
    const { provider, providerId, email, name, image } = socialLoginDto;

    // Check if user already exists with this email
    let user = await this.usersService.findByEmail(email);

    if (!user) {
      // Create new user with social login
      const userData = {
        email,
        name: name || email.split("@")[0],
        firstName: name ? name.split(" ")[0] : "",
        lastName: name ? name.split(" ").slice(1).join(" ") : "",
        password: await bcrypt.hash(Math.random().toString(36), 10), // Random password
        role: "customer",
        socialProvider: provider,
        socialProviderId: providerId,
        image,
      };

      user = await this.usersService.create(userData);
    } else {
      // Update existing user with social info if not already set
      if (!user.socialProvider) {
        await this.usersService.update((user as any)._id.toString(), {
          socialProvider: provider,
          socialProviderId: providerId,
          image: image || user.image,
        });
        user.socialProvider = provider;
        user.socialProviderId = providerId;
        user.image = image || user.image;
      }
    }

    // Generate JWT token
    const payload = {
      email: user.email,
      sub: (user as any)._id.toString(),
      role: user.role,
    };
    return {
      token: this.jwtService.sign(payload),
      user: {
        id: (user as any)._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        image: user.image,
      },
    };
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.usersService.findOne(userId);
  }

  async getProfile(userId: string): Promise<User | null> {
    return this.usersService.findOne(userId);
  }
}
