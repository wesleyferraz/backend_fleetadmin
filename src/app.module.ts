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
import { ViagemModule } from './viagem/viagem.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { PostoModule } from './posto/posto.module';
import { AbastecimentoModule } from './abastecimento/abastecimento.module';
import { PneuModule } from './pneu/pneu.module';
import { AuthModule } from './auth/auth.module';
import { OleoModule } from './oleo/oleo.module';
import { OleoTrocaCorretivaModule } from './oleo-troca-corretiva/oleo-troca-corretiva.module';
import { OverviewModule } from './overview/overview.module';
import { AlertModule } from './alert/alert.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'srv1308.hstgr.io',
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME || 'u667470076_bd_admin',
      password: process.env.DATABASE_PASSWORD || 'uQjCpCjik9eIgvE',
      database: process.env.DATABASE_NAME || 'u667470076_i7_gestao',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Verifique se este caminho corresponde ao seu arquivo .env
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
    ViagemModule,
    FornecedorModule,
    PostoModule,
    AbastecimentoModule,
    PneuModule,
    AuthModule,
    OleoModule,
    OleoTrocaCorretivaModule,
    OverviewModule,
    AlertModule,
    ScheduleModule.forRoot(),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
