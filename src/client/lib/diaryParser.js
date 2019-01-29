module.exports = function DiaryParser() {
  const past = {
    completedItems: [],
    blockingItems: []
  };
  const future = {
    availability: [],
    plannedItems: []
  };

  const questions = [
    { text: 'An was hast Du gearbeitet', destination: past.completedItems },
    { text: 'Was möchtest Du als Nächstes tun', destination: future.plannedItems },
    { text: 'Kommst Du bei etwas nicht weiter und brauchst Hilfe', destination: past.blockingItems },
    { text: 'Wo verbringst Du deinen nächsten Arbeitstag', destination: future.availability }
  ];

  function parse(text) {
    let currentSection;
    let notRecognized;
    text.split('\n').forEach((line) => {
      const startOfSection = questions.some((question) => {
        const m = line.match(new RegExp(question.text, 'i'));
        if (m) {
          currentSection = question.destination;
        }
        return !!m;
      });
      if (!startOfSection) {
        if (currentSection) {
          if (line.trim()) {
            currentSection.push({ title: line.replace(/^[\s-]*/, '') });
          }
        } else {
          notRecognized = (notRecognized ? `${notRecognized}\n` : '') + line;
        }
      }
    });
    future.availability = future.availability.map(item => item.title).join('\n') || 'unbekannt';
    return { past, future, notRecognized };
  }

  function renderAsText(member) {
    let result = [
      `**${questions[0].text}?**`,
      (member.past.completedItems || []).map(e => `- ${e.title}`).join('\n'),
      `\n**${questions[1].text}?**`,
      (member.future.plannedItems || []).map(e => `- ${e.title}`).join('\n'),
      `\n**${questions[2].text}?**`,
      (member.past.blockingItems || []).map(e => `- ${e.title}`).join('\n'),
      `\n**${questions[3].text}?**`,
      member.future.availability,
    ].join('\n');
    if (member.notRecognized) {
      result += `\n&nbsp;\n**NOT RECOGNIZED**\n${member.notRecognized}`;
    }
    return result;
  }

  return { parse, renderAsText, questions: questions.map(q => q.text) };
};
