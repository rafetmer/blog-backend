import { PostsRepository } from "../../dataAccess/repositories/posts.repository";

export class PostService {
    private postRepo = new PostsRepository();

    async createPost(data: { author_id: number; category_id: number; title: string; content: string }) {
        const existing = await this.postRepo.findByTitle(data.title);
        if (existing) {
            throw new Error("This post title already exists.");
        }
        return this.postRepo.create(data);
    }

    async getAllPosts() {
        return this.postRepo.findAll();
    }

    async getPostById(id: number) {
        const post = await this.postRepo.findById(id);
        if (!post) throw new Error('Post not found');
        return post;
    }

    async updatePost(id: number, data: Partial<{ author_id: number; category_id: number; title: string; content: string }>) {
        return this.postRepo.update(id, data);
    }

    async deletePost(id: number) {
        return this.postRepo.delete(id);
    }
}