import { Column, PrimaryColumn } from "typeorm"

export class Entrada_SaidaEntity{
    id:string
    tipo:boolean
    valor:Number
    foto:string
    idusuario:string

    constructor(id:string, tipo:boolean,valor:Number, foto:string,idusuario:string){
    this.id=id;
    this.tipo=tipo;
    this.valor=valor;
    this.foto=foto;
    this.idusuario=idusuario
    }
}

// @Entity()
// export class ENTRADA_SERIE{

//     @PrimaryColumn()    
//     ID:string;

//     @Column({length: 255})
//     TIPO: boolean;

//     @Column({length: 255})
//     VALOR: number;    

//     @ManyToOne(() => USUARIO, usuario => usuario.entrada_saida)
//     @JoinColumn({ name: 'IDUSUARIO', referencedColumnName:'ID'})
//     IDUSUARIO: USUARIO;
    
// }