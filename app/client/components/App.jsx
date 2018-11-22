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
      statusKnown: false,
      past: {
        workedOnItems: [
          // { title: 'Review' },
          // { title: 'HTML-version des Tagebuchs' },
        ],
        completedItems: [
          // { title: 'Masteranden geplant' }
        ],
      },
      future: {
        availability: '',
        plannedItems: [
          // { title: 'Business Case' },
          // { title: 'Mit Masteranden treffen' },
          // { title: 'Retro & Planning' },
        ],
      },
    },
    {
      username: 'ruediger',
      statusKnown: true,
      past: {
        workedOnItems: [
          {
            title: 'dummes Zeug',
            // details: 'Java für Chatpal-Solr war out of memory => JVM im Docker image wurde neu konfiguriert'
          },
          // { title: 'Schutzbedarffestellung für Vendo' },
        ],
        completedItems: [
          // { title: 'Masteranden geplant' }
        ],
        blockingItems: [
          { title: 'vom Wahnsinn' }
        ]
      },
      future: {
        availability: '',
        plannedItems: [
          // { title: 'Business Case' },
          // { title: 'Retro & Planning' },
        ],
      },
    },
    {
      username: 'ThomasR',
      statusKnown: true,
      past: {
        workedOnItems: [
          { title: 'endlosen Raum von Fragen kategorisieren' },
        ],
        completedItems: [
          { title: '2 wichtigsten KPIs bestimmen' },
          { title: 'Passende Situationen beschreiben wann du was tust' },
        ],
        // blockingItems: [
        //   { title: 'vom Wahnsinn' }
        // ]
      },
      future: {
        availability: 'normal im Home Office',
        // plannedItems: [
        //   { title: 'Das Design in eine einfache HTML-Implementierung umsetzen' },
        // ],
      },
    },
    {
      username: 'vickyokrm',
      statusKnown: true,
      past: {
        workedOnItems: [
          // { title: 'endlosen Raum von Fragen kategorisieren' },
        ],
        completedItems: [
          // { title: '2 wichtigsten KPIs bestimmen' },
        ],
        // blockingItems: [
        //   { title: 'vom Wahnsinn' }
        // ]
      },
      future: {
        availability: 'nicht da',
        // plannedItems: [
        //   { title: 'Das Design in eine einfache HTML-Implementierung umsetzen' },
        // ],
      },
    },
    {
      username: 'Joachim',
      statusKnown: false,
      past: {
        workedOnItems: [
          // { title: 'Conversational Design Diary' },
        ],
        completedItems: [
          // { title: 'Masteranden geplant' }
        ],
      },
      future: {
        availability: 'Office',
        // plannedItems: [
        //   { title: 'Sich vorher React noch einmal anschauen' },
        // ],
      },
    },
    {
      username: 'Steffi.Kunze',
      statusKnown: false,
      past: {
        workedOnItems: [
          // { title: 'Ne Menge administratives' },
        ],
        completedItems: [
          // { title: 'Masteranden geplant' }
        ],
        blockingItems: [
          // { title: 'SCSS & Webpack' }
        ]
      },
      future: {
        availability: '',
        // plannedItems: [
        //   { title: 'Nicht übertreiben' },
        // ],
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
