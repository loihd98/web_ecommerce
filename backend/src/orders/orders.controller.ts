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
import { OrdersService } from "./orders.service";
import {
  Order,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
} from "./order.entity";

interface CreateOrderDto {
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
      const userId = req?.user?.sub || 1;

      return await this.ordersService.create({
        ...createOrderDto,
        userId,
      });
    } catch (error) {
      throw new HttpException("Tạo đơn hàng thất bại", HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get("user/:userId")
  async findByUser(@Param("userId") userId: string): Promise<Order[]> {
    return this.ordersService.findByUser(+userId);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Order> {
    const order = await this.ordersService.findOne(+id);
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
    return this.ordersService.updateStatus(+id, updateStatusDto.status);
  }

  @Patch(":id/payment-status")
  async updatePaymentStatus(
    @Param("id") id: string,
    @Body() updatePaymentStatusDto: { paymentStatus: PaymentStatus }
  ): Promise<Order> {
    return this.ordersService.updatePaymentStatus(
      +id,
      updatePaymentStatusDto.paymentStatus
    );
  }
}
