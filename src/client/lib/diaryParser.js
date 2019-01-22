function parseText(text) {
  const past = {
    completedItems: [],
    blockingItems: []
  };
  const future = {
    availability: [],
    plannedItems: []
  };
  let section;
  let manual;
  let error;
  text.split('\n').forEach((line) => {
    if (line.match(/An was hast Du gearbeitet/)) {
      section = past.completedItems;
    } else if (line.match(/Was möchtest Du als nächstes tun/)) {
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
      error = 'Encountered text outside of template - manual intervention necessary!';
      manual = (manual ? `${manual}\n` : '') + line;
    }
  });
  future.availability = future.availability.map(item => item.title).join('\n') || 'unbekannt';
  return {
    past,
    future,
    manual,
    error
  };
}

function stringify(member) {
  return [
    '**An was hast Du gearbeitet?**',
    (member.past.completedItems || []).map(e => `- ${e.title}`).join('\n'),
    '\n**Was möchtest Du als nächstes tun?**',
    (member.future.plannedItems || []).map(e => `- ${e.title}`).join('\n'),
    '\n**Kommst du bei etwas nicht weiter und brauchst Hilfe?**',
    (member.past.blockingItems || []).map(e => `- ${e.title}`).join('\n'),
    '\n**Wo verbringst Du Deinen nächsten Arbeitstag?**',
    member.future.availability,
  ].join('\n');
}

export default { parseText, stringify };
