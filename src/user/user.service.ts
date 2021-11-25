import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Favorite,
  User,
} from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async users(params: {
    skip?: number;
    take?: number;
    where?: any;
    orderBy?: any;
  }): Promise<User[]> {
    return this.prisma.user.findMany({select: {id: true, email: true, name: true, createdAt: true, password: true}, ...params});
  }

  async createUser(data: {name: string, email: string, password: string}): Promise<User> {
    const user = await this.prisma.user.findFirst({where: {email: data.email}});

    if(user)
        throw new BadRequestException("User already exists with the provided email");

    return this.prisma.user.create({
      data,
    });
  }

  async addFavorite(data: {userId: number, apartmentId: number}):Promise<Favorite>{
    return this.prisma.favorite.create({data});
  }

  async getFavorites(userId: number): Promise<Favorite[]>{
    return this.prisma.favorite.findMany({where: {userId: userId}, include : {
      Apartment: true
    }})
  }

  
}