import React from 'react';
import renderer from 'react-test-renderer';
import ReportFooter from './ReportFooter';

it('renders correctly', () => {
  const tree = renderer
    .create(<ReportFooter onClick={() => true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
