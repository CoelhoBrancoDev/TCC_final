import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

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
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  searchTerm: string = '';
  searchResults: Player[] = [];
  filteredPlayers: Player[] = [];
  selectedPlayer: Player | null = null;
  activeTab: string = 'detalhe';
  
  // Filtros
  selectedPosition: string = '';
  selectedClub: string = '';
  selectedNationality: string = '';
  
  // Dados dos 50 jogadores - BRASILEIROS PRIMEIRO
  players: Player[] = [
    // JOGADORES BRASILEIROS (PRIMEIROS)
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
      id: 11,
      name: 'Ederson',
      age: 30,
      nationality: 'Brasileiro',
      position: 'Goleiro',
      currentClub: 'Manchester City',
      height: 188,
      weight: 86,
      preferredFoot: 'Esquerdo',
      marketValue: 45000000,
      shirtNumber: 31,
      clubHistory: [
        { club: 'São Paulo', period: '2011-2015', games: 0, goals: 0, assists: 0 },
        { club: 'Benfica', period: '2015-2017', games: 37, goals: 0, assists: 0 },
        { club: 'Manchester City', period: '2017-Presente', games: 260, goals: 0, assists: 2 }
      ]
    },
    {
      id: 17,
      name: 'Marquinhos',
      age: 29,
      nationality: 'Brasileiro',
      position: 'Zagueiro',
      currentClub: 'PSG',
      height: 183,
      weight: 75,
      preferredFoot: 'Direito',
      marketValue: 45000000,
      shirtNumber: 5,
      clubHistory: [
        { club: 'Corinthians', period: '2012-2013', games: 30, goals: 1, assists: 0 },
        { club: 'Roma', period: '2012-2013', games: 30, goals: 1, assists: 0 },
        { club: 'PSG', period: '2013-Presente', games: 420, goals: 37, assists: 15 }
      ]
    },
    {
      id: 24,
      name: 'Bruno Guimarães',
      age: 26,
      nationality: 'Brasileiro',
      position: 'Meio-Campo',
      currentClub: 'Newcastle',
      height: 182,
      weight: 74,
      preferredFoot: 'Direito',
      marketValue: 70000000,
      shirtNumber: 39,
      clubHistory: [
        { club: 'Audax', period: '2015-2017', games: 8, goals: 0, assists: 0 },
        { club: 'Athletico Paranaense', period: '2017-2020', games: 86, goals: 5, assists: 8 },
        { club: 'Lyon', period: '2020-2022', games: 71, goals: 3, assists: 8 },
        { club: 'Newcastle', period: '2022-Presente', games: 85, goals: 12, assists: 12 }
      ]
    },
    {
      id: 28,
      name: 'Gabriel Jesus',
      age: 27,
      nationality: 'Brasileiro',
      position: 'Atacante',
      currentClub: 'Arsenal',
      height: 175,
      weight: 73,
      preferredFoot: 'Direito',
      marketValue: 55000000,
      shirtNumber: 9,
      clubHistory: [
        { club: 'Palmeiras', period: '2015-2017', games: 83, goals: 28, assists: 12 },
        { club: 'Manchester City', period: '2017-2022', games: 159, goals: 58, assists: 29 },
        { club: 'Arsenal', period: '2022-Presente', games: 75, goals: 25, assists: 15 }
      ]
    },
    
    // JOGADORES ESTRANGEIROS (DEPOIS)
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
    },
    {
      id: 7,
      name: 'Jude Bellingham',
      age: 21,
      nationality: 'Inglês',
      position: 'Meio-Campo',
      currentClub: 'Real Madrid',
      height: 186,
      weight: 75,
      preferredFoot: 'Direito',
      marketValue: 120000000,
      shirtNumber: 5,
      clubHistory: [
        { club: 'Birmingham City', period: '2019-2020', games: 44, goals: 4, assists: 3 },
        { club: 'Borussia Dortmund', period: '2020-2023', games: 132, goals: 24, assists: 25 },
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
      preferredFoot: 'Esquerdo',
      marketValue: 80000000,
      shirtNumber: 10,
      clubHistory: [
        { club: 'Rennes', period: '2015-2016', games: 29, goals: 12, assists: 5 },
        { club: 'Borussia Dortmund', period: '2016-2017', games: 50, goals: 10, assists: 21 },
        { club: 'Barcelona', period: '2017-2023', games: 185, goals: 40, assists: 43 },
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
      preferredFoot: 'Direito',
      marketValue: 85000000,
      shirtNumber: 77,
      clubHistory: [
        { club: 'Dinamo Tbilisi', period: '2017-2018', games: 22, goals: 3, assists: 2 },
        { club: 'Rubin Kazan', period: '2019-2022', games: 73, goals: 9, assists: 18 },
        { club: 'Napoli', period: '2022-2024', games: 75, goals: 25, assists: 25 },
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
      preferredFoot: 'Esquerdo',
      marketValue: 120000000,
      shirtNumber: 7,
      clubHistory: [
        { club: 'Arsenal', period: '2018-Presente', games: 225, goals: 58, assists: 55 }
      ]
    },
    // ... (outros jogadores)
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Ordena os jogadores - brasileiros primeiro
    this.players = this.sortPlayersByNationality(this.players);
    this.filteredPlayers = this.players;
    this.checkForSelectedPlayer();
  }

  // ORDENA jogadores - brasileiros primeiro
  private sortPlayersByNationality(players: Player[]): Player[] {
    return players.sort((a, b) => {
      if (a.nationality.toLowerCase().includes('brasil') && !b.nationality.toLowerCase().includes('brasil')) {
        return -1;
      }
      if (!a.nationality.toLowerCase().includes('brasil') && b.nationality.toLowerCase().includes('brasil')) {
        return 1;
      }
      return 0;
    });
  }

  // Verificar se veio com jogador selecionado da home
  private checkForSelectedPlayer(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['selectedPlayer']) {
      const player = navigation.extras.state['selectedPlayer'];
      setTimeout(() => {
        this.openPlayerModal(player);
      }, 100);
    }
  }

  // Sistema de avatares
  getPlayerAvatar(player: Player): string {
    const position = player.position.toLowerCase();
    if (position.includes('goleiro')) return '🧤';
    if (position.includes('zagueiro') || position.includes('lateral')) return '🛡️';
    if (position.includes('meio') || position.includes('volante')) return '⚙️';
    return '⚡';
  }

  getAvatarColor(player: Player): string {
    const position = player.position.toLowerCase();
    if (position.includes('goleiro')) return 'goalkeeper';
    if (position.includes('zagueiro') || position.includes('lateral')) return 'defender';
    if (position.includes('meio') || position.includes('volante')) return 'midfielder';
    return 'attacker';
  }

  getPlayerInitials(player: Player): string {
    return player.name.split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  // Busca com autocomplete
  onSearch() {
    if (!this.searchTerm) {
      this.searchResults = [];
      this.applyFilters();
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.searchResults = this.players.filter(player =>
      player.name.toLowerCase().includes(term) ||
      player.currentClub.toLowerCase().includes(term) ||
      player.position.toLowerCase().includes(term) ||
      player.nationality.toLowerCase().includes(term)
    ).slice(0, 5);

    this.applyFilters();
  }

  // Selecionar jogador da busca
  selectPlayerFromSearch(player: Player): void {
    this.searchTerm = '';
    this.searchResults = [];
    this.openPlayerModal(player);
  }

  applyFilters() {
    let filtered = this.players;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(term) ||
        player.currentClub.toLowerCase().includes(term) ||
        player.position.toLowerCase().includes(term) ||
        player.nationality.toLowerCase().includes(term)
      );
    }

    if (this.selectedPosition) {
      filtered = filtered.filter(player => 
        player.position.toLowerCase().includes(this.selectedPosition.toLowerCase())
      );
    }

    if (this.selectedClub) {
      filtered = filtered.filter(player => 
        player.currentClub.toLowerCase().includes(this.selectedClub.toLowerCase())
      );
    }

    if (this.selectedNationality) {
      filtered = filtered.filter(player => 
        player.nationality.toLowerCase().includes(this.selectedNationality.toLowerCase())
      );
    }

    this.filteredPlayers = filtered;
  }

  clearFilters() {
    this.searchTerm = '';
    this.searchResults = [];
    this.selectedPosition = '';
    this.selectedClub = '';
    this.selectedNationality = '';
    this.filteredPlayers = this.players;
  }

  // Modal functions
  openPlayerModal(player: Player) {
    this.selectedPlayer = player;
    this.activeTab = 'detalhe';
  }

  closePlayerModal() {
    this.selectedPlayer = null;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Utils
  getUniqueClubs(): string[] {
    return [...new Set(this.players.map(player => player.currentClub))].sort();
  }

  getUniquePositions(): string[] {
    return [...new Set(this.players.map(player => player.position))].sort();
  }

  getUniqueNationalities(): string[] {
    return [...new Set(this.players.map(player => player.nationality))].sort();
  }

  formatMarketValue(value: number): string {
    if (value >= 100000000) return `€${(value / 1000000).toFixed(0)}M`;
    return `€${(value / 1000000).toFixed(1)}M`;
  }

  // Estatísticas
  getTotalGames(player: Player): number {
    return player.clubHistory.reduce((total, history) => total + history.games, 0);
  }

  getTotalGoals(player: Player): number {
    return player.clubHistory.reduce((total, history) => total + history.goals, 0);
  }

  getTotalAssists(player: Player): number {
    return player.clubHistory.reduce((total, history) => total + history.assists, 0);
  }

  getAverageGames(player: Player): number {
    const totalGames = this.getTotalGames(player);
    const years = this.getCareerYears(player);
    return years > 0 ? Math.round(totalGames / years) : 0;
  }

  getAverageGoals(player: Player): number {
    const totalGoals = this.getTotalGoals(player);
    const years = this.getCareerYears(player);
    return years > 0 ? Math.round(totalGoals / years) : 0;
  }

  getCareerYears(player: Player): number {
    const firstYear = parseInt(player.clubHistory[0]?.period.split('-')[0]) || new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - firstYear + 1;
  }
}