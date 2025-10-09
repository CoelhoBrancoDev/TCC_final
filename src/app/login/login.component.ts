import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  // Credenciais válidas para demonstração
  private validUsers = [
    { email: 'admin', password: '123456' },
    { email: 'adrianomacielhsr@gmail.com', password: '123456' }
  ];

  constructor(private router: Router) {
    this.checkRememberedUser();
  }

  private checkRememberedUser() {
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
      const user = JSON.parse(remembered);
      this.credentials.email = user.email;
      this.credentials.password = user.password;
      this.rememberMe = true;
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    // Simular delay de rede
    setTimeout(() => {
      const isValid = this.validUsers.some(user => 
        user.email === this.credentials.email && 
        user.password === this.credentials.password
      );

      if (isValid) {
        // Salvar no localStorage se "Lembrar de mim" estiver marcado
        if (this.rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify(this.credentials));
        } else {
          localStorage.removeItem('rememberedUser');
        }

        // Salvar sessão atual
        localStorage.setItem('currentUser', JSON.stringify(this.credentials));
        
        // ✅ REDIRECIONAR PARA /HOME (CORRIGIDO)
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Email ou senha incorretos. Tente novamente.';
      }
      
      this.isLoading = false;
    }, 1000);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}