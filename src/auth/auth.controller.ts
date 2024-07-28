import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  async login(@Body() body) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string' },
        email: { type: 'string' },
        senha: { type: 'string' },
      },
    },
  })
  async register(@Body() body) {
    const { nome, email, senha } = body;
    return this.authService.register(nome, email, senha);
  }
}
