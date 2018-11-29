import React from 'react';
import { PropTypes } from 'prop-types';

import Button from 'react-bulma-components/lib/components/button';
import Container from 'react-bulma-components/lib/components/container';
import Content from 'react-bulma-components/lib/components/content';
import Footer from 'react-bulma-components/lib/components/footer';

export default function ReportFooter(props) {
  const { onClick } = props;
  return (
    <Footer>
      <Container>
        <Content style={{ textAlign: 'center' }}>
          <Button className="js-toggle-editor" onClick={onClick}>
              Made with ❤ by the Assistify Team
          </Button>
        </Content>
      </Container>
    </Footer>
  );
}
ReportFooter.propTypes = {
  onClick: PropTypes.func.isRequired
};
