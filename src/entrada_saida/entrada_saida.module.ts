import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UsuarioProviders } from "src/usuarios/usuario.providers";
import { UsuarioService } from "src/usuarios/usuario.service";
import { Entrada_saidaController } from "./entrada_saida.controller";
import { Entrada_saidaProviders } from "./entrada_saida.providers";
import { Entrada_saidaService } from "./entrada_saida.service";


@Module({

    imports: [DatabaseModule],
    controllers:[Entrada_saidaController],
    providers:[    ...UsuarioProviders,
        UsuarioService,
        ...Entrada_saidaProviders,
        Entrada_saidaService,
    ]

})

export class Entrada_SaidaModule{
    
}