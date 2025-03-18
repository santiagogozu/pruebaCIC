import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule





@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  users: any[] = [];
  private apiUrl = 'http://localhost:3000/api';
  newUser = { title: '', body: '' };
  showCreateUser = false;
  showUpdateUser = false;
  selectedUser = { id: null, userId: null, title: '', body: '' };


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAndSavePosts();
  }

  fetchAndSavePosts(): void {
    this.http.get(`${this.apiUrl}/fetch`).subscribe({
      next: (data) => {
        console.log('Datos obtenidos de /fetch:', data);
        // Ahora que tienes la respuesta, carga los usuarios
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error al obtener los datos de /fetch', err);
      }
    });
  }
  
  toggleCreateUser(): void {
    this.showCreateUser = !this.showCreateUser;
    this.showUpdateUser = false; 
    this.newUser = { title: '', body: '' }; 
   
  }
  startEditUser(user: any): void {
    this.showUpdateUser = true;
    this.showCreateUser = false;
    this.selectedUser = { ...user }; 
  }

  loadUsers(): void {
    this.http.get<any[]>(`${this.apiUrl}/users`).subscribe({
        next: data => {
          console.log(" data ", data)
          this.users = data;
        },
        error: err => console.error('Error al obtener los usuarios', err)
      });
    }
    
     updateUser(user: any): void {
      user.title = 'Título actualizado';
      this.http.put(`${this.apiUrl}/users/${user.id}`, user).subscribe({
        next: (data) => {
          console.log('Usuario actualizado:', data);
          this.loadUsers();
        },
        error: (err) => console.error('Error al actualizar el usuario', err),
      });
    }

    deleteUser(user: any): void {
      this.http.delete(`${this.apiUrl}/users/${user.id}`).subscribe({
        next: (data) => {
          console.log('Usuario eliminado:', data);
          this.loadUsers();
        },
        error: (err) => console.error('Error al eliminar el usuario', err),
      });
    }

    createUser(): void {
      if (!this.newUser.title || !this.newUser.body) {
        alert('Por favor, ingresa todos los datos');
        return;
      }
  
      const newUser = {
        userId: Math.floor(Math.random() * 100),
        id: Math.floor(Math.random() * 1000),
        title: this.newUser.title,
        body: this.newUser.body
      };
  
      this.http.post(`${this.apiUrl}/users`, newUser).subscribe({
        next: (data) => {
          console.log('Usuario creado:', data);
          this.newUser = { title: '', body: '' }; // Limpiar campos
          this.showCreateUser = false; // Ocultar formulario
          this.loadUsers(); // Recargar lista
        },
        error: (err) => console.error('Error al crear el usuario', err)
      });
    }

  }
