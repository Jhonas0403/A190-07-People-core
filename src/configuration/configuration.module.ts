import { Module } from "@nestjs/common";
import { Configuration } from "src/configuration/configuration";
@Module({
    providers:[Configuration],
    exports:[Configuration],
})

export class ConfigurationModule{}