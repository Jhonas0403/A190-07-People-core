import { Module } from "@nestjs/common";
import { Configuration } from "src/infraestructure/configuration/configuration";
@Module({
    providers:[Configuration],
    exports:[Configuration],
})

export class ConfigurationModule{}