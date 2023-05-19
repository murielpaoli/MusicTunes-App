import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    isLoading: true,
    userName: '',
  };

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    try {
      const user = await getUser();
      this.setState({
        isLoading: false,
        userName: user.name,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, userName } = this.state;

    return (
      <header data-testid="header-component">
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <p data-testid="header-user-name">{userName}</p>
        )}
        <div>
          <Link to="/search" data-testid="link-to-search"> Search </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
          <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        </div>
      </header>
    );
  }
}

export default Header;
