import parser from './diaryParser';

const simpleText = `**An was hast Du gearbeitet?**
- task 1

**Was möchtest Du als nächstes tun?**
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
    expect(parser.stringify(simpleStructure)).toEqual(simpleText);
  });

  it('should recognize the different fields in a text', () => {
    expect(parser.parseText(simpleText)).toEqual(simpleStructure);
  });

  it('should report errors when text outside of the template is given', () => {
    expect(parser.parseText('abc\ndef')).toEqual({
      error: 'Encountered text outside of template - manual intervention necessary!',
      future: { availability: 'unbekannt', plannedItems: [] },
      manual: 'abc\ndef',
      past: { blockingItems: [], completedItems: [] }
    });
  });

  it('should display unformatted text below the template with a caption', () => {
    expect(parser.stringify(Object.assign({ manual: 'abc\ndef' }, simpleStructure)))
      .toEqual(`${simpleText}\n\n**UNFORMATTED**\nabc\ndef`);
  });
});
