import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "../users/user.entity";
import { OrderItem } from "./order-item.entity";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum PaymentMethod {
  COD = "cod",
  CARD = "card",
  MOMO = "momo",
  VNPAY = "vnpay",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
}

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column("text")
  orderNumber: string;

  @Column("decimal", { precision: 10, scale: 2 })
  subtotal: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  shippingFee: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column("decimal", { precision: 10, scale: 2 })
  total: number;

  @Column("text")
  status: OrderStatus;

  @Column("text")
  paymentMethod: PaymentMethod;

  @Column("text")
  paymentStatus: PaymentStatus;

  // Shipping information
  @Column()
  shippingName: string;

  @Column()
  shippingPhone: string;

  @Column()
  shippingEmail: string;

  @Column("text")
  shippingAddress: string;

  @Column()
  shippingCity: string;

  @Column()
  shippingDistrict: string;

  @Column()
  shippingWard: string;

  @Column("text", { nullable: true })
  notes: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
