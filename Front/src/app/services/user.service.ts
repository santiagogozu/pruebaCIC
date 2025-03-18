import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  fetchAndSavePosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fetch`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
}
