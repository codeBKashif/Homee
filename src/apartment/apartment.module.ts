import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaService } from "src/prisma.service";
import { ApartmentController } from "./apartment.controller";
import { ApartmentResolver } from "./apartment.resovler";
import { ApartmentService } from "./apartment.service";

@Module({
    imports: [AuthModule],
    controllers: [ApartmentController],
    providers: [ApartmentService, PrismaService, ApartmentResolver]
})
export class ApartmentModule {};