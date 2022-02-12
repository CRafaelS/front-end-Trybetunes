import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

// Desenvolvido com ajuda do Léo, Calili e Genivaldo

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
        <Link to="/search" data-testid="link-to-search"> Pesquisa </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favoritas </Link>
        <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        {loadPage && <Loading /> }
        <p data-testid="header-user-name">
          {name}
        </p>
      </header>
    );
  }
}

export default Header;
