import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: "customer" })
  role: string;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  image?: string;

  @Prop()
  socialProvider?: string;

  @Prop()
  socialProviderId?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  avatar?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop()
  gender?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
