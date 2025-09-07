import { IsString, IsEmail, IsOptional } from "class-validator";

export class SocialLoginDto {
  @IsString()
  provider: string;

  @IsString()
  providerId: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
