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
    if (line.match(/An was hast Du gearbeitet/)) {
      section = past.completedItems;
    } else if (line.match(/Was möchtest Du als Nächstes tun/)) {
      section = future.plannedItems;
    } else if (line.match(/Kommst du bei etwas nicht weiter und brauchst Hilfe/)) {
      section = past.blockingItems;
    } else if (line.match(/Wo verbringst Du Deinen nächsten Arbeitstag/)) {
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
    '**An was hast Du gearbeitet?**',
    (member.past.completedItems || []).map(e => `- ${e.title}`).join('\n'),
    '\n**Was möchtest Du als nächstes tun?**',
    (member.future.plannedItems || []).map(e => `- ${e.title}`).join('\n'),
    '\n**Kommst du bei etwas nicht weiter und brauchst Hilfe?**',
    (member.past.blockingItems || []).map(e => `- ${e.title}`).join('\n'),
    '\n**Wo verbringst Du Deinen nächsten Arbeitstag?**',
    member.future.availability,
  ].join('\n');
  if (member.notRecognized) {
    result += `\n\n**NOT RECOGNIZED**\n${member.notRecognized}`;
  }
  return result;
}

export default { parse, renderAsText };
