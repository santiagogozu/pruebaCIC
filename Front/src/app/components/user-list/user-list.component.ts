import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAndSavePosts();
  }

  fetchAndSavePosts(): void {
    this.http.get(`${this.apiUrl}/fetch`).subscribe({
      next: () => {
        console.log('Datos obtenidos y guardados correctamente.');
        this.loadUsers();
      },
      error: err => console.error('Error al obtener y guardar los posts', err)
    });
  }

  loadUsers(): void {
    this.http.get<any[]>(`${this.apiUrl}/users`).subscribe({
      next: data => {
        this.users = data;
      },
      error: err => console.error('Error al obtener los usuarios', err)
    });
  }
}
