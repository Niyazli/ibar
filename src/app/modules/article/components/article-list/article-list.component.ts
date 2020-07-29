import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleSearchDto } from '../../models/article-search.dto';
import { ArticleModel } from '../../models/article.model';
import { Pagination } from '../../../../models/response.model';
import { UserService } from '../../../user/services/user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  public articles: ArticleModel[];
  public articleFilterDto: ArticleSearchDto;
  public pagination: Pagination;

  public selectedUserId: string;
  public loadingState = false;
  public multiply: boolean;
  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.userService.selectedUser.subscribe((user) => {
      this.articleFilterDto.user_id = user.id;
      this.selectedUserId = user.id;
      this.getData();
    });
    this.userService.$deletedUserId.subscribe(() => {
      this.articleFilterDto.user_id = '';
      this.selectedUserId = null;
      this.getData();
    });
  }

  private getData(): void {
    this.loadingState = true;
    if (!this.articleFilterDto) {
      this.articleFilterDto = new ArticleSearchDto();
    }
    this.articleService.getAllArticles(this.articleFilterDto).subscribe(
      (r) => {
        this.loadingState = false;
        this.articles = r.result;
        this.pagination = r._meta;
      },
      () => (this.loadingState = false)
    );
  }

  handlePage(event: PageEvent) {
    this.articleFilterDto.page = event.pageIndex + 1;
    this.getData();
  }

  handleCreateArticle() {
    const article = new ArticleModel();
    article.user_id = this.selectedUserId;
    this.articles.unshift(article);
  }

  handleSaveArticle(article: ArticleModel) {
    this.articleService.createArticle(article).subscribe((res) => {
      if (!article.id) {
        const index = this.articles.indexOf(this.articles.find((a) => !a.id));
        this.articles.splice(index, 1);
        this.articles.unshift(res.result);
      }
    });
  }

  handleDeleteArticle(id: string, index: number) {
    this.articleService.deleteArticle(id).subscribe(() => {
      this.articles.splice(index, 1);
    });
  }

  handleUpdateArticle(article: ArticleModel) {
    this.articleService
      .updateArticle(article.id, article)
      .subscribe(() => console.log('added'));
  }
}
