import React, { Component } from 'react';
import styles from './App.module.css';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { fetchGalleryItems } from '../services/api';

export class App extends Component {
  state = {
    searchQuery: '',
    galleryItems: [],
    galleryPage: 1,
    loading: false,
    isButtonShow: false,
    error: true,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, galleryPage } = this.state;

    if (
      prevState.searchQuery !== searchQuery ||
      prevState.galleryPage !== galleryPage
    ) {
      fetchGalleryItems(
        searchQuery,
        galleryPage,
        this.handleFetchSuccess,
        this.handleFetchError
      );
    }
  }

  handleFetchSuccess = data => {
    const hits = data.totalHits;

    if (!hits) {
      this.setState({ loading: false, error: true });
      return;
    }

    const newData = data.hits.map(
      ({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      })
    );

    const currentData = [...this.state.galleryItems, ...newData];

    this.setState(prevState => ({
      galleryItems: [...prevState.galleryItems, ...newData],
    }));

    if (currentData.length >= hits) {
      this.setState({
        loading: false,
        isButtonShow: false,
        error: false,
      });
      return;
    }

    this.setState({
      loading: false,
      isButtonShow: true,
      error: false,
    });
  };

  handleFetchError = () => {
    this.setState({ loading: false, error: true });
  };

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      galleryItems: [],
      galleryPage: 1,
      isButtonShow: false,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  render() {
    const { galleryItems, loading, isButtonShow, error } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && <h2>Please, enter a search word!</h2>}
        {!error && <ImageGallery galleryItems={galleryItems} />}
        {loading && <Loader />}
        {isButtonShow && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
