// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-user',
//   imports: [],
//   templateUrl: './add-user.component.html',
//   styleUrl: './add-user.component.scss'
// })
// export class AddUserComponent {

// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- IMPORTAR ESTO


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ FormsModule], 
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  user = {
    userId: Math.floor(Math.random() * 100),  // Genera un ID aleatorio para el usuario
    title: '',
    body: ''
  };

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(): void {
    this.http.post(`${this.apiUrl}/users`, this.user).subscribe({
      next: (data) => {
        console.log('Usuario creado:', data);
        this.router.navigate(['/']); // Navegar a la página principal después de crear el usuario
      },
      error: (err) => {
        console.error('Error al crear el usuario', err);
      },
    });
  }
}

