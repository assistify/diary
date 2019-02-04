const { compressToEncodedURIComponent: compress, decompressFromEncodedURIComponent: decompress } = require('lz-string');

function encode({
  teamName,
  date,
  serverUrl,
  teamReport,
  diaryChannel,
}) {
  const encodedTeamReport = compress(JSON.stringify(teamReport));
  return [`${window.location.origin}${window.location.pathname || '/'}`,
    `?teamName=${compress(teamName)}`,
    `&date=${compress(date && date.toJSON ? date.toJSON() : date)}`,
    `&serverUrl=${compress(serverUrl)}`,
    `&teamReport=${encodedTeamReport}`,
    `&diaryChannel=${compress(diaryChannel)}`
  ].join('');
}

function decode(queryParams) {
  const diaryData = {
    date: new Date(),
    teamName: 'Team Name',
    serverUrl: 'https://localhost:4000',
    teamReport: [],
    diaryChannel: 'tagebuch'
  };

  if (queryParams.teamName) {
    diaryData.teamName = decompress(queryParams.teamName);
  }
  if (queryParams.date) {
    diaryData.date = new Date(decompress(queryParams.date));
  }
  if (queryParams.serverUrl) {
    diaryData.serverUrl = decompress(queryParams.serverUrl);
  }
  if (queryParams.teamReport) {
    try {
      const decodedTeamReport = decompress(queryParams.teamReport);
      diaryData.teamReport = JSON.parse(decodedTeamReport);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  }
  if (queryParams.diaryChannel) {
    diaryData.diaryChannel = decompress(queryParams.diaryChannel);
  }

  return diaryData;
}

module.exports = { encode, decode };
