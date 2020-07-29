import { Injectable } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../../models/response.model';
import { ArticleModel } from '../models/article.model';
import { ArticleSearchDto } from '../models/article-search.dto';

/**
 * Service to work with API Entities = Article
 *
 * @export
 * @class ArticleService
 */
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly apiUrl: string;

  /**
   * Creates an instance of ArticleService.
   * @param {APIService} apiService
   * @memberof ArticleService
   */
  constructor(private apiService: APIService) {
    this.apiUrl = 'posts';
  }

  /**
   * Get all articles
   *
   * @public
   * @template R
   * @param {ArticleSearchDto} dto
   * @returns {Observable<ArticleModel[]>}
   * @memberof ArticleService
   */
  public getAllArticles(
    dto: ArticleSearchDto
  ): Observable<ResponseModel<ArticleModel[]>> {
    return this.apiService.get(
      `${this.apiUrl}?page=${dto.page}&user_id=${dto.user_id}`
    );
  }
  /**
   * Create Article
   *
   * @public
   * @template R
   * @param {ArticleModel} dto
   * @returns {Observable<ResponseModel<ArticleModel>>}
   * @memberof ArticleService
   */
  public createArticle(
    dto: ArticleModel
  ): Observable<ResponseModel<ArticleModel>> {
    return this.apiService.post(`${this.apiUrl}`, dto);
  }
  /**
   * Update Article
   *
   * @public
   * @template R
   * @param {number} id
   * @param {ArticleModel} dto
   * @returns {Observable<ResponseModel<ArticleModel>>}
   * @memberof ArticleService
   */
  public updateArticle(
    id: string,
    dto: ArticleModel
  ): Observable<ResponseModel<ArticleModel>> {
    return this.apiService.put(`${this.apiUrl}/${id}`, dto);
  }
  /**
   * Delete Article
   *
   * @public
   * @template R
   * @param {number} id
   * @returns {Observable<ResponseModel<ArticleModel>>}
   * @memberof ArticleService
   */
  public deleteArticle(id?: string): Observable<ResponseModel<ArticleModel>> {
    return this.apiService.delete(`${this.apiUrl}/${id}`);
  }
}
