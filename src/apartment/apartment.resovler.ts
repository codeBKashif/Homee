import {Resolver, Query, Args, Int } from "@nestjs/graphql";
import { ApartmentModel } from "./apartment.model";
import { ApartmentService } from "./apartment.service";

@Resolver(ApartmentModel)
export class ApartmentResolver{
    constructor(private apartmentService: ApartmentService){}

    @Query(returns => [ApartmentModel])
    async apartments(
        @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number, 
        @Args('take', { type: () => Int, defaultValue: 25 }) take: number,
        @Args('city', { type: () => String, defaultValue: null }) city: string,
        @Args('country', { type: () => String, defaultValue: null }) country: string,
        @Args('lat', { type: () => String, defaultValue: null }) lat: string,
        @Args('long', { type: () => String, defaultValue: null }) long: string,
        @Args('radius', { type: () => Int, defaultValue: null }) radius: number,

        ){

        const apartments =  await this.apartmentService.get({skip, take, where: {city, country, lat, long, radius}});
        return apartments;
    }
}