import { Inject, Injectable } from "@nestjs/common"
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { Repository } from "typeorm"
import {v4 as uuid} from 'uuid';
import { AlteraUsuarioDTO } from "./dto/Atualiza-Usuario.dto";
import { CriaUsuariosDTO } from "./dto/Cria-Usuario.dto"
import { USUARIO } from "./usuario.entity"


@Injectable()
export class UsuarioService {

    constructor(
        @Inject('USUARIO_REPOSITORY')
        private usuarioRepository: Repository<USUARIO>,
    ) {}

// ====================================== //// ====================================== //// ====================================== //
    
    async inserir(dados: CriaUsuariosDTO): Promise<RetornoCadastroDTO>{
        let usuario = new USUARIO();
            usuario.ID = uuid();
            usuario.NOME = dados.NOME
            usuario.EMAIL = dados.EMAIL
            usuario.CPF = dados.CPF
            usuario.CNPJ = dados.CNPJ
            usuario.trocaSenha(dados.SENHA)

        return this.usuarioRepository.save(usuario)
        .then((result) => {
        return <RetornoCadastroDTO>{
            id: usuario.ID,
            message: "Usuario cadastrado!"
        };
        })
        .catch((error) => {
        return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao cadastrar." + error.message
        };
        })
    }

// ====================================== //// ====================================== //// ====================================== //
 
    localizarID(ID: string): Promise<USUARIO> {
        return this.usuarioRepository.findOne({
          where: {
            ID,
          },
        });
    }

    localizarporEmail(EMAIL:string): Promise<USUARIO> {

        return this.usuarioRepository.findOne({
            where: {
              EMAIL,
            },
          });
    }

    async validaEmail(EMAIL: string) {
        const possivelUsuario = await this.usuarioRepository.findOne({
            where: {
                EMAIL,
            },
        });
        return (possivelUsuario !== null);
    }

// ====================================== //// ====================================== //// ====================================== //

    async alterar(id: string, dados: AlteraUsuarioDTO): Promise<RetornoCadastroDTO> {
        const usuario = await this.localizarID(id);

        Object.entries(dados).forEach(
        ([chave, valor]) => {
            if(chave=== 'id'){
                return;
            }
            if(chave=== 'SENHA'){
                usuario.trocaSenha(chave)
                return;
            }

            usuario[chave] = valor;
        }
        )

        return this.usuarioRepository.save(usuario)
        .then((result) => {
        return <RetornoCadastroDTO>{
            id: usuario.ID,
            message: "Usuario alterado!"
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

    async remover(id: string): Promise<RetornoObjDTO> {
        const usuario = await this.localizarID(id);
        
        return this.usuarioRepository.remove(usuario)
        .then((result) => {
        return <RetornoObjDTO>{
            return: usuario,
            message: "Usuario excluido!"
        };
        })
        .catch((error) => {
        return <RetornoObjDTO>{
            return: usuario,
            message: "Houve um erro ao excluir." + error.message
        };
        });  
    }

// ====================================== //// ====================================== //// ====================================== //

    async login(EMAIL:string,SENHA:string){  

        const usuario = await this.localizarporEmail(EMAIL);
    
        var ObjRetorno;
        if (usuario) {
            ObjRetorno = [usuario, usuario.login(SENHA)];
        }
        
        return <RetornoObjDTO>{
            message: ObjRetorno[1] ? "Login efetuado" : "Usuario ou senha inválidos",
            return: ObjRetorno[1] ? ObjRetorno[0] : null
        }
   
    }
}

