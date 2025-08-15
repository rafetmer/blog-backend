import { CategoryRepository } from "../../dataAccess/repositories/categories.repository";

export class CategoryService {
    private categoryRepo = new CategoryRepository();

    async createCategory(name: string) {
        const existing = await this.categoryRepo.findByName(name);
        if(existing) {
            throw new Error("This category already exists.")
        }
        return this.categoryRepo.create( { name });
    }
    async getAllCategories(){
        return this.categoryRepo.findAll();
    }
    async getCategoryById(id: number){
        const category = await this.categoryRepo.findById(id);
        if(!category) throw new Error('Category not found');
        return category;
    }
    async updateCategory(id:number, data: Partial<{name:string}>){
        return this.categoryRepo.update(id, data);
    }
    async deleteCategory(id:number){
        return this.categoryRepo.delete(id);
    }
}