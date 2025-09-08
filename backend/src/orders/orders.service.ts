import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order, OrderDocument } from "./order.schema";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>
  ) {}

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = new this.orderModel(orderData);
    return order.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    status?: string,
    userId?: string
  ): Promise<{ orders: Order[]; total: number; pages: number }> {
    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (userId) {
      query.userId = userId;
    }

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      this.orderModel
        .find(query)
        .populate("userId", "name email")
        .populate("items.productId", "name price images")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.orderModel.countDocuments(query),
    ]);

    return {
      orders,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate("userId", "name email phone")
      .populate("items.productId", "name price images")
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    return order;
  }

  async findByUser(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ orders: Order[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      this.orderModel
        .find({ userId })
        .populate("items.productId", "name price images")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.orderModel.countDocuments({ userId }),
    ]);

    return {
      orders,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const updateData: any = { status };

    if (status === "shipped") {
      updateData.shippedAt = new Date();
    } else if (status === "delivered") {
      updateData.deliveredAt = new Date();
    } else if (status === "cancelled") {
      updateData.cancelledAt = new Date();
    }

    const order = await this.orderModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("userId", "name email")
      .populate("items.productId", "name price images")
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    return order;
  }

  async updatePaymentStatus(id: string, paymentStatus: string): Promise<Order> {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { paymentStatus }, { new: true })
      .populate("userId", "name email")
      .populate("items.productId", "name price images")
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    return order;
  }

  async cancel(id: string, cancelReason?: string): Promise<Order> {
    const order = await this.orderModel
      .findByIdAndUpdate(
        id,
        {
          status: "cancelled",
          cancelledAt: new Date(),
          cancelReason: cancelReason || "Cancelled by user",
        },
        { new: true }
      )
      .populate("userId", "name email")
      .populate("items.productId", "name price images")
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    return order;
  }

  async getOrderStats(): Promise<any> {
    const [
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
    ] = await Promise.all([
      this.orderModel.countDocuments(),
      this.orderModel.countDocuments({ status: "pending" }),
      this.orderModel.countDocuments({ status: "shipped" }),
      this.orderModel.countDocuments({ status: "delivered" }),
      this.orderModel.countDocuments({ status: "cancelled" }),
      this.orderModel.aggregate([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
    ]);

    return {
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
    };
  }
}
