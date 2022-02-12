import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

// Requisito 08 com a ajuda do Laecio

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumMusic: [],
      loadPage: true,
      musics: [],
      favorites: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const resultApi = await getMusics(id);
    const favoritesSong = await getFavoriteSongs();
    this.setState({
      albumMusic: resultApi,
      loadPage: false,
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      musics: resultApi.slice(1),
      favorites: favoritesSong,
    });
  }

  handleFavoriteSong = async (trackId) => {
    const { musics, favorites } = this.state;
    const song = musics.find((element) => (
      element.trackId === trackId
    ));
    const songFind = favorites.find((element) => (
      element.trackId === trackId
    ));
    if (songFind) {
      return this.removeMusic(songFind);
    }
    this.setState((prevState) => ({
      loadPage: true,
      favorites: [...prevState.favorites, song],
    }));
    await addSong(song);
    this.setState({
      loadPage: false,
    });
  }

  removeMusic = async (songFind) => {
    this.setState((prevState) => ({
      favorites: prevState.favorites
        .filter((elemSong) => elemSong.trackId !== songFind.trackId),
      loadPage: true,
    }));
    await removeSong(songFind);
    this.setState({
      loadPage: false,
    });
  }

  render() {
    const { albumMusic, loadPage, musics, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loadPage ? <Loading />
          : (
            <section>
              <h1 data-testid="artist-name">{albumMusic[0].artistName}</h1>
              <h2 data-testid="album-name">{albumMusic[0].collectionName}</h2>
              <div>
                {loadPage ? <Loading />
                  : (musics.map((music) => (
                    <MusicCard
                      key={ music.trackNumber }
                      { ... music }
                      handleFavoriteSong={ this.handleFavoriteSong }
                      checked={ favorites
                        .some((elemSong) => elemSong.trackId === music.trackId) }
                    />
                  )))}
              </div>
            </section>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
