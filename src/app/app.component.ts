import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, RouterOutlet } from '@angular/router';

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
  shirtNumber: number;
  clubHistory: ClubHistory[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet]
})
export class AppComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  filteredPlayers: Player[] = [];
  
  // Variáveis para o carrossel
  currentSlide = 0;
  totalSlides = 9;
  private carouselInterval: any;

  // Dados mockados para a busca
  mockPlayers: Player[] = [
    {
      id: 1,
      name: 'Neymar Jr',
      age: 32,
      nationality: 'Brasileiro',
      position: 'Atacante',
      currentClub: 'Al Hilal',
      height: 175,
      weight: 68,
      preferredFoot: 'Direito',
      marketValue: 60000000,
      shirtNumber: 10,
      clubHistory: [
        { club: 'Santos', period: '2009-2013', games: 230, goals: 136, assists: 82 },
        { club: 'Barcelona', period: '2013-2017', games: 186, goals: 105, assists: 76 },
        { club: 'PSG', period: '2017-2023', games: 173, goals: 118, assists: 77 },
        { club: 'Al Hilal', period: '2023-Presente', games: 25, goals: 15, assists: 10 }
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
      preferredFoot: 'Direito',
      marketValue: 150000000,
      shirtNumber: 7,
      clubHistory: [
        { club: 'Flamengo', period: '2017-2018', games: 49, goals: 14, assists: 4 },
        { club: 'Real Madrid', period: '2018-Presente', games: 235, goals: 63, assists: 64 }
      ]
    },
    {
      id: 3,
      name: 'Casemiro',
      age: 32,
      nationality: 'Brasileiro',
      position: 'Volante',
      currentClub: 'Manchester United',
      height: 185,
      weight: 84,
      preferredFoot: 'Direito',
      marketValue: 40000000,
      shirtNumber: 18,
      clubHistory: [
        { club: 'São Paulo', period: '2010-2013', games: 111, goals: 11, assists: 8 },
        { club: 'Real Madrid', period: '2013-2022', games: 336, goals: 31, assists: 29 },
        { club: 'Manchester United', period: '2022-Presente', games: 51, goals: 7, assists: 3 }
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
      preferredFoot: 'Direito',
      marketValue: 35000000,
      shirtNumber: 1,
      clubHistory: [
        { club: 'Internacional', period: '2013-2016', games: 100, goals: 0, assists: 0 },
        { club: 'Roma', period: '2016-2018', games: 64, goals: 0, assists: 0 },
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
      preferredFoot: 'Direito',
      marketValue: 180000000,
      shirtNumber: 7,
      clubHistory: [
        { club: 'Monaco', period: '2015-2017', games: 60, goals: 27, assists: 16 },
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
      preferredFoot: 'Esquerdo',
      marketValue: 180000000,
      shirtNumber: 9,
      clubHistory: [
        { club: 'Molde', period: '2017-2019', games: 50, goals: 20, assists: 6 },
        { club: 'Red Bull Salzburg', period: '2019-2020', games: 27, goals: 29, assists: 7 },
        { club: 'Borussia Dortmund', period: '2020-2022', games: 89, goals: 86, assists: 23 },
        { club: 'Manchester City', period: '2022-Presente', games: 89, goals: 83, assists: 15 }
      ]
    }
  ];

  constructor(private router: Router) {}

  // MÉTODO: Verificar se está na página home
  isHomePage(): boolean {
    return this.router.url === '/';
  }

  ngOnInit(): void {
    this.startCarousel();
  }

  // MÉTODO: Buscar jogador por nome para o carrossel
  getPlayerByName(playerName: string): Player {
    const player = this.mockPlayers.find(p => p.name === playerName);
    if (!player) {
      return this.mockPlayers[0];
    }
    return player;
  }

  // MÉTODO: Redirecionamento inteligente do carrossel
  selectPlayerFromCarousel(player: Player): void {
    this.router.navigate(['/catalogo'], { 
      state: { selectedPlayer: player } 
    });
  }

  // Sistema de timing variável por slide
  getSlideDuration(slideIndex: number): number {
    return slideIndex === 0 ? 15000 : 10000;
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

  // Reiniciar carrossel com novo timing
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
    this.searchTerm = player.name;
    this.filteredPlayers = [];
    this.router.navigate(['/catalogo'], { 
      state: { selectedPlayer: player } 
    });
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
}