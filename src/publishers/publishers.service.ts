import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePublisherDto } from './dto/create-repository.dto';
import { PublishersRepository } from './publishers.repository';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(PublishersRepository)
    private publishersRepository: PublishersRepository,
  ) {}

  createPublisher(createPublisherDto: CreatePublisherDto) {
    return this.publishersRepository.createPublisher(createPublisherDto);
  }
}
