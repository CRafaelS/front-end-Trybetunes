import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <section data-testid="page-search">
        <Header />
        <h1>Search</h1>
      </section>
    );
  }
}

export default Search;
