import React from 'react';
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
      </header>
    );
  }
}

export default Header;
