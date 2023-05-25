import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

function Album() {
  const { id } = useParams();
  const [musics, setMusics] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [favoriteSongs, setFavoriteSongs] = useState([]);

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

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      const songs = await getFavoriteSongs();
      setFavoriteSongs(songs);
    };

    fetchFavoriteSongs();
  }, []);

  const handleAddToFavorite = (song) => {
    // Atualizar a lista de músicas favoritas
    setFavoriteSongs((prevSongs) => {
      const index = prevSongs.findIndex((favSong) => favSong.trackId === song.trackId);
      if (index === 0) {
        return [...prevSongs, song];
      }
      const updatedSongs = [...prevSongs];
      updatedSongs.splice(index, 1);
      return updatedSongs;
    });

    // Adicionar/remover a música aos favoritos no backend
    if (favoriteSongs.some((favSong) => favSong.trackId === song.trackId)) {
      removeSong(song)
        .then(() => {
          console.log('Song removed from favorites:', song);
        })
        .catch((error) => {
          console.error('Error removing song from favorites:', error);
        });
    } else {
      addSong(song)
        .then(() => {
          console.log('Song added to favorites:', song);
        })
        .catch((error) => {
          console.error('Error adding song to favorites:', error);
        });
    }
  };

  return (
    <div data-testid="page-album">
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
