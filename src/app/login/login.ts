import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private url = 'http://localhost:8080/api/v1/login';

  loginForm!: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.http.post(this.url, { username, password }).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', (response as any).token);
        this.router.navigate(['/homepage']);
      },
      error: (error) => {
        alert('Login failed: ' + error.message);
      }
    });
  }
}
