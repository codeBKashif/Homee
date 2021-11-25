import { SetMetadata } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export const Public = () => SetMetadata('isPublic', true);

export class RegisterUserDTO{
  @IsNotEmpty()
  name: string; 

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty() 
  password: string;
}

export class LoginUserDTO{
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty() 
  password: string;
}

export class MarkFavorite{
  @IsNotEmpty()
  @Type(() => Number)
  apartmentId: number;
}