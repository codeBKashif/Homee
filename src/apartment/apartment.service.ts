import { Injectable, Req } from "@nestjs/common";
import { Apartment } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ApartmentService{
    constructor(private prismaService: PrismaService){}

    async add(data: {city: string, country: string, rooms: number, lat: string, long: string, building: string, userId: number}): Promise<Apartment>{
        
        data.city = data.city.toLowerCase();
        data.country = data.country.toLowerCase();

        return this.prismaService.apartment.create({data});
    }

    async get(params: {
        skip?: number;
        take?: number;
        where?: any;
        orderBy?: any;
    }): Promise<Apartment[]>{

        const {skip, take, where, orderBy } = params;
        const {city, country} = where;

        const apartments = await this.prismaService.apartment.findMany({skip, take, orderBy, where: {...(city && {city: city.toLowerCase()}), ...(country && {country : country.toLowerCase()})}});

        const {lat, long, radius} = where;

        const apartmentsWithDistance =  apartments.map((apartment) => {
            return {
                ...apartment,
                distance: this.filterDistance(apartment.lat, apartment.long, lat || 0, long || 0)
            }
        })

        if(radius)
            return apartmentsWithDistance.filter((apartment) => apartment.distance <= radius)

        return apartmentsWithDistance;
        
    }

    filterDistance(lat1, lon1, lat2, lon2) 
    {
      const R = 6371;
      const dLat = this.toRad(lat2-lat1);
      const dLon = this.toRad(lon2-lon1);
      lat1 = this.toRad(lat1);
      lat2 = this.toRad(lat2);

      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const d = R * c;
      return d.toFixed(1);
    }

    toRad(value) 
    {
        return value * Math.PI / 180;
    }
}