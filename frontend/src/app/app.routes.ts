import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    title: 'Matdaan - Your Complete Voting Guide'
  },
  {
    path: 'voting-guide',
    loadComponent: () => import('./voting-guide/voting-guide.component').then(m => m.VotingGuideComponent),
    title: 'Voting Guide - Matdaan'
  },
  {
    path: 'election-types',
    loadComponent: () => import('./election-types/election-types.component').then(m => m.ElectionTypesComponent),
    title: 'Election Types - Matdaan'
  },
  {
    path: 'chatbot',
    loadComponent: () => import('./chatbot/chatbot.component').then(m => m.ChatbotComponent),
    title: 'Ask Questions - Matdaan'
  },
  {
    path: 'voting-journey',
    loadComponent: () => import('./voting-journey/voting-journey.component').then(m => m.VotingJourneyComponent),
    title: 'Voting Day Journey - Matdaan'
  },
  {
    path: 'first-time-voter',
    loadComponent: () => import('./first-time-voter/first-time-voter.component').then(m => m.FirstTimeVoterComponent),
    title: 'First-Time Voter Guide - Matdaan'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
