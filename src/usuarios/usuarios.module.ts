import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UsuarioProviders } from "./usuario.providers";
import { UsuarioService } from "./usuario.service";
import { UsuariosController } from "./usuarios.controller";
import { EmailUnicoValidator } from "./validacao/email-unico.validator";


    @Module({

        imports: [DatabaseModule],
        controllers:[UsuariosController],
        providers:[    ...UsuarioProviders,
            UsuarioService, EmailUnicoValidator]

    })
    
   export class UsuariosModule{}