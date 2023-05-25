import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      loading: false,
      albums: [],
      errorMessage: '',
      searchResult: '',
    };
  }

  componentDidUpdate(prevState) {
    const { albums, searchValue } = this.state;
    if (prevState.albums !== albums && albums.length > 0 && searchValue !== '') {
      this.setState({
        searchValue: '',
      });
    }
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      searchValue: value,
    });
  };

  handleSearch = async (event) => {
    event.preventDefault();
    const { searchValue } = this.state;

    if (searchValue.length < 2) {
      return;
    }

    this.setState({
      loading: true,
      searchResult: searchValue,
    });

    try {
      const albums = await searchAlbumsAPI(searchValue);

      if (albums.length === 0) {
        this.setState({
          albums: [],
          errorMessage: 'Nenhum álbum foi encontrado.',
        });
      } else {
        this.setState({
          albums,
          errorMessage: '',
        });
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
      this.setState({
        albums: [],
        errorMessage: 'Ocorreu um erro ao buscar os álbuns.',
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { searchValue, loading, albums, errorMessage, searchResult } = this.state;

    return (
      <div data-testid="page-search">
        <form onSubmit={ this.handleSearch }>
          <label htmlFor="searchInput">Nome do artista ou banda:</label>
          <input
            id="searchInput"
            type="text"
            data-testid="search-artist-input"
            value={ searchValue }
            onChange={ this.handleInputChange }
          />

          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ searchValue.length < 2 }
          >
            Pesquisar
          </button>
        </form>

        {loading && <p>Carregando...</p>}

        {errorMessage && <p>{errorMessage}</p>}

        {albums.length > 0 && (
          <>
            { searchResult && (
              <h3>
                Resultado de álbuns de:
                {' '}
                {searchResult}
              </h3>)}

            {albums.map((album) => (
              <div key={ album.collectionId }>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  {album.collectionName}

                  <p>
                    Artista:
                    {' '}
                    {album.artistName}
                  </p>
                  <p>
                    Preço:
                    {' '}
                    {album.collectionPrice}
                  </p>
                  <p>
                    Data de lançamento:
                    {' '}
                    {album.releaseDate}
                  </p>
                  <p>
                    Número de faixas:
                    {' '}
                    {album.trackCount}
                  </p>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}

export default Search;
