import { EntityRepository, Repository } from 'typeorm';
import { CreatePublisherDto } from './dto/create-repository.dto';
import { Publisher } from './publishers.entity';

@EntityRepository(Publisher)
export class PublishersRepository extends Repository<Publisher> {
  async createPublisher(
    createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    const publisher = this.create({
      ...createPublisherDto,
    });

    await this.save(publisher);

    return publisher;
  }
}
