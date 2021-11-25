import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get('isPublic', context.getHandler());

    if(isPublic) return true;

    const request = context.switchToHttp().getRequest();

    // GraphQL case
    // TODO: Authenticate using GraphQL
    if(!request) return true;

    this.authService.validate(request);
    return true;
  }

  constructor(private authService: AuthService, private reflector: Reflector){}

  
}
