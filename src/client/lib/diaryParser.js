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
  text.split('\n').forEach((line) => {
    if (line.match(/An was hast Du gearbeitet/)) {
      section = past.completedItems;
    } else if (line.match(/Was möchtest Du als nächstes tun/)) {
      section = future.plannedItems;
    } else if (line.match(/Wobei benötigst Du Hilfe/)) {
      section = past.blockingItems;
    } else if (line.match(/Wo verbringst Du Deinen nächsten Arbeitstag/)) {
      section = future.availability;
    } else if (section && line.trim()) {
      section.push({ title: line.replace(/^[\s-]*/, '') });
    }
  });
  future.availability = future.availability.map(item => item.title).join('\n') || 'unbekannt';
  return { past, future };
}

function stringify(member) {
  return [
    '**An was hast Du gearbeitet?**',
    (member.past.completedItems || []).map(e => `- ${e.title}`).join('\n'),
    '\n**Was möchtest Du als nächstes tun?**',
    (member.future.plannedItems || []).map(e => `- ${e.title}`).join('\n'),
    '\n**Wobei benötigst Du Hilfe?**',
    (member.past.blockingItems || []).map(e => `- ${e.title}`).join('\n'),
    '\n**Wo verbringst Du Deinen nächsten Arbeitstag?**',
    member.future.availability,
  ].join('\n');
}

export default { parseText, stringify };
