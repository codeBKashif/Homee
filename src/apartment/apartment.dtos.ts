import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class AddApartmentDTO{
    @IsNotEmpty()
    city: string; 

    @IsNotEmpty()
    country: string; 
    
    @IsNotEmpty()
    @Type(() => Number)
    rooms: number; 
    
    @IsNotEmpty()
    @IsString()
    lat: string; 


    @IsNotEmpty()
    @IsString()
    long: string; 
    
    @IsNotEmpty()
    @IsString()
    building: string
  }

  