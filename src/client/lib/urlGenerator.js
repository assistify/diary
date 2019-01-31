const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = require('lz-string');

function getUrl({
  teamName,
  date,
  serverUrl,
  teamReport,
  contentEditable = false
}) {
  const encodedTeamReport = compressToEncodedURIComponent(JSON.stringify(teamReport));
  return [`${window.location.origin}${window.location.pathname || '/'}`,
    `?teamName=${compressToEncodedURIComponent(teamName)}`,
    `&date=${compressToEncodedURIComponent(date && date.toJSON ? date.toJSON() : date)}`,
    `&serverUrl=${compressToEncodedURIComponent(serverUrl)}`,
    `&teamReport=${encodedTeamReport}`,
    (contentEditable ? '&edit=true' : '')].join('');
}

function getDiaryData(queryParams) {
  const diaryData = {
    date: new Date(),
    teamName: 'Team Name',
    serverUrl: 'https://localhost:4000',
    teamReport: [],
  };

  if (queryParams.teamName) {
    diaryData.teamName = decompressFromEncodedURIComponent(queryParams.teamName);
  }
  if (queryParams.date) {
    diaryData.date = new Date(decompressFromEncodedURIComponent(queryParams.date));
  }
  if (queryParams.serverUrl) {
    diaryData.serverUrl = decompressFromEncodedURIComponent(queryParams.serverUrl);
  }
  if (queryParams.teamReport) {
    try {
      const decodedTeamReport = decompressFromEncodedURIComponent(queryParams.teamReport);
      diaryData.teamReport = JSON.parse(decodedTeamReport);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  }

  return diaryData;
}

module.exports = { getUrl, getDiaryData };
