import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './pages/Search';
import Login from './pages/Login';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Route exact path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Layout>

          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
        </Layout>
        <Route path="" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
