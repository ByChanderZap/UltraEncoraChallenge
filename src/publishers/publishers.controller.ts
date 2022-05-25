import { Body, Controller, Post } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-repository.dto';
import { PublishersService } from './publishers.service';

@Controller('publishers')
export class PublishersController {
  constructor(private publisherService: PublishersService) {}

  @Post()
  createPublisher(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publisherService.createPublisher(createPublisherDto);
  }
}
