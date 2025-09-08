import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./product.schema";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>
  ) {}

  async create(productData: Partial<Product>): Promise<Product> {
    const product = new this.productModel(productData);
    return product.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    categoryId?: string,
    search?: string
  ): Promise<{ products: Product[]; total: number; pages: number }> {
    const query: any = { isActive: true };

    if (categoryId) {
      query.categoryId = categoryId;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.productModel
        .find(query)
        .populate("categoryId", "name")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.productModel.countDocuments(query),
    ]);

    return {
      products,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate("categoryId", "name")
      .exec();

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    // Increment view count
    await this.productModel.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

    return product;
  }

  async update(id: string, updateData: Partial<Product>): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("categoryId", "name")
      .exec();

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return product;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }

  async findByCategory(
    categoryId: string,
    limit: number = 10
  ): Promise<Product[]> {
    return this.productModel
      .find({ categoryId, isActive: true })
      .populate("categoryId", "name")
      .limit(limit)
      .exec();
  }

  async findFeatured(limit: number = 8): Promise<Product[]> {
    return this.productModel
      .find({ isFeatured: true, isActive: true })
      .populate("categoryId", "name")
      .limit(limit)
      .exec();
  }

  async findBestSellers(limit: number = 8): Promise<Product[]> {
    return this.productModel
      .find({ isActive: true })
      .populate("categoryId", "name")
      .sort({ soldCount: -1 })
      .limit(limit)
      .exec();
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(
        id,
        { $inc: { stock: -quantity, soldCount: quantity } },
        { new: true }
      )
      .exec();

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return product;
  }

  async search(query: string, limit: number = 20): Promise<Product[]> {
    return this.productModel
      .find({
        $and: [
          { isActive: true },
          {
            $or: [
              { name: { $regex: query, $options: "i" } },
              { description: { $regex: query, $options: "i" } },
              { tags: { $in: [new RegExp(query, "i")] } },
            ],
          },
        ],
      })
      .populate("categoryId", "name")
      .limit(limit)
      .exec();
  }

  async deleteAll(): Promise<void> {
    await this.productModel.deleteMany({}).exec();
  }
}
