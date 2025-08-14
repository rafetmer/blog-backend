import { PrismaClient, posts } from '@prisma/client';

const prisma = new PrismaClient();

export class PostsRepository {
    async create(data: { author_id: number; category_id?: number; title: string; content:string }): Promise<posts> {
        return prisma.posts.create({ data });
    }
    async findAll(): Promise<posts[]> {
        return prisma.posts.findMany();
    }
    async findById(post_id: number): Promise<posts | null> {
        return prisma.posts.findUnique({ where: { post_id }});
    }
    async update(post_id: number, data: Partial<posts>): Promise<posts> {
        return prisma.posts.update({where: { post_id }, data });
    }
    async delete(post_id: number): Promise<posts> {
        return prisma.posts.delete({where: { post_id }});
    }
}