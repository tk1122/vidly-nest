import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserEntity } from '../users.entity';

@Injectable()
export class RolesGaurd implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles.length === 0) return true;

    const request: Request = context.switchToHttp().getRequest();
    if (!request.user) return false;

    const user: UserEntity = request.user;

    return roles.includes(user.role);
  }
}
