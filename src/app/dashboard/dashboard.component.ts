import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  clubHistory: any[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  // Dados dos jogadores (você vai substituir pelos seus jogadores)
  players: Player[] = [];
  
  // Métricas principais
  totalPlayers: number = 0;
  totalValue: number = 0;
  brazilianPercentage: number = 0;
  youngTalents: number = 0;

  // Top performers
  topScorers: Player[] = [];
  topAssists: Player[] = [];
  mostValuable: Player[] = [];

  // Análises
  positionDistribution: any[] = [];
  nationalityDistribution: any[] = [];
  ageDistribution: any[] = [];

  // Jogadores brasileiros
  brazilianPlayers: Player[] = [];
  topBrazilian: Player[] = [];

  ngOnInit() {
    this.loadPlayers();
    this.calculateMetrics();
    this.calculateTopPerformers();
    this.calculateDistributions();
    this.analyzeBrazilians();
  }

  private loadPlayers() {
    // COLE AQUI SEU ARRAY COMPLETO DE JOGADORES DO catalogo.component.ts
    this.players = [

        // SEUS JOGADORES COMPLETOS AQUI
{
  id: 100,
  name: 'Renato Kayzer',
  age: 27,
  nationality: 'Brasileiro',
  position: 'Atacante',
  currentClub: 'Vitória',
  height: 186,
  weight: 80,
  preferredFoot: 'Direito',
  marketValue: 3000000,
  shirtNumber: 9,
  clubHistory: [
    { club: 'Fluminense', period: '2017-2019', games: 25, goals: 4, assists: 3 },
    { club: 'Kashiwa Reysol', period: '2019-2021', games: 65, goals: 25, assists: 10 },
    { club: 'Fortaleza', period: '2022-2024', games: 65, goals: 30, assists: 20 },
    { club: 'Vitória', period: '2025-Presente', games: 90, goals: 40, assists: 12 }
  ]
},
{
  id: 101,
  name: 'Matheusinho',
  age: 24,
  nationality: 'Brasileiro',
  position: 'Meio-Campista',
  currentClub: 'Vitória',
  height: 175,
  weight: 70,
  preferredFoot: 'Esquerdo',
  marketValue: 4000000,
  shirtNumber: 20,
  clubHistory: [
    { club: 'Londrina', period: '2019-2021', games: 75, goals: 8, assists: 15 },
    { club: 'Vitória', period: '2022-Presente', games: 90, goals: 10, assists: 25 }
  ]
},
{
  id: 102,
  name: 'Gabriel Baralhas',
  age: 26,
  nationality: 'Brasileiro',
  position: 'Meio-Campista',
  currentClub: 'Vitoria',
  height: 178,
  weight: 72,
  preferredFoot: 'Direito',
  marketValue: 2500000,
  shirtNumber: 8,
  clubHistory: [
    { club: 'São Paulo', period: '2018-2021', games: 45, goals: 3, assists: 8 },
    { club: 'Coritiba', period: '2022-Presente', games: 85, goals: 7, assists: 18 }
  ]
},
{
  id: 103,
  name: 'Everton Ribeiro',
  age: 34,
  nationality: 'Brasileiro',
  position: 'Meio-Campista',
  currentClub: 'Bahia',
  height: 174,
  weight: 69,
  preferredFoot: 'Esquerdo',
  marketValue: 5000000,
  shirtNumber: 7,
  clubHistory: [
    { club: 'Coritiba', period: '2011-2013', games: 85, goals: 15, assists: 20 },
    { club: 'Cruzeiro', period: '2013-2017', games: 150, goals: 25, assists: 40 },
    { club: 'Al Ahli', period: '2017-2018', games: 25, goals: 5, assists: 8 },
    { club: 'Flamengo', period: '2018-Presente', games: 280, goals: 45, assists: 75 },
    { club: 'Bahia', period: '2025-Presente', games: 280, goals: 60, assists: 30 }
  ]
},
{
  id: 104,
  name: 'Élber',
  age: 30,
  nationality: 'Brasileiro',
  position: 'Atacante',
  currentClub: 'Bahia',
  height: 178,
  weight: 74,
  preferredFoot: 'Direito',
  marketValue: 3500000,
  shirtNumber: 19,
  clubHistory: [
    { club: 'Sport', period: '2015-2018', games: 120, goals: 35, assists: 20 },
    { club: 'Ludogorets', period: '2018-2021', games: 95, goals: 30, assists: 15 },
    { club: 'Bahia', period: '2022-Presente', games: 75, goals: 22, assists: 12 }
  ]
},
{
  id: 105,
  name: 'Pedro',
  age: 26,
  nationality: 'Brasileiro',
  position: 'Centro-Avante',
  currentClub: 'Flamengo',
  height: 185,
  weight: 82,
  preferredFoot: 'Direito',
  marketValue: 20000000,
  shirtNumber: 9,
  clubHistory: [
    { club: 'Fluminense', period: '2017-2020', games: 120, goals: 45, assists: 15 },
    { club: 'Flamengo', period: '2025-Presente', games: 180, goals: 85, assists: 25 }
  ]
},
{
  id: 106,
  name: 'Giorgian de Arrascaeta',
  age: 29,
  nationality: 'Uruguaio',
  position: 'Meio-Campista',
  currentClub: 'Flamengo',
  height: 172,
  weight: 68,
  preferredFoot: 'Direito',
  marketValue: 18000000,
  shirtNumber: 14,
  clubHistory: [
    { club: 'Defensor', period: '2013-2015', games: 55, goals: 12, assists: 15 },
    { club: 'Cruzeiro', period: '2015-2019', games: 150, goals: 35, assists: 40 },
    { club: 'Flamengo', period: '2025-Presente', games: 220, goals: 55, assists: 65 }
  ]
},
{
  id: 107,
  name: 'Vitor Roque',
  age: 19,
  nationality: 'Brasileiro',
  position: 'Atacante',
  currentClub: 'Palmeiras',
  height: 174,
  weight: 70,
  preferredFoot: 'Direito',
  marketValue: 40000000,
  shirtNumber: 19,
  clubHistory: [
    { club: 'Cruzeiro', period: '2021-2022', games: 25, goals: 8, assists: 5 },
    { club: 'Athletico Paranaense', period: '2022-2023', games: 65, goals: 28, assists: 10 },
        { club: 'Barcelona', period: '2024-Presente', games: 15, goals: 2, assists: 3 },
    { club: 'Palmeiras', period: '2024-Presente', games: 30, goals: 2, assists: 10 }
  ]
},
{
  id: 108,
  name: 'Flaco López',
  age: 28,
  nationality: 'Argentino',
  position: 'Centro-Avante',
  currentClub: 'Palmeiras',
  height: 188,
  weight: 82,
  preferredFoot: 'Esquerdo',
  marketValue: 5000000,
  shirtNumber: 19,
  clubHistory: [
    { club: 'Talleres', period: '2017-2019', games: 45, goals: 15, assists: 8 },
    { club: 'Lanús', period: '2020-2022', games: 85, goals: 30, assists: 12 },
    { club: 'Racing Club', period: '2023-Presente', games: 40, goals: 12, assists: 6 },
    { club: 'Palmeiras', period: '2025-Presente', games: 50, goals: 20, assists: 10 }
  ]
},
{
  id: 109,
  name: 'Kaio Jorge',
  age: 22,
  nationality: 'Brasileiro',
  position: 'Atacante',
  currentClub: 'Cruzeiro',
  height: 180,
  weight: 76,
  preferredFoot: 'Direito',
  marketValue: 8000000,
  shirtNumber: 19,
  clubHistory: [
    { club: 'Santos', period: '2019-2021', games: 80, goals: 20, assists: 12 },
    { club: 'Juventus', period: '2021-2023', games: 25, goals: 5, assists: 3 },
    { club: 'Porto', period: '2024-Presente', games: 10, goals: 2, assists: 1 },
    { club: 'Cruzeiro', period: '2025-Presente', games: 50, goals: 16, assists: 10}
  ]
},
{
  id: 110,
  name: 'Gabriel Barbosa',
  age: 27,
  nationality: 'Brasileiro',
  position: 'Atacante',
  currentClub: 'Flamengo',
  height: 178,
  weight: 76,
  preferredFoot: 'Direito',
  marketValue: 22000000,
  shirtNumber: 10,
  clubHistory: [
    { club: 'Santos', period: '2013-2016', games: 150, goals: 56, assists: 20 },
    { club: 'Inter de Milão', period: '2016-2017', games: 15, goals: 2, assists: 1 },
    { club: 'Benfica', period: '2017-2018', games: 5, goals: 1, assists: 0 },
    { club: 'Flamengo', period: '2019-Presente', games: 220, goals: 130, assists: 35 },
    { club: 'Cruzeiro', period: '2025-Presente', games: 30, goals: 20, assists: 10 }

  ]
},
{
  id: 111,
  name: 'Estevão ',
  age: 17,
  nationality: 'Brasileiro',
  position: 'Atacante',
  currentClub: 'Chelsea',
  height: 176,
  weight: 68,
  preferredFoot: 'Esquerdo',
  marketValue: 45000000,
  shirtNumber: 41,
  clubHistory: [
    { club: 'Palmeiras', period: '2023-Presente', games: 25, goals: 6, assists: 8 },
        { club: 'Chelsea', period: '2025-Presente', games: 10, goals: 1, assists: 2 }

  ]
},
{
  id: 112,
  name: 'Raphinha',
  age: 27,
  nationality: 'Brasileiro',
  position: 'Atacante',
  currentClub: 'Barcelona',
  height: 176,
  weight: 68,
  preferredFoot: 'Esquerdo',
  marketValue: 50000000,
  shirtNumber: 11,
  clubHistory: [
    { club: 'Vitória Guimarães', period: '2016-2018', games: 45, goals: 8, assists: 12 },
    { club: 'Sporting', period: '2018-2019', games: 35, goals: 7, assists: 8 },
    { club: 'Rennes', period: '2019-2020', games: 40, goals: 8, assists: 10 },
    { club: 'Leeds United', period: '2020-2022', games: 65, goals: 17, assists: 12 },
    { club: 'Barcelona', period: '2025-Presente', games: 80, goals: 15, assists: 20 }
  ]
},
{
  id: 113,
  name: 'Sávio',
  age: 20,
  nationality: 'Brasileiro',
  position: 'Atacante',
  currentClub: 'Manchester City',
  height: 176,
  weight: 70,
  preferredFoot: 'Direito',
  marketValue: 30000000,
  shirtNumber: 16,
  clubHistory: [
    { club: 'Atlético Mineiro', period: '2021-2022', games: 35, goals: 4, assists: 8 },
    { club: 'PSV Eindhoven', period: '2022-2023', games: 15, goals: 2, assists: 4 },
    { club: 'Girona', period: '2023-Presente', games: 45, goals: 10, assists: 12 },
        { club: 'Manchester City', period: '2025-Presente', games: 40, goals: 15, assists: 15 }

  ]
},
{
  id: 114,
  name: 'Rodrygo',
  age: 23,
  nationality: 'Brasileiro',
  position: 'Atacante',
  currentClub: 'Real Madrid',
  height: 174,
  weight: 64,
  preferredFoot: 'Direito',
  marketValue: 100000000,
  shirtNumber: 11,
  clubHistory: [
    { club: 'Santos', period: '2017-2019', games: 80, goals: 17, assists: 12 },
    { club: 'Real Madrid', period: '2025-Presente', games: 180, goals: 45, assists: 40 }
  ]
},

    {
      id: 1,
      name: 'Neymar Jr',
      age: 32,
      nationality: 'Brasileiro',
      position: 'Atacante',
      currentClub: 'Santos',
      height: 175,
      weight: 68,
      preferredFoot: 'Direito',
      marketValue: 60000000,
      shirtNumber: 10,
      clubHistory: [
        { club: 'Santos', period: '2009-2013', games: 230, goals: 136, assists: 82 },
        { club: 'Barcelona', period: '2013-2017', games: 186, goals: 105, assists: 76 },
        { club: 'PSG', period: '2017-2023', games: 173, goals: 118, assists: 77 },
        { club: 'Al Hilal', period: '2023-Presente', games: 25, goals: 15, assists: 10 },
        { club: 'Santos', period: '2025-Presente', games: 15, goals: 5, assists: 1 }

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
        { club: 'Real Madrid', period: '2025-Presente', games: 235, goals: 63, assists: 64 }
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
        { club: 'Manchester United', period: '2025-Presente', games: 51, goals: 7, assists: 3 }
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
        { club: 'Liverpool', period: '2025-Presente', games: 232, goals: 1, assists: 0 }
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
        { club: 'Manchester City', period: '2025-Presente', games: 260, goals: 0, assists: 2 }
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
        { club: 'PSG', period: '2025-Presente', games: 420, goals: 37, assists: 15 }
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
        { club: 'Newcastle', period: '2025-Presente', games: 85, goals: 12, assists: 12 }
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
        { club: 'Arsenal', period: '2025-Presente', games: 75, goals: 25, assists: 15 }
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

    // ADICIONE ESTES 3 JOGADORES NO ARRAY players[] (pode ser depois dos brasileiros)

{
  id: 115,
  name: 'Cristiano Ronaldo',
  age: 39,
  nationality: 'Português',
  position: 'Atacante',
  currentClub: 'Al Nassr',
  height: 187,
  weight: 83,
  preferredFoot: 'Direito',
  marketValue: 15000000,
  shirtNumber: 7,
  clubHistory: [
    { club: 'Sporting CP', period: '2002-2003', games: 31, goals: 5, assists: 6 },
    { club: 'Manchester United', period: '2003-2009', games: 292, goals: 118, assists: 69 },
    { club: 'Real Madrid', period: '2009-2018', games: 438, goals: 450, assists: 131 },
    { club: 'Juventus', period: '2018-2021', games: 134, goals: 101, assists: 22 },
    { club: 'Manchester United', period: '2021-2022', games: 54, goals: 27, assists: 5 },
    { club: 'Al Nassr', period: '2023-Presente', games: 60, goals: 52, assists: 14 }
  ]
},
{
  id: 116,
  name: 'Lionel Messi',
  age: 36,
  nationality: 'Argentino',
  position: 'Atacante',
  currentClub: 'Inter Miami',
  height: 170,
  weight: 72,
  preferredFoot: 'Esquerdo',
  marketValue: 35000000,
  shirtNumber: 10,
  clubHistory: [
    { club: 'Barcelona', period: '2004-2021', games: 778, goals: 672, assists: 269 },
    { club: 'PSG', period: '2021-2023', games: 75, goals: 32, assists: 34 },
    { club: 'Inter Miami', period: '2023-Presente', games: 35, goals: 22, assists: 15 }
  ]
},
{
  id: 117,
  name: 'Julián Álvarez',
  age: 24,
  nationality: 'Argentino',
  position: 'Atacante',
  currentClub: 'Atletico de Madrid',
  height: 170,
  weight: 71,
  preferredFoot: 'Direito',
  marketValue: 10000000,
  shirtNumber: 19,
  clubHistory: [
    { club: 'River Plate', period: '2018-2022', games: 120, goals: 54, assists: 31 },
    { club: 'Manchester City', period: '2022-Presente', games: 95, goals: 36, assists: 18 },
    { club: 'Atletico de Madrid', period: '2025-Presente', games: 95, goals: 36, assists: 18 }

  ]
},

    ];
  }

  private calculateMetrics() {
    this.totalPlayers = this.players.length;
    
    this.totalValue = this.players.reduce((sum, player) => sum + player.marketValue, 0);
    
    const brazilians = this.players.filter(p => 
      p.nationality.toLowerCase().includes('brasil')
    ).length;
    this.brazilianPercentage = Math.round((brazilians / this.totalPlayers) * 100);
    
    this.youngTalents = this.players.filter(p => p.age < 23).length;
  }

  private calculateTopPerformers() {
    // Top artilheiros (baseado no histórico)
    this.topScorers = [...this.players]
      .sort((a, b) => this.getTotalGoals(b) - this.getTotalGoals(a))
      .slice(0, 5);

    // Top assistentes
    this.topAssists = [...this.players]
      .sort((a, b) => this.getTotalAssists(b) - this.getTotalAssists(a))
      .slice(0, 5);

    // Mais valiosos
    this.mostValuable = [...this.players]
      .sort((a, b) => b.marketValue - a.marketValue)
      .slice(0, 5);
  }

  private calculateDistributions() {
    // Distribuição por posição
    const positions = this.players.reduce((acc, player) => {
      acc[player.position] = (acc[player.position] || 0) + 1;
      return acc;
    }, {} as any);

    this.positionDistribution = Object.entries(positions).map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count as number / this.totalPlayers) * 100)
    }));

    // Distribuição por nacionalidade
    const nationalities = this.players.reduce((acc, player) => {
      acc[player.nationality] = (acc[player.nationality] || 0) + 1;
      return acc;
    }, {} as any);

    this.nationalityDistribution = Object.entries(nationalities).map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count as number / this.totalPlayers) * 100)
    }));
  }

  private analyzeBrazilians() {
    this.brazilianPlayers = this.players.filter(p => 
      p.nationality.toLowerCase().includes('brasil')
    );
    
    this.topBrazilian = [...this.brazilianPlayers]
      .sort((a, b) => b.marketValue - a.marketValue)
      .slice(0, 5);
  }

  // MÉTODOS PÚBLICOS (CORRIGIDOS)
  getTotalGoals(player: Player): number {
    return player.clubHistory.reduce((total, history) => total + history.goals, 0);
  }

  getTotalAssists(player: Player): number {
    return player.clubHistory.reduce((total, history) => total + history.assists, 0);
  }

  formatMarketValue(value: number): string {
    if (value >= 100000000) return `€${(value / 1000000).toFixed(0)}M`;
    return `€${(value / 1000000).toFixed(1)}M`;
  }

  getPlayerAvatar(player: Player): string {
    const position = player.position.toLowerCase();
    if (position.includes('goleiro')) return '🧤';
    if (position.includes('zagueiro') || position.includes('lateral')) return '🛡️';
    if (position.includes('meio') || position.includes('volante')) return '⚙️';
    return '⚡';
  }

  // NOVOS MÉTODOS PARA CORRIGIR OS ERROS
  getBrazilianTotalValue(): number {
    return this.brazilianPlayers.reduce((sum, p) => sum + p.marketValue, 0);
  }

  getBrazilianAverageAge(): number {
    if (this.brazilianPlayers.length === 0) return 0;
    return Math.round(this.brazilianPlayers.reduce((sum, p) => sum + p.age, 0) / this.brazilianPlayers.length);
  }
}