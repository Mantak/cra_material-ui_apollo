import React from 'react';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

class Main extends React.Component {
  render() {
    return (
      <div>
        <MyButton>{'Styled Components'}</MyButton>
        <Button>Styled Components</Button>
        <Button onClick={() => toast('Hello 您好')}>Hello 😀</Button>
        <Button variant="contained" color="primary">
          Primary
        </Button>
      </div>
    );
  }
}
export default Main;
