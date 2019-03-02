import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.model';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable()
export class DataService {
  dataLoaded = false;
  usersBaseUrl = '/api/users';
 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http: HttpClient) { }

  getUsersData(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersBaseUrl)
    .pipe(
      map( response => {
        this.storage.set('users', response);
        this.dataLoaded = true;
        return response;
      }),
      catchError(this.handleError)
    );
  }

   setUsersData(newUser): Observable<IUser> {
     return this.http.post<IUser>(this.usersBaseUrl, this.getAllUsersFromLocalStorage(), this.httpOptions)
         .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Node.js server error');
  }

  setAllUsersToLocalStorage(users) {
    this.storage.set('users', users);
  }

  setUserToLocalStorage(sliderValue, id) {
    let users = this.getAllUsersFromLocalStorage();
    let index = this.getUserIndexFromLocalStorageById(id);
    users[index].sliderValue = sliderValue;
    this.storage.set('users', users);
  };

  getUserFromLocalStorageById(id) {
    return this.storage.get('users').find( elem => {
      return elem._id === id;
    });
  }

  getUserIndexFromLocalStorageById(id) {
    return this.storage.get('users').findIndex( (elem) => {
      return elem._id == id;
    });
  }

  getAllUsersFromLocalStorage() {
    return this.storage.get('users');
  }
}
