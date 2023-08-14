import { SetMetadata } from '@nestjs/common';
import { Roles } from '../types/role.type';

export const Role = (role: Roles) => SetMetadata('roles', role);
