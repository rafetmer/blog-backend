import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../../dataAccess/repositories/users.repository';
const JWT_SECRET = process.env.JWT_SECRET || 'gizliAnahtar';

export class AuthService {
    private static userRepo = new UserRepository();
	static async register(username: string, email:string ,password: string) {
        const existingUser = await AuthService.userRepo.findByName(username);
        if(existingUser) throw new Error('Bu kullanıcı adı zaten bulunuyor. ');

        const hashedPassword = await bcrypt.hash(password, 10);
		await AuthService.userRepo.create({ username, email , password_hash: hashedPassword });
		return { username };
	}

	static async login(username: string, password: string) {
		const user = await AuthService.userRepo.findByName(username);
		
		if (!user) throw new Error('Kullanıcı bulunamadı');
		const isMatch = await bcrypt.compare(password, user.password_hash);
		if (!isMatch) throw new Error('Şifre yanlış');
        
		// JWT üret
		const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
		return token;
	}
}


