import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { register } from "module";
import { UsuarioService } from "../usuario.service";


@Injectable()
@ValidatorConstraint({async:true})

export class EmailUnicoValidator implements ValidatorConstraintInterface{
    constructor(private clsUsuariosArmazenados:UsuarioService){

    }
    async validate(value:any,validationArguments?:ValidationArguments):Promise<boolean>{
        const validarEmail=await this.clsUsuariosArmazenados.validaEmail(value)
        return !validarEmail
    }
}
export const EmailUnico =(opcoesValidacao:ValidationOptions)=>{
    return(objeto:Object, propriedade:string)=>{
        registerDecorator({
            target:objeto.constructor,
            propertyName:propriedade,
            options:opcoesValidacao,
            constraints:[],
            validator:EmailUnicoValidator
        })
    }
}