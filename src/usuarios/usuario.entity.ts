import * as bcrypt from 'bcrypt'
import { Column, PrimaryColumn } from 'typeorm'


export class USUARIO{

    @PrimaryColumn()
    ID:string;

    @Column({length: 255})
    NOME: string;

    @Column({length: 255})
    EMAIL: string;

    @Column({length: 255})
    CPF: string;

    @Column({length: 255})
    CNPJ: string;

    trocaSenha(SENHA){
        const saltOrRounds=10
        this.SENHA=bcrypt.hashSync(SENHA,saltOrRounds)
    }
    login(SENHA){
        return bcrypt.compareSync(SENHA,this.SENHA)
    }

    @Column({length: 255})
    SENHA: string;

    // @OneToMany(() => ENTRADA_SAIDA, entrada => entrada.usuario)
    // filmes: FILME[];

}