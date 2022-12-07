import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

import GlobalStyle from './asserts/styles/global';
import defautTheme from './asserts/themes/defaut';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={ defautTheme }>

        <BrowserRouter>
          <p>TrybeTunes</p>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="/profile" component={ Profile } />
            <Route path="*" component={ NotFound } />
          </Switch>
          <GlobalStyle />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
