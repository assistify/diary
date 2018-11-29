import { Selector } from 'testcafe';

import { sampleUrl } from '../data/fullTeamData';

fixture('Render with data') // eslint-disable-line no-undef, no-unused-expressions
  .page(sampleUrl); // eslint-disable-line no-unused-expressions


test('Header: Team-Name as title', async (t) => {
  await t
    .expect(Selector('.team-name').innerText).eql('TestTeamName');
});

test('A date is rendered', async (t) => {
  await t
    .expect(Selector('.date').innerText).contains('01'); // to do for equality: set browser language
});


test('Team overview: user1 in availability overview', async (t) => {
  await t
    .expect(Selector('.c-availabilities .c-user').innerText).eql('@user1');
});


test('Team report: Next activities', async (t) => {
  await t
    .expect(Selector('.c-activities.next li').textContent).eql('title-planned (@user1, @user2)');
});

test('Should switch to Editor', async (t) => {
  await t
    .click('.js-toggle-editor');

  const jsonEditor = await Selector('.jsoneditor');

  await t.expect(jsonEditor).ok('Editor opened');
});
