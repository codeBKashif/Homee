import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApartmentModule } from './apartment/apartment.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, ApartmentModule,  GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
   })
],
  controllers: [],
  providers: [PrismaService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule {}
