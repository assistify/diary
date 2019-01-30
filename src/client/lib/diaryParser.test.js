import { getQuestions, parse, renderAsText } from './diaryParser';

const questions = getQuestions();

const simpleText = `**${questions[0]}?**
- task 1

**${questions[1]}?**
- task 3

**${questions[2]}?**
- task 2

**${questions[3]}?**
Office`;

const simpleStructure = {
  past: {
    completedItems: [{ title: 'task 1' }],
    blockingItems: [{ title: 'task 2' }]
  },
  future: {
    plannedItems: [{ title: 'task 3' }],
    availability: 'Office'
  },
  notRecognized: ''
};

describe('Parser', () => {
  it('should correctly serialize the data structure', () => {
    expect(renderAsText(simpleStructure)).toEqual(simpleText);
  });

  it('should recognize the different fields in a text', () => {
    expect(parse(simpleText)).toEqual(simpleStructure);
  });

  it('should report errors when text outside of the template is given', () => {
    expect(parse('abc\ndef')).toEqual({
      future: { availability: 'unbekannt', plannedItems: [] },
      past: { blockingItems: [], completedItems: [] },
      notRecognized: 'abc\ndef'
    });
  });

  it('should display unformatted text below the template with a caption', () => {
    const simpleWithUnrecognized = simpleStructure;
    simpleWithUnrecognized.notRecognized = 'abc\ndef';
    expect(renderAsText(simpleWithUnrecognized))
      .toEqual(`${simpleText}\n&nbsp;\n**NOT RECOGNIZED**\nabc\ndef`);
  });

  it('should ignore case of messages', () => {
    const capitalizeEveryWord = text => text.toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    expect(parse(`**${capitalizeEveryWord(questions[0])}?**\nqwert`)).toEqual({
      future: { availability: 'unbekannt', plannedItems: [] },
      past: { blockingItems: [], completedItems: [{ title: 'qwert' }] },
      notRecognized: '',
    });
  });
});
