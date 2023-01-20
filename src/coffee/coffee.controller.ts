import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffee')
export class CoffeeController {
	constructor(private readonly coffeeService: CoffeeService) {}

	@Get()
	async findAll(@Query() paginationQuery: PaginationQueryDto) {
		// const { limit, offset } = paginationQuery
		return this.coffeeService.findAll(paginationQuery)
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.coffeeService.findOne(+id)
	}

	@Post()
	async create(@Body() createCoffeeDto: CreateCoffeeDto) {
		return this.coffeeService.create(createCoffeeDto)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string, 
		@Body() updateCoffeeDto: UpdateCoffeeDto
		) {
		return this.coffeeService.update(id, updateCoffeeDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.coffeeService.remove(id)
	}
}
