import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  name = 'gov';

  private LOGIN = environment.BASE_URL + 'api/Login';
  constructor(public http: HttpClient) { }


  verifyLogin(login) {
    return this.http.post(this.LOGIN, login);
  }

}
