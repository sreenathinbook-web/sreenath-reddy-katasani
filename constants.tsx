
import React from 'react';
import { Player, Standing } from './types';

export const LFC_RED = '#C8102E';

export const INITIAL_SQUAD: Player[] = [
  { id: 1, name: 'Alisson Becker', number: 1, position: 'Goalkeeper', nationality: 'Brazil' },
  { id: 2, name: 'Virgil van Dijk', number: 4, position: 'Defender', nationality: 'Netherlands' },
  { id: 3, name: 'Trent Alexander-Arnold', number: 66, position: 'Defender', nationality: 'England' },
  { id: 4, name: 'Ibrahima Konaté', number: 5, position: 'Defender', nationality: 'France' },
  { id: 5, name: 'Andrew Robertson', number: 26, position: 'Defender', nationality: 'Scotland' },
  { id: 6, name: 'Alexis Mac Allister', number: 10, position: 'Midfielder', nationality: 'Argentina' },
  { id: 7, name: 'Dominik Szoboszlai', number: 8, position: 'Midfielder', nationality: 'Hungary' },
  { id: 8, name: 'Mohamed Salah', number: 11, position: 'Forward', nationality: 'Egypt' },
  { id: 9, name: 'Luis Díaz', number: 7, position: 'Forward', nationality: 'Colombia' },
  { id: 10, name: 'Darwin Núñez', number: 9, position: 'Forward', nationality: 'Uruguay' },
  { id: 11, name: 'Diogo Jota', number: 20, position: 'Forward', nationality: 'Portugal' },
  { id: 12, name: 'Cody Gakpo', number: 18, position: 'Forward', nationality: 'Netherlands' },
];

export const INITIAL_STANDINGS: Standing[] = [
  { position: 1, team: 'Liverpool', played: 25, won: 18, drawn: 4, lost: 3, gf: 55, ga: 22, gd: 33, points: 58 },
  { position: 2, team: 'Manchester City', played: 25, won: 17, drawn: 5, lost: 3, gf: 58, ga: 26, gd: 32, points: 56 },
  { position: 3, team: 'Arsenal', played: 25, won: 17, drawn: 4, lost: 4, gf: 52, ga: 21, gd: 31, points: 55 },
];
