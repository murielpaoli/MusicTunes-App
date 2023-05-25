import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

function MusicCard({ trackName, previewUrl, trackId, onAddToFavorite }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const checkIsFavorite = async () => {
      const favoriteSongs = await getFavoriteSongs();
      setIsChecked(favoriteSongs.some((song) => song.trackId === trackId));
    };

    checkIsFavorite();
  }, [trackId]);

  const handleAddToFavorite = () => {
    setIsLoading(true);

    const song = {
      trackId,
      trackName,
      previewUrl,
    };

    if (isChecked) {
      removeSong(song)
        .then(() => {
          console.log('Song removed from favorites:', song);
          setIsChecked(false);
          setIsLoading(false);
          onAddToFavorite(song);
        })
        .catch((error) => {
          console.error('Error removing song from favorites:', error);
          setIsLoading(false);
        });
    } else {
      addSong(song)
        .then(() => {
          console.log('Song added to favorites:', song);
          setIsChecked(true);
          setIsLoading(false);
          onAddToFavorite(song);
        })
        .catch((error) => {
          console.error('Error adding song to favorites:', error);
          setIsLoading(false);
        });
    }
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
      <input
        type="checkbox"
        onChange={ handleAddToFavorite }
        data-testid={ `checkbox-music-${trackId}` }
        checked={ isChecked }
      />
      <label htmlFor={ `checkbox-music-${trackId}` }>
        {isLoading ? <Loading /> : <p> Favorita </p>}
      </label>
    </div>
  );
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onAddToFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
