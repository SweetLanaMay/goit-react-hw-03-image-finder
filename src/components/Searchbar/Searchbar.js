import React, { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
      query: '',
    };
  
    handleInputChange = event => {
      this.setState({ query: event.target.value });
    };
  
    handleSubmit = event => {
      event.preventDefault();
      this.props.onSubmit(this.state.query);
    };
  
    render() {
      return (
        <header className={css.searchbar}>
          <form className={css.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.searchButton}>
              <span className={css.buttonLabel}>Search</span>
            </button>
  
            <input
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
        </header>
      );
    }
  }
  
  export default Searchbar;