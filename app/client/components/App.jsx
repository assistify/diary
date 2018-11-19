import React from 'react';
import { Section } from 'react-bulma-components';
import { localization } from '../lib/localization';
import DiaryPage from './DiaryPage';

import '../styles/index.scss';

const mockData = {
  date: new Date('2018-11-16'),
  teamName: 'Assistify Core',
  teamReport: [
    {
      name: 'Oliver',
      past: {
        workedOnItems: [
          { title: 'Conversational Design Diary' },
          { title: 'Ne Menge administratives' },
        ],
        completedItems: [
          { title: 'Masteranden geplant' }
        ],
      },
      future: {
        availability: 'Office',
        plannedItems: [
          { title: 'Das Design in eine einfache HTML-Implementierung umsetzen' },
          { title: 'Sich vorher React noch einmal anschauen' },
          { title: 'Nicht übertreiben' },
        ],
      },
    },
    {
      name: 'Klon von Oliver',
      past: {
        workedOnItems: [
          { title: 'Conversational Design Diary' },
          { title: 'Ne Menge administratives' },
        ],
        completedItems: [
          { title: 'Masteranden geplant' }
        ],
      },
      future: {
        availability: 'Office',
        plannedItems: [
          { title: 'Das Design in eine einfache HTML-Implementierung umsetzen' },
          { title: 'Sich vorher React noch einmal anschauen' },
          { title: 'Nicht übertreiben' },
        ],
      },
    },
    {
      name: 'Blockierter Klon von Oliver',
      past: {
        workedOnItems: [
          { title: 'Conversational Design Diary' },
          { title: 'Ne Menge administratives' },
        ],
        completedItems: [
          { title: 'Masteranden geplant' }
        ],
        blockingItems: [
          { title: 'SCSS & Webpack' }
        ]
      },
      future: {
        availability: 'Virtuell',
        plannedItems: [
          { title: 'Das Design in eine einfache HTML-Implementierung umsetzen' },
          { title: 'Sich vorher React noch einmal anschauen' },
          { title: 'Nicht übertreiben' },
        ],
      },
    },
  ]
};


export default function App() {
  localization();

  return (
    <DiaryPage
      date={mockData.date}
      teamName={mockData.teamName}
      teamReport={mockData.teamReport}
    />
  );
}
