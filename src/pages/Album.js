import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

function Album() {
  const { id } = useParams();
  const [musics, setMusics] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');

  useEffect(() => {
    const fetchMusics = async () => {
      const results = await getMusics(id);
      setMusics(results);
    };

    fetchMusics();
  }, [id]);

  useEffect(() => {
    if (musics.length > 0) {
      setArtistName(musics[0].artistName);
      setAlbumName(musics[0].collectionName);
    }
  }, [musics]);

  const handleAddToFavorite = (song) => {
    addSong(song)
      .then(() => {
        console.log('Song added to favorites:', song);
      })
      .catch((error) => {
        console.error('Error adding song to favorites:', error);
      });
  };

  return (
    <div>
      <h2 data-testid="artist-name">{artistName}</h2>
      <h3 data-testid="album-name">{albumName}</h3>
      {musics.slice(1).map((music) => (
        <MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          trackId={ music.trackId }
          onAddToFavorite={ handleAddToFavorite }
        />
      ))}
    </div>
  );
}

export default Album;
