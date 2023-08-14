import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  consultant = 'CONSULTANT',
  user = 'USER',
}

registerEnumType(Roles, {
  name: 'Roles',
});
