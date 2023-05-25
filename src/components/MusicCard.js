import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

function MusicCard({ trackName, previewUrl, trackId }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToFavorite = () => {
    setIsLoading(true);

    const song = {
      trackId,
      trackName,
      previewUrl,
    };

    addSong(song)
      .then(() => {
        console.log('Song added to favorites:', song);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error adding song to favorites:', error);
        setIsLoading(false);
      });
  };
  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label htmlFor={ `checkbox-music-${trackId}` }>
        Favorita
        <input
          type="checkbox"
          id={ `checkbox-music-${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ handleAddToFavorite }
          disabled={ isLoading }
        />
      </label>
      {isLoading && <p>Carregando...</p>}
    </div>
  );
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
