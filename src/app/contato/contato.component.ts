// contato.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface ContatoForm {
  nome: string;
  email: string; 
  telefone: string;
  assunto: string;
  mensagem: string;
}

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
  contatoForm: ContatoForm = {
    nome: '',
    email: '',
    telefone: '', 
    assunto: '',
    mensagem: ''
  };

  assuntos: string[] = ['Dúvida', 'Sugestão', 'Parceria', 'Outro'];

  enviarFormulario(): void {
    // Por enquanto só mostra os dados no console
    // Futuramente pode integrar com backend/email
    console.log('Formulário enviado:', this.contatoForm);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Limpar formulário
    this.contatoForm = {
      nome: '',
      email: '',
      telefone: '',
      assunto: '', 
      mensagem: ''
    };
  }
}