import {Request, Response } from 'express';
import { UserService } from '../../business/services/users.service';
import { AuthService} from '../../business/services/auth.service';

const userService = new UserService();
const authService = new AuthService();

export async function createUser(req: Request, res: Response) {
    try {
        const { username, email, password} = req.body;
        const user = await AuthService.register(username, email, password);
        //const user = await userService.createUser(username, email, password);
        res.status(201).json(user);
    }catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({message})
    }   
}

export async function getAllUsers(req: Request, res: Response){
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({message});
    }
}

export async function getUserById(req: Request, res: Response){
    try{
        ///users/:id ===> users/5 5 burda id buna göre arama yapıyorz 
        const id = Number(req.params.id);
        const user = await userService.getUserById(id);
        res.json(user);
    }catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(404).json({message});
    }
}

export async function updateUser(req: Request, res: Response){
    try{
        const id = Number(req.params.id);
        const data = req.body;
        const user = await userService.updateUser(id, data);
        res.json(user);
    }catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({message});
    }
}

export async function deleteUser(req: Request, res: Response){
    try{
        const id = Number(req.params.id);
        await userService.deleteUser(id);
        res.status(204).send();
    }catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({message});
    }
}