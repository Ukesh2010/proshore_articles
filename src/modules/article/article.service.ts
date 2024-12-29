import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticleService {
  constructor(private readonly repository: ArticleRepository) {}
  create(createArticleDto: CreateArticleDto) {
    return this.repository.create(createArticleDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.verifyArticleExist(id);
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    await this.verifyArticleExist(id);

    return this.repository.update(id, updateArticleDto);
  }

  async remove(id: string) {
    await this.verifyArticleExist(id);

    return this.repository.remove(id);
  }

  private async verifyArticleExist(id: string) {
    const article = await this.repository.findById(id);
    if (!article) {
      throw new NotFoundException('Given article doesnot exist');
    }
    return article;
  }
}
