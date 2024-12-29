import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.article.findMany();
  }

  findById(id: string) {
    return this.prismaService.article.findUnique({ where: { id } });
  }

  remove(id: string) {
    return this.prismaService.article.delete({ where: { id } });
  }

  update(id: string, payload: Prisma.ArticleUncheckedUpdateInput) {
    return this.prismaService.article.update({
      where: { id },
      data: payload,
    });
  }

  create(payload: Prisma.ArticleUncheckedCreateInput) {
    return this.prismaService.article.create({ data: payload });
  }
}
