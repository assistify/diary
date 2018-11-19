import React from 'react';
import { localization } from '../lib/localization';
import DiaryPage from './DiaryPage';
import { TeamContext } from '../lib/teamContext';

import '../styles/index.scss';

const mockData = {
  date: new Date('2018-11-16'),
  teamName: 'Assistify Core',
  serverUrl: 'https://team.assistify-test.noncd.db.de',
  teamReport: [
    {
      username: 'Oliver',
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
        ],
      },
    },
    {
      username: 'Klon von Oliver',
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
          { title: 'Sich vorher React noch einmal anschauen' },
        ],
      },
    },
    {
      username: 'Blockierter Klon von Oliver',
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
          { title: 'Nicht übertreiben' },
        ],
      },
    },
  ]
};


export default function App() {
  localization();
  return (
    <div>
      <TeamContext.Provider value={{
        teamName: mockData.teamName,
        serverUrl: mockData.serverUrl,
      }}
      >
        <DiaryPage
          date={mockData.date}
          teamName={mockData.teamName}
          teamReport={mockData.teamReport}
        />
      </TeamContext.Provider>
    </div>
  );
}
