import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from './common/logger/Winston.Logger';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guard/Auth.guard';
import { UserService } from './modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLogger(),
  });

  app.enableCors({
    credentials: true,
    origin: '*',
  });
  const jwt = app.get<JwtService>(JwtService);
  const userService = app.get<UserService>(UserService);
  const reflector = app.get<Reflector>(Reflector);

  app.useGlobalGuards(new AuthGuard(jwt, userService, reflector));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard(jwt, userService, reflector));
  await app.listen(3000);
}
bootstrap();
