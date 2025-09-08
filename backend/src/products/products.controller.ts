import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { ProductsService } from "./products.service";
import { Product } from "./product.schema";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: "Create a new product" })
  @ApiResponse({ status: 201, description: "Product created successfully" })
  @ApiResponse({ status: 400, description: "Invalid input" })
  @Post()
  create(@Body() createProductDto: Partial<Product>) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({ status: 200, description: "Products retrieved successfully" })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: "Get featured products" })
  @ApiResponse({
    status: 200,
    description: "Featured products retrieved successfully",
  })
  @Get("featured")
  findFeatured() {
    return this.productsService.findFeatured();
  }

  @ApiOperation({ summary: "Get a product by ID" })
  @ApiResponse({ status: 200, description: "Product retrieved successfully" })
  @ApiResponse({ status: 404, description: "Product not found" })
  @ApiParam({ name: "id", description: "Product ID" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: Partial<Product>) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(id);
  }
}
