import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { AuthGuard } from "src/user/guards/auth.guard";
import { UserDecorator } from "src/user/decorators/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { IArticleResponse } from "./types/articleResponse.interface";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto/pagination-query.dto";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleServise: ArticleService) {}

    @Get()
    public async getAll(
        @Query() paginationQuery: PaginationQueryDto,
        @UserDecorator('id') currentUserId: number
    ) {
        return this.articleServise.getAll(currentUserId, paginationQuery)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    public async create(
        @UserDecorator() currentUser: UserEntity,
        @Body('articles') createArticleDto: CreateArticleDto
    ): Promise<IArticleResponse>{
        const article = await this.articleServise.create(currentUser, createArticleDto)
        return this.articleServise.buildArticleResponse(article)
    }

    @Get(':slug')
    @UseGuards(AuthGuard)
    public async getArticleBySlag(
        @Param('slug') slug: string,
    ) {
        const articleBySlug = await this.articleServise.getArticleBySlag(slug)
        return this.articleServise.buildArticleResponse(articleBySlug)
    }

    @Delete(':slug')
    @UseGuards(AuthGuard)
    public async deleteArticleBySlag(
        @UserDecorator('id') currentUserId: number,
        @Param('slug') slug: string,
    ) {
        return this.articleServise.deleteArticleBySlag(currentUserId, slug)
    }

    @Put(':slug')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    public async updateArticle(
        @UserDecorator('id') currentUserId: number,
        @Param('slug') slug: string,
        @Body('article') updateArticleDto: CreateArticleDto
    ) {
        const article = await this.articleServise.updateArticle(
            currentUserId,
            slug,
            updateArticleDto
        )

        return this.articleServise.buildArticleResponse(article)
    }
}