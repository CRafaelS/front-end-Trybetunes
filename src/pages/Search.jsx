import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

// Requisito 6 feito com a ajuda da Lorene

class Search extends React.Component {
  state = {
    saveArtist: '',
    artist: '',
    searchButton: true,
    loadPage: false,
    listAlbum: [],
    printTitle: false,
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

  handleFindArtist = async () => {
    const { artist } = this.state;
    this.setState({ loadPage: true, saveArtist: artist });
    const serchList = await searchAlbumsAPI(artist);
    this.setState({
      artist: '',
      loadPage: false,
      listAlbum: serchList,
      printTitle: true,
    });
  };

  render() {
    const {
      searchButton, loadPage, artist,
      listAlbum, saveArtist, printTitle } = this.state;
    return (
      <section data-testid="page-search">
        <Header />
        { loadPage ? <Loading /> : (
          <form>
            <input
              type="text"
              value={ artist }
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              onChange={ this.handleSearchValidate }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ searchButton }
              onClick={ this.handleFindArtist }
            >
              Pesquisar
            </button>
          </form>
        ) }

        { printTitle && (
          <h1>
            { `Resultado de álbuns de: ${saveArtist}`}
          </h1>
        )}

        { (printTitle && listAlbum.length === 0) ? (<h2>Nenhum álbum foi encontrado</h2>)
          : (listAlbum.map((elemt) => (
            <Link
              key={ elemt.collectionId }
              data-testid={ `link-to-album-${elemt.collectionId}` }
              to={ `/album/${elemt.collectionId}` }
            >
              {elemt.collectionName}
            </Link>
          )))}
      </section>
    );
  }
}

export default Search;
