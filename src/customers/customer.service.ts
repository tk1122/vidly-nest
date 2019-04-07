import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({ id });
    if (!customer) throw new NotFoundException('Customer not found');

    return customer;
  }

  async create(customerData: CreateCustomerDto) {
    const customer = new CustomerEntity();

    Object.assign(customer, customerData);

    return this.customerRepository.save(customer);
  }

  async update(id: number, customerData: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne({ id });
    if (!customer) throw new NotFoundException('Customer not found');

    Object.assign(customer, customerData);

    return this.customerRepository.save(customer);
  }

  async remove(id: number) {
    const customer = await this.customerRepository.findOne({ id });
    if (!customer) throw new NotFoundException('Customer not found');

    return this.customerRepository.remove(customer);
  }
}
