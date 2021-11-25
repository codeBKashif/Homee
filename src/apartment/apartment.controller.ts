import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { ApartmentService } from "./apartment.service";
import {AddApartmentDTO} from "./apartment.dtos";


@Controller('apartment')
export class ApartmentController{
    constructor(private apartmentService: ApartmentService){}

    @Post("/")
    addApartment(@Body() data: AddApartmentDTO, @Req() request){
        return this.apartmentService.add({...data, userId: request.user.id});
    }

    @Get("/")
    getApartment(@Query() query){
        const {skip, take, city, country, lat, long, radius} = query;
        
        return this.apartmentService.get({skip, take, where: {city, country, lat, long, radius}})
    }

}