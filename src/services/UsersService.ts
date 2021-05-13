import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UsersRepository"

interface IUserCreate {
	email: string;
}

class UsersService {
	private usersRepository: Repository<User>;

	constructor() {
		this.usersRepository = getCustomRepository(UserRepository);
	}

	async create({ email }: IUserCreate){
		const userExists = await this.usersRepository.findOne(email);

		// Se existir, retornar user
		if(userExists){
			return userExists;
		}

		const user = this.usersRepository.create({
			email,
		})
		
		await this.usersRepository.save(user);

		// Se não existir, salvar no BD
		return user;
	}

	async findByEmail(email: string){
		// Vertificar se usuários existe
		const userExists = await this.usersRepository.findOne({ 
			email
		});

		return userExists;
	}
}

export { UsersService }
