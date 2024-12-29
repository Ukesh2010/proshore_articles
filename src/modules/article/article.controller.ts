import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
} from '@nestjs/swagger';
import {
  articleNotFound,
  createArticle,
  deleteArticle,
  updateArticle,
  viewArticle,
  viewArticles,
} from './article.swagger';

@Controller('article')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiResponse({
    status: 201,
    example: createArticle,
  })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    example: viewArticles,
  })
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    example: viewArticle,
  })
  @ApiNotFoundResponse({
    example: articleNotFound,
  })
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    example: updateArticle,
  })
  @ApiNotFoundResponse({
    example: articleNotFound,
  })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    example: deleteArticle,
  })
  @ApiNotFoundResponse({
    example: articleNotFound,
  })
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
