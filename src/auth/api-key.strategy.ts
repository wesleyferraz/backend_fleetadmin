import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer'; // Dependendo da forma como você implementa a chave API

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor() {
    super();
  }

  async validate(apiKey: string): Promise<any> {
    // Lógica para validar a chave de API
    if (apiKey === 'sua-chave-de-api') {
      return true; // Retorna o usuário ou informações relevantes se a chave for válida
    }
    throw new UnauthorizedException(); // Caso contrário, lança uma exceção de não autorizado
  }
}
