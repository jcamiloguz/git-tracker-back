import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [ConfigModule.forRoot(), RepositoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
