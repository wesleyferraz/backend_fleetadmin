import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CnhModule } from './cnh/cnh.module';
import { EnderecoModule } from './endereco/endereco.module';
import { InfracaoModule } from './infracao/infracao.module';
import { ManutencaoCorretivaModule } from './manutencao-corretiva/manutencao-corretiva.module';
import { ManutencaoPreventivaModule } from './manutencao-preventiva/manutencao-preventiva.module';
import { MotoristaModule } from './motorista/motorista.module';
import { OficinaModule } from './oficina/oficina.module';
import { PecaModule } from './peca/peca.module';
import { PecaTrocaCorretivaModule } from './peca-troca-corretiva/peca-troca-corretiva.module';
import { PecaTrocaPreventivaModule } from './peca-troca-preventiva/peca-troca-preventiva.module';
import { SeguradoraModule } from './seguradora/seguradora.module';
import { SeguroModule } from './seguro/seguro.module';
import { ServicoManutencaoModule } from './servico-manutencao/servico-manutencao.module';
import { ServicoRealizadoCorretivaModule } from './servico-realizado-corretiva/servico-realizado-corretiva.module';
import { ServicoRealizadoPreventivaModule } from './servico-realizado-preventiva/servico-realizado-preventiva.module';
import { UserAdminModule } from './user-admin/user-admin.module';
import { VeiculoModule } from './veiculo/veiculo.module';
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
    CnhModule,
    EnderecoModule,
    InfracaoModule,
    ManutencaoCorretivaModule,
    ManutencaoPreventivaModule,
    MotoristaModule,
    OficinaModule,
    PecaModule,
    PecaTrocaCorretivaModule,
    PecaTrocaPreventivaModule,
    SeguradoraModule,
    SeguroModule,
    ServicoManutencaoModule,
    ServicoRealizadoCorretivaModule,
    ServicoRealizadoPreventivaModule,
    UserAdminModule,
    VeiculoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
