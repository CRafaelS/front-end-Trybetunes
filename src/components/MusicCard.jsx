import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, handleFavoriteSong, checked } = this.props;
    return (
      <li>
        <p>{ trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorita">
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id="favorita"
            onClick={ () => handleFavoriteSong(trackId) }
            checked={ checked }
          />
          Favorita
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  handleFavoriteSong: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
