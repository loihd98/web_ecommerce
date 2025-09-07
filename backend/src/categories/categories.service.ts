import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoriesRepository.create(categoryData);
    return this.categoriesRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<Category>): Promise<Category> {
    await this.categoriesRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }

  async deleteAll(): Promise<void> {
    await this.categoriesRepository.clear();
  }
}
