import { USUARIO } from "src/usuarios/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"


@Entity()
export class ENTRADA_SAIDA{

    @PrimaryColumn()    
    ID:string;

    @Column({length: 255})
    TIPO: boolean;

    @Column({length: 255})
    VALOR: number;    

    @Column({length: 255})
    IDFILES: string

    @ManyToOne(() => ENTRADA_SAIDA)
    @JoinColumn({ name: 'IDUSUARIO', referencedColumnName:'ID'})
    IDUSUARIO: USUARIO;
    
}