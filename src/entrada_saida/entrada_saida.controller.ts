import { Controller, Post } from "@nestjs/common";
import { Body, Delete, Get, Param, Put } from "@nestjs/common";
import {v4  as uuid} from 'uuid'
import { ApiResponse, ApiResponseProperty, ApiTags } from "@nestjs/swagger";
import { Entrada_SaidaArmazenados } from "./entrada_saida.dm";
import { CriaEntrada_SaidaDTO } from "./dto/entrada_saida.dto";
import { AlteraEntrada_SaidaDTO } from "./dto/atualizaEntrada_Saida.dto";
import { ListaEntrada_Saida } from "./dto/listaEntrada_Saida.dto";
import { AlteraFotoEntrada_SaidaDTO } from "./dto/alteraFotoEntrada_Saida.dto";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { Entrada_saidaService } from "./entrada_saida.service";

@Controller('/entrada_saida')
@ApiTags('entrada_saida')
export class Entrada_saidaController{

    constructor(private readonly entrada_saidaService: Entrada_saidaService){}


    // Cria Entrada/Saida
    // ====================================== //// ====================================== //// ====================================== //    
        // ====Swagger============================ //
        @ApiResponse({status:200, description:"A operação foi um sucesso"})
        @ApiResponse({status:500, description:"Ocorreu um erro na operação! Tente novamente mais tarde"})
        // ====Swagger============================ //

        @Post()

        async criaEntrada_Saida(@Body() dados:CriaEntrada_SaidaDTO): Promise<RetornoCadastroDTO>{        
            return this.entrada_saidaService.inserir(dados)        
        }
        
    // ====================================== //// ====================================== //// ====================================== //


        // Altera Entrada/Saida
    // ====================================== //// ====================================== //// ====================================== //
    // ====Swagger============================ //
    @ApiResponse({status:200, description:"A operação foi um sucesso"})
    @ApiResponse({status:500, description:"Ocorreu um erro na operação! Tente novamente mais tarde"})
    // ====Swagger============================ //

    @Put("/:id")
    async alterarUsuario(@Body() dados: AlteraEntrada_SaidaDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.entrada_saidaService.alterar(id,dados)        
    }
    // ====================================== //// ====================================== //// ====================================== //


        // Retorna Entrada/Saida
    // ====================================== //// ====================================== //// ====================================== //
    // ====Swagger============================ //
    @ApiResponse({status:200, description:"A operação foi um sucesso"})
    @ApiResponse({status:500, description:"Ocorreu um erro na operação! Tente novamente mais tarde"})
    // ====Swagger============================ //

    @Get()
    async RetornoEntrada_Saida():Promise<ListaEntrada_Saida[]> {
        return this.entrada_saidaService.listar();
    }

    // ====================================== //// ====================================== //// ====================================== //


        // Deleta Entrada/Saida
    // ====================================== //// ====================================== //// ====================================== //
    // ====Swagger============================ //
    @ApiResponse({status:200, description:"A operação foi um sucesso"})
    @ApiResponse({status:500, description:"Ocorreu um erro na operação! Tente novamente mais tarde"})
    // ====Swagger============================ //

    @Delete('/:id')

    async removeGenero(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.entrada_saidaService.remover(id);
    }    
    // ====================================== //// ====================================== //// ====================================== //
}