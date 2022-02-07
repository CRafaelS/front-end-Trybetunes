import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    name: '',
    loadPage: false,
  }

  async componentDidMount() {
    this.setState({ loadPage: true });
    const user = await getUser();
    this.setState({ loadPage: false, name: user.name });
  }

  render() {
    const { name, loadPage } = this.state;
    return (
      <header data-testid="header-component">
        {loadPage && <Loading /> }
        <p data-testid="header-user-name">
          {name}
        </p>
      </header>
    );
  }
}

export default Header;
