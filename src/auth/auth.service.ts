import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import {jwtConstants} from "./constants";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}


  async login(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({where: {email, password}});
    if (!user) 
      throw new UnauthorizedException();
    
    const payload = { email: user.email, id: user.id };
     
    return this.jwtService.sign(payload);
  }

    validate(req){
        
    if (!req || !req.cookies) throw new UnauthorizedException();

    const token = req.cookies['access_token'];

    try{
        const payload = this.jwtService.verify(token, {
            secret: jwtConstants.secret
        });

        if(!payload) throw new UnauthorizedException();

        req.user = payload;
    }catch(_err){
        throw new UnauthorizedException();
    }
    
  }
}