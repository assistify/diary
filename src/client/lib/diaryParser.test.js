import DiaryParser from './diaryParser';

const parser = new DiaryParser();

const simpleText = `**${parser.questions[0]}?**
- task 1

**${parser.questions[1]}?**
- task 3

**${parser.questions[2]}?**
- task 2

**${parser.questions[3]}?**
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
    const newParser = new DiaryParser();
    expect(newParser.parse('abc\ndef')).toEqual({
      future: { availability: 'unbekannt', plannedItems: [] },
      past: { blockingItems: [], completedItems: [] },
      notRecognized: 'abc\ndef'
    });
  });

  it('should display unformatted text below the template with a caption', () => {
    expect(parser.renderAsText(Object.assign({ notRecognized: 'abc\ndef' }, simpleStructure)))
      .toEqual(`${simpleText}\n&nbsp;\n**NOT RECOGNIZED**\nabc\ndef`);
  });

  it('should ignore case of messages', () => {
    const newParser = new DiaryParser();
    const capitalizeEveryWord = text => text.toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    expect(newParser.parse(`**${capitalizeEveryWord(newParser.questions[0])}?**\nqwert`)).toEqual({
      future: { availability: 'unbekannt', plannedItems: [] },
      past: { blockingItems: [], completedItems: [{ title: 'qwert' }] }
    });
  });
});
