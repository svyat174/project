import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import CONNECTION from './db.connection';

@Module({
  imports: [
    CoffeeModule, 
    // @ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true
    }), CoffeeRatingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
