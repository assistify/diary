import parser from './diaryParser';

const simpleText = `**An was hast Du gearbeitet?**
- task 1

**Was möchtest Du als Nächstes tun?**
- task 3

**Kommst du bei etwas nicht weiter und brauchst Hilfe?**
- task 2

**Wo verbringst Du Deinen nächsten Arbeitstag?**
Office`;

const simpleStructure = {
  past: {
    completedItems: [{ title: 'task 1' }],
    blockingItems: [{ title: 'task 2' }]
  },
  future: {
    plannedItems: [{ title: 'task 3' }],
    availability: 'Office'
  }
};

describe('Parser', () => {
  it('should correctly serialize the data structure', () => {
    expect(parser.renderAsText(simpleStructure)).toEqual(simpleText);
  });

  it('should recognize the different fields in a text', () => {
    expect(parser.parse(simpleText)).toEqual(simpleStructure);
  });

  it('should report errors when text outside of the template is given', () => {
    expect(parser.parse('abc\ndef')).toEqual({
      future: { availability: 'unbekannt', plannedItems: [] },
      past: { blockingItems: [], completedItems: [] },
      notRecognized: 'abc\ndef'
    });
  });

  it('should display unformatted text below the template with a caption', () => {
    expect(parser.renderAsText(Object.assign({ notRecognized: 'abc\ndef' }, simpleStructure)))
      .toEqual(`${simpleText}\n\n**NOT RECOGNIZED**\nabc\ndef`);
  });
});
