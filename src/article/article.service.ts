import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserEntity } from "src/user/entities/user.entity";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { ArticleEntity } from "./entities/article.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import slugify from "slugify";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>
    ) {}

    public async create(
        currentUser: UserEntity,
        createArticleDto: CreateArticleDto
    ) {
        const article = new ArticleEntity()
        Object.assign(article, createArticleDto)

        if (!article.tagList) {
            article.tagList = []
        }

        article.slug = this.getSlug(article.title)

        article.author = currentUser

        return await this.articleRepository.save(article)
    }

    public buildArticleResponse(article: ArticleEntity) {
        return {article}
    }

    private getSlug(title: string) {
        return (
            slugify(title, { lower: true }) + 
            '-' + 
            ((Math.random() * Math.pow(36, 6)) | 0 ).toString(36)
        )
    }

    public async getArticleBySlag(slug: string) {
		const articleBySlug = await this.articleRepository.findOne({ where : { slug } })

        return articleBySlug
	}

    public async deleteArticleBySlag(currentUserId: number, slug: string) {
        const articleBySlug = await this.getArticleBySlag(slug)

        if (!articleBySlug) {
            throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND)
        }

        if (articleBySlug.author.id !== currentUserId) {
            throw new HttpException('You are not an author', HttpStatus.FORBIDDEN)
        }

        return this.articleRepository.delete({ slug })
    }
}