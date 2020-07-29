import { EventEmitter, Injectable } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { Observable, Subject } from 'rxjs';
import { ResponseModel } from '../../../models/response.model';
import { AdvancedUserModel, UserModel } from '../models/user.model';
import { UserSearchDto } from '../models/user-search.dto';

/**
 * Service to work with API Entities = User
 *
 * @export
 * @class UserService
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl: string;

  public $deletedUserId: EventEmitter<string> = new EventEmitter<string>();

  public selectedUser: Subject<AdvancedUserModel> = new Subject<
    AdvancedUserModel
  >();
  /**
   * Creates an instance of UserService.
   * @param {APIService} apiService
   * @memberof UserService
   */
  constructor(private apiService: APIService) {
    this.apiUrl = 'users';
  }
  /**
   * Get all users
   *
   * @public
   * @template R
   * @param {UserSearchDto} dto
   * @returns {Observable<UserModel[]>}
   * @memberof UserService
   */
  public getAllUsers(
    dto: UserSearchDto
  ): Observable<ResponseModel<UserModel[]>> {
    return this.apiService.get(
      `${this.apiUrl}?page=${dto.page}&first_name=${dto.first_name}`
    );
  }
  /**
   * Get user by ID
   *
   * @public
   * @template R
   * @param {number} id
   * @memberof UserService
   */
  public getUserById(id?: number): void {
    if (id) {
      this.apiService
        .get(`${this.apiUrl}/${id}`)
        .subscribe((data: ResponseModel<AdvancedUserModel>) =>
          this.selectedUser.next(data.result)
        );
    }
  }
  /**
   * Update User
   *
   * @public
   * @template R
   * @param {number} id
   * @param {AdvancedUserModel} dto
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public updateUser(
    id: string,
    dto: AdvancedUserModel
  ): Observable<ResponseModel<AdvancedUserModel>> {
    return this.apiService.put(`${this.apiUrl}/${id}`, dto);
  }
  /**
   * Create User
   *
   * @public
   * @template R
   * @param {AdvancedUserModel} dto
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public createUser(
    dto: AdvancedUserModel
  ): Observable<ResponseModel<AdvancedUserModel>> {
    return this.apiService.post(`${this.apiUrl}`, dto);
  }
  /**
   * Delete User
   *
   * @public
   * @template R
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public deleteUser(id?: string): Observable<ResponseModel<AdvancedUserModel>> {
    return this.apiService.delete(`${this.apiUrl}/${id}`);
  }
}
