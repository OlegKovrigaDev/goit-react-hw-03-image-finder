import React, { Component } from 'react';
import axios from 'axios';
import styles from './App.module.css';

import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39913816-3a64d839dc0a58f3e1831719d';

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

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

    if (prevState.searchQuery !== searchQuery) {
      this.setState(
        { galleryPage: 1, galleryItems: [], isButtonShow: false },
        () => {
          this.fetchGalleryItems(searchQuery, 1);
        }
      );
    } else if (prevState.galleryPage !== galleryPage) {
      this.fetchGalleryItems(searchQuery, galleryPage);
    }
  }

  fetchGalleryItems = async (nextQuery, nextPage) => {
    this.setState({ loading: true, error: false });

    try {
      const response = await instance.get('', {
        params: {
          q: nextQuery,
          page: nextPage,
          per_page: 12,
        },
      });

      const data = response.data;
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
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
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
        {error && <h2>Please, enter search word!</h2>}
        {!error && <ImageGallery galleryItems={galleryItems} />}
        {loading && <Loader />}
        {isButtonShow && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
