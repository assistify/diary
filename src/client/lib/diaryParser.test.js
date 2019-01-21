import parser from './diaryParser';

const simpleText = `**An was hast Du gearbeitet?**
- task 1

**Was möchtest Du als nächstes tun?**
- task 3

**Wobei benötigst Du Hilfe?**
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
});
