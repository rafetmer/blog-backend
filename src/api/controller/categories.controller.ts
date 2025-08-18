import {Request, Response } from 'express';
import { CategoryService } from '../../business/services/categories.service';

const categoryService = new CategoryService();

export async function createCategory(req: Request, res: Response) {
    try {
        const { name } = req.body;
        const category = await categoryService.createCategory(name);
        res.status(201).json(category);
    }catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({message})
    }   
}

export async function getAllCategories(req: Request, res: Response){
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    }catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({message});
    }
}

export async function getCategoryById(req: Request, res: Response){
    try{
        ///categories/:id ===> categories/5 5 burda id buna göre arama yapıyorz 
        const id = Number(req.params.id);
        const category = await categoryService.getCategoryById(id);
        res.json(category);
    }catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(404).json({message});
    }
}

export async function updateCategory(req: Request, res: Response){
    try{
        const id = Number(req.params.id);
        const data = req.body;
        const category = await categoryService.updateCategory(id, data);
        res.json(category);
    }catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({message});
    }
}

export async function deleteCategory(req: Request, res: Response){
    try{
        const id = Number(req.params.id);
        await categoryService.deleteCategory(id);
        res.status(204).send();
    }catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({message});
    }
}