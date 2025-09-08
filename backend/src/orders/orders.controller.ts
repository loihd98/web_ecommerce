import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Types } from "mongoose";
import { OrdersService } from "./orders.service";
import {
  Order,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
} from "./order.schema";

interface CreateOrderDto {
  items: {
    productId: string;
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

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req?: any
  ): Promise<Order> {
    try {
      // For demo purposes, use a mock user ID if no auth
      const userId = req?.user?.sub || "60b5d3f5e8b5a93a5c8e4b7a"; // Default MongoDB ObjectId

      // Convert string productIds to ObjectIds
      const items = createOrderDto.items.map((item) => ({
        ...item,
        productId: new Types.ObjectId(item.productId),
      }));

      return await this.ordersService.create({
        ...createOrderDto,
        items,
        userId: new Types.ObjectId(userId),
      });
    } catch (error) {
      throw new HttpException("Tạo đơn hàng thất bại", HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get("user/:userId")
  async findByUser(@Param("userId") userId: string) {
    return this.ordersService.findByUser(userId);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Order> {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new HttpException("Không tìm thấy đơn hàng", HttpStatus.NOT_FOUND);
    }
    return order;
  }

  @Patch(":id/status")
  async updateStatus(
    @Param("id") id: string,
    @Body() updateStatusDto: { status: OrderStatus }
  ): Promise<Order> {
    return this.ordersService.updateStatus(id, updateStatusDto.status);
  }

  @Patch(":id/payment-status")
  async updatePaymentStatus(
    @Param("id") id: string,
    @Body() updatePaymentStatusDto: { paymentStatus: PaymentStatus }
  ): Promise<Order> {
    return this.ordersService.updatePaymentStatus(
      id,
      updatePaymentStatusDto.paymentStatus
    );
  }
}
