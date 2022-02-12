import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loadPage: true,
    };
  }

  async componentDidMount() {
    const favoritesSong = await getFavoriteSongs();
    this.setState({
      loadPage: false,
      favorites: favoritesSong,
    });
  }

  handleFavorite = async (id) => {
    const { favorites } = this.state;
    const removeFavorites = favorites.find((elem) => elem.trackId === id);
    if (removeFavorites) {
      return this.removeMusic(removeFavorites);
    }
    this.setState((prevState) => ({
      loadPage: true,
      favorites: [...prevState.favorites],
    }));
  }

  removeMusic = async (removeFavorites) => {
    this.setState((prevState) => ({
      favorites: prevState.favorites
        .filter((elemSong) => elemSong.trackId !== removeFavorites.trackId),
      loadPage: true,
    }));
    await removeSong(removeFavorites);
    this.setState({
      loadPage: false,
    });
  }

  render() {
    const { loadPage, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <ul>
          {loadPage ? <Loading />
            : (favorites.map((music) => (
              <MusicCard
                key={ music.trackId }
                { ... music }
                handleFavoriteSong={ this.handleFavorite }
                checked={ favorites
                  .some((elemSong) => elemSong.trackId === music.trackId) }
              />
            )))}
        </ul>
      </div>
    );
  }
}

export default Favorites;
