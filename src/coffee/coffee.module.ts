import { Module } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  providers: [
    {
      provide: CoffeeService,
      useClass: CoffeeService
    }
  ],
  controllers: [CoffeeController],
  exports: [CoffeeService]
})
export class CoffeeModule {}
