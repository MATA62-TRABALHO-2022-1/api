import { CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: GqlExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;        
        const userRole = user.role.name;
        const hasRole = () => !!requiredRoles.find(item => item === userRole);

        return user && userRole && hasRole();
    }
}