import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersAdminService } from 'src/user-admin/user-admin.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private usersService: UsersAdminService) {
    super({
      usernameField: 'email', // Use 'email' como campo de login
      session: false, // Desabilitar sessões
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('aqui----------------------------------');
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.senha))) {
      const { senha, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }
}
