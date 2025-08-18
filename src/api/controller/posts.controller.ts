import { Request, Response } from 'express';
import { PostService } from '../../business/services/posts.service';

const postsService = new PostService();

export async function createPost(req: Request, res: Response) {
    try {
        const { author_id, category_id, title, content } = req.body;
        const post = await postsService.createPost(author_id, category_id, title, content);
        res.status(201).json(post);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({message});
    }
}

export async function getAllPosts(req: Request, res: Response) {
    try {
        const posts = await postsService.getAllPosts();
        res.json(posts);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({message});
    }
}

export async function getPostById(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const post = await postsService.getPostById(id);
        res.json(post);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(404).json({message});
    }
}

export async function updatePost(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const post = await postsService.updatePost(id, data);
        res.json(post);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({ message });
    }
}

export async function deletePost(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        await postsService.deletePost(id);
        res.status(204).send();
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({ message });
    }
}