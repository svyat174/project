import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import config from 'ormconfig';

@Module({
  imports: [
    CoffeeModule, 
    TypeOrmModule.forRoot(config)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
