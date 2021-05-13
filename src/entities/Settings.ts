import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

//FAZER UMA CLASSE COM AS COLUNAS DA TABELA
//COLOCAR AS @NOTATIONS EM CADA COLUNA
//CASO NÃO QUEIRA USAR O NOME DA COLUNA DO DB, É SÓ COLOCAR A COLOCAR A COLUNA DO DB NA NOTATION
//EX: @PrimaryColumn({name: "id"})

@Entity("settings")
class Setting {
	
	@PrimaryColumn()
	id: string;

	@Column()
	username: string;

	@Column()
	chat: boolean;

	@UpdateDateColumn()
	updated_at: Date;

	@CreateDateColumn()
	created_at: Date;

	constructor(){
		if(!this.id){
			this.id = uuid();
		}

		
	}
}

export { Setting }
