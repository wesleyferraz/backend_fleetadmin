import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnderecoModule } from './endereco/endereco.module';
import { ManutencaoCorretivaModule } from './manutencao-corretiva/manutencao-corretiva.module';
import { MotoristaModule } from './motorista/motorista.module';
import { OficinaModule } from './oficina/oficina.module';
import { PecaModule } from './peca/peca.module';
import { PecaTrocaCorretivaModule } from './peca-troca-corretiva/peca-troca-corretiva.module';
import { SeguradoraModule } from './seguradora/seguradora.module';
import { SeguroModule } from './seguro/seguro.module';
import { UserAdminModule } from './user-admin/user-admin.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { FaturamentoModule } from './faturamento/faturamento.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { PostoModule } from './posto/posto.module';
import { CombustivelModule } from './combustivel/combustivel.module';
import { PneuModule } from './pneu/pneu.module';
import { AuthModule } from './auth/auth.module';
import { OleoModule } from './oleo/oleo.module';
import { OleoTrocaCorretivaModule } from './oleo-troca-corretiva/oleo-troca-corretiva.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'srv1308.hstgr.io',
      port: 3306,
      username: 'u667470076_admin',
      password: 'lagoanova@BA-2024!-db',
      database: 'u667470076_db_fleetadmin',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env', // Caminho para o seu arquivo .env
    }),

    EnderecoModule,
    ManutencaoCorretivaModule,
    MotoristaModule,
    OficinaModule,
    PecaModule,
    PecaTrocaCorretivaModule,
    SeguradoraModule,
    SeguroModule,
    UserAdminModule,
    VeiculoModule,
    FaturamentoModule,
    FornecedorModule,
    PostoModule,
    CombustivelModule,
    PneuModule,
    AuthModule,
    OleoModule,
    OleoTrocaCorretivaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
