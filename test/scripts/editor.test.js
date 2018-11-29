import { Selector } from 'testcafe';
import { sampleUrl } from '../data/fullTeamData';

fixture('Use the editor') // eslint-disable-line no-undef, no-unused-expressions
  .page(sampleUrl) // eslint-disable-line no-unused-expressions
  .beforeEach(async (t) => {
    await t
      .click('.js-toggle-editor');
  });

test('Should be able to copy URL to the clipboard', async (t) => {
  await t
    .setNativeDialogHandler(() => true)
    .click('.js-copy-url-to-clipboard');
  /* we cannot do more here. Even using a ClientFunction,
  there's no way to read the Clipboard reliably across browsers.
  However, this interaction at least executes the code preparing
  the clipboard content */
});

test('Should switch to code mode', async (t) => {
  await t
    .click('.jsoneditor-modes')
    .click('.jsoneditor-menu .jsoneditor-menu :nth-child(3) button');
});

test.skip('Should change the team name', async (t) => {
  const teamNameInput = Selector('.jsoneditor-tree table > tbody > tr:nth-child(3) > td:nth-child(3) > table > tbody > tr > td:nth-child(4) > div');
  const suffix = '-dummy';
  await t
    .typeText(teamNameInput, suffix);

  await t
    .click('.js-toggle-editor')
    .expect(Selector('.team-name').innerText).contains(suffix);
});
