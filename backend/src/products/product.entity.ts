import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "../categories/category.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  discountPrice: number;

  @Column({ default: 0 })
  stock: number;

  @Column("simple-array", { nullable: true })
  images: string[];

  @Column()
  categoryId: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column("simple-array", { nullable: true })
  tags: string[];

  @Column({ nullable: true })
  sku: string;

  @Column("decimal", { precision: 3, scale: 2, nullable: true })
  weight: number;

  @Column("json", { nullable: true })
  attributes: any; // Lưu thông tin bổ sung như màu sắc, kích thước, etc.

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
