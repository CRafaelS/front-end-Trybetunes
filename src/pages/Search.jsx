import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
    searchButton: true,
  }

  handleSearchValidate = ({ target }) => {
    const { value } = target;
    this.setState(({
      artist: value,
    }), () => {
      const { artist } = this.state;
      const minLenght = 2;
      if (artist.length >= minLenght) {
        this.setState({ searchButton: false });
      } else { this.setState({ searchButton: true }); }
    });
  }

  render() {
    const { searchButton } = this.state;
    return (
      <section data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ this.handleSearchValidate }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ searchButton }
          >
            Pesquisar
          </button>
        </form>
      </section>
    );
  }
}

export default Search;
