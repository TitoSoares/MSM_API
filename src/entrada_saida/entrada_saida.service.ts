import { Inject, Injectable } from "@nestjs/common";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { USUARIO } from "src/usuarios/usuario.entity";
import { UsuarioService } from "src/usuarios/usuario.service";
import { Repository } from "typeorm";
import {v4  as uuid} from 'uuid'
import { AlteraEntrada_SaidaDTO } from "./dto/atualizaEntrada_Saida.dto";
import { CriaEntrada_SaidaDTO } from "./dto/entrada_saida.dto";
import { ListaEntrada_Saida } from "./dto/listaEntrada_Saida.dto";
import { ENTRADA_SAIDA } from "./entrada_saida.entity";


@Injectable()
export class Entrada_saidaService {

    constructor(
        @Inject('ENTRADA_SAIDA_REPOSITORY')
        private entrada_saidaRepository: Repository<ENTRADA_SAIDA>,
        @Inject('USUARIO_REPOSITORY')
        private usuarioRepository: Repository<USUARIO>,
        private readonly usuarioService: UsuarioService,
    ) {}

// ====================================== //// ====================================== //// ====================================== //
    
    async inserir(dados: CriaEntrada_SaidaDTO): Promise<RetornoCadastroDTO>{
        let entrada_saida = new ENTRADA_SAIDA();
            entrada_saida.ID = uuid();
            entrada_saida.TIPO = dados.tipo;
            entrada_saida.VALOR = dados.valor;
            entrada_saida.IDUSUARIO = await this.usuarioService.localizarID(dados.idusuario); 

        return this.entrada_saidaRepository.save(entrada_saida)
        .then((result) => {
        return <RetornoCadastroDTO>{
            id: entrada_saida.ID,
            message: "Operação feita!"
        };
        })
        .catch((error) => {
        return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao fazer a Operação." + error.message
        };
        })
    }

// ====================================== //// ====================================== //// ====================================== //

    localizarID(ID: string): Promise<ENTRADA_SAIDA> {
        return this.entrada_saidaRepository.findOne({
        where: {
            ID,
        },
        });
    }

    async listarEntradaSaida(id: string){
        var total = await (this.entrada_saidaRepository 
          .createQueryBuilder('entrada_saida')
          .select('IDUSUARIO', 'ID')
          .addSelect('SUM(IF(TIPO, VALOR, VALOR * -1))','TOTAL')   
          .andWhere('IDUSUARIO = :ID',{ ID: `${id}` })    
          .addGroupBy('IDUSUARIO')           
          .getRawOne());
        var Usuario = await this.usuarioService.localizarID(id);
    
        var LISTA = await (this.entrada_saidaRepository 
            .createQueryBuilder('entrada_saida')
            .select('ID', 'ID')
            .addSelect('TIPO', 'TIPO')
            .addSelect('VALOR', 'VALOR')
            .andWhere('IDUSUARIO = :ID',{ ID: `${id}` })           
            .getRawMany());
        
        return {Total: total.TOTAL,
                ListaEntradaSaida: LISTA}
        
    }

// ====================================== //// ====================================== //// ====================================== //

    async alterar(id: string, dados: AlteraEntrada_SaidaDTO): Promise<RetornoCadastroDTO> {
        const entrada_saida = await this.localizarID(id);

        Object.entries(dados).forEach(
        ([chave, valor]) => {
            if(chave=== 'id'){
                return;
            }

            entrada_saida[chave] = valor;
        }
        )

        return this.entrada_saidaRepository.save(entrada_saida)
        .then((result) => {
        return <RetornoCadastroDTO>{
            id: entrada_saida.ID,
            message: "Operação alterada!"
        };
        })
        .catch((error) => {
        return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao alterar." + error.message
        };
        });
    }

// ====================================== //// ====================================== //// ====================================== //

    async listar(): Promise<ListaEntrada_Saida[]> {
        var seriesListados = await this.entrada_saidaRepository.find();
        return seriesListados.map(
            entrada_saida => new ListaEntrada_Saida(
              entrada_saida.ID,
              entrada_saida.TIPO,    
              entrada_saida.VALOR,
              entrada_saida.IDFILES,
          ))
            
      }
    
// ====================================== //// ====================================== //// ====================================== //

async remover(id: string): Promise<RetornoObjDTO> {
    const entrada_saida = await this.localizarID(id);
    
    return this.entrada_saidaRepository.remove(entrada_saida)
    .then((result) => {
    return <RetornoObjDTO>{
        return: entrada_saida,
        message: "Operação excluida!"
    };
    })
    .catch((error) => {
    return <RetornoObjDTO>{
        return: entrada_saida,
        message: "Houve um erro ao excluir." + error.message
    };
    });  
}

}