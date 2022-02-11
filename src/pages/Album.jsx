import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumMusic: [],
      loadPage: true,
      musics: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const resultApi = await getMusics(id);
    this.setState({
      albumMusic: resultApi,
      loadPage: false,
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      musics: resultApi.slice(1),
    });
  }

  render() {
    const { albumMusic, loadPage, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loadPage ? <Loading />
          : (
            <section>
              <h1 data-testid="artist-name">{albumMusic[0].artistName}</h1>
              <h2 data-testid="album-name">{albumMusic[0].collectionName}</h2>
              <ul>
                {musics.map((music) => (
                  <MusicCard
                    key={ music.trackNumber }
                    trackName={ music.trackName }
                  />
                ))}
              </ul>
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
