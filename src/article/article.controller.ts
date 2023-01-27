import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { AuthGuard } from "src/user/guards/auth.guard";
import { UserDecorator } from "src/user/decorators/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { IArticleResponse } from "./types/articleResponse.interface";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleServise: ArticleService) {}

    @Post()
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
}