const questionsMapping = [
  { text: 'An was hast Du gearbeitet', destination: 'completedItems' },
  { text: 'Was möchtest Du als Nächstes tun', destination: 'plannedItems' },
  { text: 'Kommst Du bei etwas nicht weiter und brauchst Hilfe', destination: 'blockingItems' },
  { text: 'Wo verbringst Du deinen nächsten Arbeitstag', destination: 'availability' }
];

export function parse(text) {
  const parsedDiary = {
    completedItems: [],
    blockingItems: [],
    availability: [],
    plannedItems: [],
    notRecognized: [],
  };

  /*
  The following logic parses a complete block of text.
  It tries to detect one of the coded expressions. If it matches one of them,
  *all* subsequent lines are considered to belong to this section, until *another one*
  of the predefined expressions is detected.
  Only if no match can be made before the text to classify was written, it is considered
  as "not recognized"
  */
  let currentSection = 'notRecognized';

  text.split('\n')
    .filter(line => line.trim()) // ignore lines containing only whitespaces
    .forEach((line) => {
      const detectedSectionMapping = questionsMapping.find(question => line.match(new RegExp(question.text, 'i')));

      if (detectedSectionMapping) {
        currentSection = detectedSectionMapping.destination;
      } else {
        parsedDiary[currentSection].push({ title: line.replace(/^[\s-]*/, '') });
      }
    });
  const diary = {
    past: {
      completedItems: parsedDiary.completedItems,
      blockingItems: parsedDiary.blockingItems
    },
    future: {
      plannedItems: parsedDiary.plannedItems,
      availability: parsedDiary.availability.map(item => item.title).join('\n') || 'unbekannt'
    },
    notRecognized: parsedDiary.notRecognized.map(item => item.title).join('\n')
  };

  return diary;
}

export function renderAsText(member) {
  let result = [
    `**${questionsMapping[0].text}?**`,
    (member.past.completedItems || []).map(e => `- ${e.title}`).join('\n'),
    `\n**${questionsMapping[1].text}?**`,
    (member.future.plannedItems || []).map(e => `- ${e.title}`).join('\n'),
    `\n**${questionsMapping[2].text}?**`,
    (member.past.blockingItems || []).map(e => `- ${e.title}`).join('\n'),
    `\n**${questionsMapping[3].text}?**`,
    member.future.availability,
  ].join('\n');
  if (member.notRecognized) {
    result += `\n&nbsp;\n**NOT RECOGNIZED**\n${member.notRecognized}`;
  }
  return result;
}

export function getQuestions() { return questionsMapping.map(q => q.text); }

// for legacy-code in operations: keep signature-comptibility
export default function DiaryParser() {
  return {
    parse,
    renderAsText,
    questions: questionsMapping
  };
}
