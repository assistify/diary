const question1 = 'An was hast Du gearbeitet';
const question2 = 'Was möchtest Du als Nächstes tun';
const question3 = 'Kommst du bei etwas nicht weiter und brauchst Hilfe';
const question4 = 'Wo verbringst Du Deinen nächsten Arbeitstag';

function parse(text) {
  const past = {
    completedItems: [],
    blockingItems: []
  };
  const future = {
    availability: [],
    plannedItems: []
  };
  let section;
  let notRecognized;
  text.split('\n').forEach((line) => {
    if (line.match(new RegExp(question1))) {
      section = past.completedItems;
    } else if (line.match(new RegExp(question2))) {
      section = future.plannedItems;
    } else if (line.match(new RegExp(question3))) {
      section = past.blockingItems;
    } else if (line.match(new RegExp(question4))) {
      section = future.availability;
    } else if (section) {
      if (line.trim()) {
        section.push({ title: line.replace(/^[\s-]*/, '') });
      }
    } else {
      notRecognized = (notRecognized ? `${notRecognized}\n` : '') + line;
    }
  });
  future.availability = future.availability.map(item => item.title).join('\n') || 'unbekannt';
  return { past, future, notRecognized };
}

function renderAsText(member) {
  let result = [
    `**${question1}?**`,
    (member.past.completedItems || []).map(e => `- ${e.title}`).join('\n'),
    `\n**${question2}?**`,
    (member.future.plannedItems || []).map(e => `- ${e.title}`).join('\n'),
    `\n**${question3}?**`,
    (member.past.blockingItems || []).map(e => `- ${e.title}`).join('\n'),
    `\n**${question4}?**`,
    member.future.availability,
  ].join('\n');
  if (member.notRecognized) {
    result += `\n\n**NOT RECOGNIZED**\n${member.notRecognized}`;
  }
  return result;
}

export default { parse, renderAsText };
