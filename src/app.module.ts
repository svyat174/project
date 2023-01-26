import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import CONNECTION from './db.connection';
import { UserModel } from './user/user.module';

@Module({
  imports: [
    // @ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true
    }), 
    CoffeeModule,
    UserModel
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
