export const sampleData = {
  date: '2018-01-01T00:00:00.000Z',
  teamName: 'TestTeamName',
  serverUrl: 'http://testteam',
  teamReport: [
    {
      username: 'user1',
      statusKnown: true,
      past: {
        completedItems: [
          {
            title: 'title-completed',
            details: 'details-completed'
          }
        ],
        workingOnItems: [
          {
            title: 'title-workinOn',
            details: 'details-workingOn'
          }
        ],
        blockingItems: [
          {
            title: 'title-blocking',
            details: 'details-blocking'
          }
        ]
      },
      future: {
        availability: 'here',
        plannedItems: [
          {
            title: 'title-planned',
            details: 'details-planned-user1'
          }
        ]
      }
    },
    {
      username: 'user2',
      statusKnown: true,
      past: {
        completedItems: [
          {
            title: 'title-completed2',
            details: 'details-completed2'
          }
        ]
      },
      future: {
        availability: 'there',
        plannedItems: [
          {
            title: 'title-planned',
            details: 'details-planned-user2'
          }
        ]
      }
    }
  ]
};

export const sampleUrl = 'http://localhost:3000/?teamName=CoUwzgLqCGC2BycRA&date=EwBgjAHAtONgKiEAuJqQDokgFpA&serverUrl=BYFxAcC4HppBTAzmeBDAtkA&teamReport=NobwRArgzgpgTgOwIYFsZgFyVnAjGAGjCgBckToBpBAewHcFMS4IYiAHJUzcAYxpTsANjBIwAJgEkxKKJlBgSASxIjMilSIC0-QSLHjCYcaKRKhcrCbLmoOgcNESwAXwC6ROjTgBrJQgBzAHkEaRhZeXBlVXQsaO0vX38Qo2szC3U02y1Ev0CU9yIAIyEaXjyAsIiMBXjYjRitErKK1NNbTPaLJtLy-wDXNxciADMICjhY8CQAN3SkIvMVAE91AAt4dA4hJAQECSrLWs16uq1hXf3DIiyMqy67C72JLWh4fHcXYfA3xFR634AJiMpHIVFoDCYLDYYE43AwfAc+gOMiOURO6jOukcBmBNwenRs3WxyPEwM+o3GEEmPDAs3miyEK0xGxp20uKPCaIaajiJ3OO2e12MBPuRMegqurxw5KG7iAA';
