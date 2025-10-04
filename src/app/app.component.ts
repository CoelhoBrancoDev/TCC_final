import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ClubHistory {
  club: string;
  period: string;
  games: number;
  goals: number;
  assists: number;
}

interface Player {
  id: number;
  name: string;
  age: number;
  nationality: string;
  position: string;
  currentClub: string;
  height: number;
  weight: number;
  preferredFoot: string;
  marketValue: number;
  clubHistory: ClubHistory[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  filteredPlayers: Player[] = [];
  
  // Variáveis para o carrossel - ATUALIZADO
  currentSlide = 0;
  totalSlides = 9; // Aumentado para 9 slides
  private carouselInterval: any;

  // Dados mockados para a busca - 10 JOGADORES!
  mockPlayers: Player[] = [
    {
      id: 1,
      name: 'Neymar Jr',
      age: 31,
      nationality: 'Brasileiro',
      position: 'Atacante',
      currentClub: 'Al Hilal',
      height: 175,
      weight: 68,
      preferredFoot: 'Right',
      marketValue: 60000000,
      clubHistory: [
        { club: 'Al Hilal', period: '2023-Presente', games: 25, goals: 15, assists: 10 },
        { club: 'PSG', period: '2017-2023', games: 173, goals: 118, assists: 77 }
      ]
    },
    {
      id: 2,
      name: 'Vinicius Jr',
      age: 23,
      nationality: 'Brasileiro',
      position: 'Atacante',
      currentClub: 'Real Madrid',
      height: 176,
      weight: 73,
      preferredFoot: 'Right',
      marketValue: 150000000,
      clubHistory: [
        { club: 'Real Madrid', period: '2018-Presente', games: 235, goals: 63, assists: 64 }
      ]
    },
    {
      id: 3,
      name: 'Casemiro',
      age: 31,
      nationality: 'Brasileiro',
      position: 'Volante',
      currentClub: 'Manchester United',
      height: 185,
      weight: 84,
      preferredFoot: 'Right',
      marketValue: 40000000,
      clubHistory: [
        { club: 'Manchester United', period: '2022-Presente', games: 51, goals: 7, assists: 3 },
        { club: 'Real Madrid', period: '2013-2022', games: 336, goals: 31, assists: 29 }
      ]
    },
    {
      id: 4,
      name: 'Alisson Becker',
      age: 31,
      nationality: 'Brasileiro',
      position: 'Goleiro',
      currentClub: 'Liverpool',
      height: 193,
      weight: 91,
      preferredFoot: 'Right',
      marketValue: 35000000,
      clubHistory: [
        { club: 'Liverpool', period: '2018-Presente', games: 232, goals: 1, assists: 0 }
      ]
    },
    {
      id: 5,
      name: 'Kylian Mbappé',
      age: 25,
      nationality: 'Francês',
      position: 'Atacante',
      currentClub: 'PSG',
      height: 178,
      weight: 73,
      preferredFoot: 'Right',
      marketValue: 180000000,
      clubHistory: [
        { club: 'PSG', period: '2017-Presente', games: 290, goals: 244, assists: 105 }
      ]
    },
    {
      id: 6,
      name: 'Erling Haaland',
      age: 23,
      nationality: 'Norueguês',
      position: 'Atacante',
      currentClub: 'Manchester City',
      height: 194,
      weight: 88,
      preferredFoot: 'Left',
      marketValue: 180000000,
      clubHistory: [
        { club: 'Manchester City', period: '2022-Presente', games: 89, goals: 83, assists: 15 }
      ]
    },
    {
      id: 7,
      name: 'Jude Bellingham',
      age: 20,
      nationality: 'Inglês',
      position: 'Meio-Campo',
      currentClub: 'Real Madrid',
      height: 186,
      weight: 75,
      preferredFoot: 'Right',
      marketValue: 120000000,
      clubHistory: [
        { club: 'Real Madrid', period: '2023-Presente', games: 45, goals: 23, assists: 12 }
      ]
    },
    {
      id: 8,
      name: 'Ousmane Dembélé',
      age: 26,
      nationality: 'Francês',
      position: 'Atacante',
      currentClub: 'PSG',
      height: 178,
      weight: 67,
      preferredFoot: 'Left',
      marketValue: 80000000, // Atualizado para €80M
      clubHistory: [
        { club: 'PSG', period: '2023-Presente', games: 45, goals: 18, assists: 22 }
      ]
    },
    {
      id: 9,
      name: 'Khvicha Kvaratskhelia',
      age: 23,
      nationality: 'Georgiano',
      position: 'Atacante',
      currentClub: 'PSG',
      height: 183,
      weight: 74,
      preferredFoot: 'Right',
      marketValue: 85000000,
      clubHistory: [
        { club: 'PSG', period: '2024-Presente', games: 15, goals: 9, assists: 7 }
      ]
    },
    {
      id: 10,
      name: 'Bukayo Saka',
      age: 22,
      nationality: 'Inglês',
      position: 'Atacante',
      currentClub: 'Arsenal',
      height: 178,
      weight: 72,
      preferredFoot: 'Left',
      marketValue: 120000000,
      clubHistory: [
        { club: 'Arsenal', period: '2018-Presente', games: 225, goals: 58, assists: 55 }
      ]
    }
  ];

  // Jogadores em destaque para a lista principal
  featuredPlayers: Player[] = this.mockPlayers;

  ngOnInit(): void {
    this.startCarousel();
  }

  // NOVO: Sistema de timing variável por slide
  getSlideDuration(slideIndex: number): number {
    return slideIndex === 0 ? 15000 : 10000; // 15s para slide 0, 10s para outros
  }

  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, this.getSlideDuration(this.currentSlide));
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.restartCarouselWithNewTiming();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.restartCarouselWithNewTiming();
  }

  // NOVO: Reiniciar carrossel com novo timing
  private restartCarouselWithNewTiming(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, this.getSlideDuration(this.currentSlide));
  }

  goToSlide(slideIndex: number): void {
    this.currentSlide = slideIndex;
    this.restartCarouselWithNewTiming();
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredPlayers = [];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredPlayers = this.mockPlayers.filter(player =>
      player.name.toLowerCase().includes(term) ||
      player.currentClub.toLowerCase().includes(term) ||
      player.position.toLowerCase().includes(term) ||
      player.nationality.toLowerCase().includes(term)
    );
  }

  selectPlayer(player: Player): void {
    console.log('Jogador selecionado:', player);
    this.searchTerm = player.name;
    this.filteredPlayers = [];
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
}