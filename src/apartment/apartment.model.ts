import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class ApartmentModel {
    @Field(type => ID)
    rooms: number;

    @Field(type => ID)
    city: string;

    @Field(type => ID)
    country: string
    
    @Field(type => ID)
    userId: number;

    @Field()
    lat: string;

    @Field()
    long: string;

    @Field()
    building: string
  }