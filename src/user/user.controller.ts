import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Favorite, User } from '@prisma/client';
import { UserService } from "./user.service";
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { Public, RegisterUserDTO, LoginUserDTO, MarkFavorite} from "./user.dtos";


@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('/register')
  @Public()
  register(@Body() data: RegisterUserDTO): Promise<User>  {
    return this.userService.createUser(data)
  }

  @Post('/login')
  @Public()
  async login(@Res() response: Response, @Body() data: LoginUserDTO){

    const token = await this.authService.login(data.email, data.password);

    response
      .cookie('access_token', token, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
  }

  @Post("/favorite")
  markFavorite(@Body() data: MarkFavorite, @Req() request): Promise<Favorite>{   
    return this.userService.addFavorite({...data, userId: request.user.id});
  }

  @Get("/favorite")
  getFavorites(@Req() request): Promise<Favorite[]>{   
    return this.userService.getFavorites(request.user.id);
  }
}
