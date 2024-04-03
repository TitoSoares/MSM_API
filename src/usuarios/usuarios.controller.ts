import { Controller, Get, Post } from "@nestjs/common";
import { Body, Delete, Param, Put } from "@nestjs/common";
import { CriaUsuariosDTO } from "./dto/Cria-Usuario.dto";
import { USUARIO } from "./usuario.entity";
import {v4  as uuid} from 'uuid'

import { AlteraUsuarioDTO } from "./dto/Atualiza-Usuario.dto";
import { LoginUsuarioDTO } from "./dto/Login-Usuario.dto";
import { ApiResponse, ApiResponseProperty, ApiTags } from "@nestjs/swagger";
import { UsuarioService } from "./usuario.service";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";

@Controller('/usuarios')
@ApiTags('usuarios')
export class UsuariosController{
    constructor(private readonly usuarioService: UsuarioService){}

    // Cria Usuario
    // ====================================== //// ====================================== //// ====================================== //
        @ApiResponse({status:200, description:"A operação foi um sucesso"})
        @ApiResponse({status:500, description:"Ocorreu um erro na operação! Tente novamente mais tarde"})

        @Post()
        async criaUsuario(@Body() dados:CriaUsuariosDTO): Promise<RetornoCadastroDTO>{        
            return this.usuarioService.inserir(dados)        
        }
        
    // ====================================== //// ====================================== //// ====================================== //


    // Atualiza Usuario
    // ====================================== //// ====================================== //// ====================================== //
        @ApiResponse({status:200, description:"A operação foi um sucesso"})
        @ApiResponse({status:500, description:"Ocorreu um erro na operação! Tente novamente mais tarde"})


        @Put(':id')
        async alterarUsuario(@Body() dados: AlteraUsuarioDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
            return this.usuarioService.alterar(id,dados)        
        }

    // ====================================== //// ====================================== //// ====================================== //
   

    // Deleta Usuario 
    // ====================================== //// ====================================== //// ====================================== //
        @ApiResponse({status:200, description:"A operação foi um sucesso"})
        @ApiResponse({status:500, description:"Ocorreu um erro na operação! Tente novamente mais tarde"})
        
        @Delete(':id')
        async removeGenero(@Param('id') id: string): Promise<RetornoObjDTO>{
            return this.usuarioService.remover(id);
        }    

    // ====================================== //// ====================================== //// ====================================== //  
    
    
    // Login
    // ====================================== //// ====================================== //// ====================================== //  
        // ====Swagger============================ //
        @ApiResponse({status:200, description:"A operação foi um sucesso"})
        @ApiResponse({status:500, description:"Ocorreu um erro na operação! Tente novamente mais tarde"})
        // ====Swagger============================ //

        @Post('/login')

        async login(@Body() dados: LoginUsuarioDTO): Promise<RetornoObjDTO>{
            return this.usuarioService.login(dados.EMAIL,dados.SENHA);
        }    

    // ====================================== //// ====================================== //// ====================================== // 
}