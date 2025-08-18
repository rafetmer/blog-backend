import { Request, Response } from 'express';
import { AuthService } from '../../business/services/auth.service';

export async function register(req: Request, res: Response) {
    try{
        const {username, email, password} = req.body;
        const user = await AuthService.register(username, email, password)
        res.status(201).json(user);
    } catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({message});
    }
}    
export async function login(req: Request, res: Response) {
    try{
        const {username, password} = req.body;
        const token = await AuthService.login(username, password);
        res.json({token});
    }catch(error){
        const message = error instanceof Error ? error.message : 'Unknown error'; //TS de error unknown olarak döndüğü icin erroru bi typea atamamız gerekiyor
        res.status(401).json({message});
    }
    
}
