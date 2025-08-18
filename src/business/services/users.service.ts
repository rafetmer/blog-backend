import { UserRepository } from "../../dataAccess/repositories/users.repository";

export class UserService {
    private userRepo = new UserRepository();

    async createUser(username: string, email:string, password_hash:string) {
        const existing = await this.userRepo.findByName(username);
        if(existing){
            throw new Error("This user already exists.")
        }
        return this.userRepo.create({username, email, password_hash});
    }

    async getAllUsers(){
        return this.userRepo.findAll();
    }

    async getUserById(id: number){
        const userById = this.userRepo.findById(id);
        if(!userById) throw new Error("User not found.")
        return userById;
    }

    async updateUser(id: number, data:Partial<{username:string, email:string, password_hash:string}>){
        return this.userRepo.update(id, data);
    }
    async deleteUser(id: number){
        return this.userRepo.delete(id);
    }
}
