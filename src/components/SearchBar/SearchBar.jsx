import { Component } from 'react';
import styles from './SearchBar.module.css';
import { IoSearch } from 'react-icons/io5';

export default class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    const query = this.state.query.trim();
    e.preventDefault();

    this.props.onSubmit(query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles['search-form']} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles['search-form-button']}>
            <IoSearch />
          </button>
          <input
            className={styles['search-form-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
