import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosArmazenados } from "./usuarios.dm";
import { EmailUnicoValidator } from "./validacao/email-unico.validator";


    @Module({

        imports: [DatabaseModule],
        controllers:[UsuariosController],
        providers:[    ...usuarioProviders,
            UsuarioService,, EmailUnicoValidator]

    })
    
   export class UsuariosModule{}