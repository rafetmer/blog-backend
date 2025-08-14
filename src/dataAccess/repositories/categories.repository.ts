import { PrismaClient, categories } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryRepository {

    async create(data: {name: string}): Promise<categories> {
        return prisma.categories.create({ data });
    }
    async findAll(): Promise<categories[]> {
        return prisma.categories.findMany();
    }
    async findById(category_id: number): Promise<categories | null>{
        return prisma.categories.findUnique({where: {category_id}});
    }
    async update(category_id: number, data: Partial<categories>): Promise<categories> {
        return prisma.categories.update({where: { category_id }, data});
    }
    async delete(category_id: number): Promise<categories> {
        return prisma.categories.delete({where: { category_id }});
    }

}