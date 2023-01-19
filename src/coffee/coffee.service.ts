import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
	private coffees: Coffee[] = [
		{
			id: 1,
			name: 'Shipwreck Roast',
			brand: 'Buddy Brew',
			flavors: ['chocolate', 'vanilla']
		}
	];

	async findAll() {
		return this.coffees
	}

	async findOne(id: string) {
		const coffee =  this.coffees.find(item => item.id === +id)
		if (!coffee) {
			throw new NotFoundException(`Coffee #${id} not found`)
		}
		return coffee;
	}

	async create(createCoffeeDto: any) {
		this.coffees.push(createCoffeeDto)
	}

	async update(id: string, updateCoffeeDto: any) {
		const existingCoffee = this.findOne(id)
		if (existingCoffee) {
			// update the existing entity
		}
	}

	async remove(id: string) {
		const coffeeIndex = this.coffees.findIndex(item => item.id === + id)
		if (coffeeIndex >= 0) {
			this.coffees.splice(coffeeIndex, 1)
		}
	}
}
