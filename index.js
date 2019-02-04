const DiaryParser = require('./src/client/lib/diaryParser');
const statefulUrl = require('./src/client/lib/statefulUrl');

const diaryBotTemplateMessage = 'Wenn Du am PC sitzt, kannst Du diese Vorlage nutzen';

module.exports = {
  DiaryParser,
  statefulUrl,
  diaryBotTemplateMessage,
};
