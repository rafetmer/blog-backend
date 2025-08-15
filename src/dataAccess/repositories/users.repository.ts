import { PrismaClient, users } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
    async create(data: { username: string; email: string; password_hash: string }): Promise<users> {
        return prisma.users.create({ data });
    } 
    async findAll(): Promise<users[]> {
        return prisma.users.findMany();
    }
    async findById(user_id: number): Promise<users | null> {
        return prisma.users.findUnique({where: { user_id }});
    }
    async findByName(username: string): Promise<users | null> {
        return prisma.users.findUnique({where: { username } })
    }
    async update(user_id: number, data: Partial<users>): Promise<users> {
        retur