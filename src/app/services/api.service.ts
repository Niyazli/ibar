import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LayoutService } from './layout.service';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  /**
   * Creates an instance of BackendService.
   * @param {HttpClient} httpClient
   * @param {LayoutService} layoutService
   * @memberof APIService
   */
  constructor(
    private httpClient: HttpClient,
    private layoutService: LayoutService
  ) {
    this.apiUrl = environment.apiUrl;
    this.token = '8KWkGPj9e9BHTI2Gu2FuHz2w5-lnPLnNxF2r';
  }
  private readonly apiUrl: string;
  private readonly token: string;

  /**
   * Combines url sent from services with apiHost
   *
   * @private
   * @template R
   * @returns {string}
   * @memberof APIService
   */
  private getFullUrl(url: string, apiUrl: string): string {
    return `${apiUrl}${url}`;
  }
  /**
   * GET method
   *
   * @public
   * @template T
   * @returns {Observable<T>}
   * @memberof APIService
   */
  public get<T>(
    url: string,
    params?: HttpParams,
    apiUrl = this.apiUrl
  ): Observable<T> {
    const fullUrl = this.getFullUrl(url, apiUrl);
    return this.proceedFullRequest<T>(
      this.httpClient.get<T>(
        this.getFullUrl(url, apiUrl),
        this.getOptions(params)
      ),
      fullUrl
    );
  }
  /**
   * POST method
   *
   * @public
   * @template T
   * @returns {Observable<T>}
   * @memberof APIService
   */
  public post<T, R>(
    url: string,
    requestBody: R,
    params?: HttpParams,
    apiUrl = this.apiUrl
  ): Observable<T> {
    const fullUrl = this.getFullUrl(url, apiUrl);
    return this.proceedFullRequest<T>(
      this.httpClient.post<T>(fullUrl, requestBody, this.getOptions(params)),
      fullUrl
    );
  }
  /**
   * DELETE method
   *
   * @public
   * @template T
   * @returns {Observable<T>}
   * @memberof APIService
   */
  public delete<T>(
    url: string,
    params?: HttpParams,
    apiUrl = this.apiUrl
  ): Observable<T> {
    const fullUrl = this.getFullUrl(url, apiUrl);
    return this.proceedFullRequest<T>(
      this.httpClient.delete<T>(`${fullUrl}`, this.getOptions(params)),
      fullUrl
    );
  }
  /**
   * PUT method
   *
   * @public
   * @template T
   * @returns {Observable<T>}
   * @memberof APIService
   */
  public put<T, R>(
    url: string,
    requestBody: R,
    params?: HttpParams,
    apiUrl = this.apiUrl
  ): Observable<T> {
    const fullUrl = this.getFullUrl(url, apiUrl);
    return this.proceedFullRequest<T>(
      this.httpClient.put<T>(fullUrl, requestBody, this.getOptions(params)),
      fullUrl
    );
  }
  /**
   * PATCH method
   *
   * @public
   * @template T
   * @returns {Observable<T>}
   * @memberof APIService
   */
  public patch<T, R>(
    url: string,
    requestBody: R,
    params?: HttpParams,
    apiUrl = this.apiUrl
  ): Observable<T> {
    const fullUrl = this.getFullUrl(url, apiUrl);
    return this.proceedFullRequest<T>(
      this.httpClient.patch<T>(fullUrl, requestBody, this.getOptions(params)),
      fullUrl
    );
  }
  /**
   * Proceed full request with standartized error-handling and success notifciations
   *
   * @private
   * @template T
   * @param {Observable<T>} request
   * @param {string} fullUrl
   * @returns {Observable<T>}
   * @memberof APIService
   */
  private proceedFullRequest<T>(
    request: Observable<T>,
    fullUrl?: string
  ): Observable<T> {
    // set loading state : true
    return request.pipe(
      map((res: any) => {
        // set loading state : false
        this.layoutService.showNotification(res._meta.message);
        return res;
      }),
      catchError((err: any, caught: Observable<T>) => {
        // set loading state : false
        return throwError(err);
      })
    );
  }
  /**
   * Set request options
   *
   * @private
   * @template T
   * @param {HttpParams} params
   * @returns {Observable<T>}
   * @memberof APIService
   */
  private getOptions(
    params: HttpParams
  ): {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    observe?: 'body';
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  } {
    // const token = this.accountQuery.getToken();
    return {
      headers: {
        Authorization: ` Bearer ${this.token}`,
      },
      params,
    };
  }
}
