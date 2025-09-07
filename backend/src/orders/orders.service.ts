import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "./order.entity";
import { OrderItem } from "./order-item.entity";

interface CreateOrderDto {
  userId: number;
  items: {
    productId: number;
    productName: string;
    price: number;
    discountPrice?: number;
    quantity: number;
    productAttributes?: any;
  }[];
  shippingInfo: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    notes?: string;
  };
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderNumber = this.generateOrderNumber();

    const order = this.ordersRepository.create({
      userId: createOrderDto.userId,
      orderNumber,
      subtotal: createOrderDto.subtotal,
      shippingFee: createOrderDto.shippingFee,
      discount: createOrderDto.discount,
      total: createOrderDto.total,
      status: OrderStatus.PENDING,
      paymentMethod: createOrderDto.paymentMethod,
      paymentStatus: PaymentStatus.PENDING,
      shippingName: createOrderDto.shippingInfo.fullName,
      shippingPhone: createOrderDto.shippingInfo.phone,
      shippingEmail: createOrderDto.shippingInfo.email,
      shippingAddress: createOrderDto.shippingInfo.address,
      shippingCity: createOrderDto.shippingInfo.city,
      shippingDistrict: createOrderDto.shippingInfo.district,
      shippingWard: createOrderDto.shippingInfo.ward,
      notes: createOrderDto.shippingInfo.notes,
    });

    const savedOrder = await this.ordersRepository.save(order);

    // Create order items
    const orderItems = createOrderDto.items.map((item) => {
      return this.orderItemsRepository.create({
        orderId: savedOrder.id,
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        discountPrice: item.discountPrice,
        quantity: item.quantity,
        productAttributes: item.productAttributes
          ? JSON.stringify(item.productAttributes)
          : null,
      });
    });

    await this.orderItemsRepository.save(orderItems);

    return this.findOne(savedOrder.id);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ["user", "items", "items.product"],
      order: { createdAt: "DESC" },
    });
  }

  async findByUser(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: ["items", "items.product"],
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: { id },
      relations: ["user", "items", "items.product"],
    });
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
    await this.ordersRepository.update(id, { status });
    return this.findOne(id);
  }

  async updatePaymentStatus(
    id: number,
    paymentStatus: PaymentStatus
  ): Promise<Order> {
    await this.ordersRepository.update(id, { paymentStatus });
    return this.findOne(id);
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `ORD${timestamp}${random}`;
  }
}
