import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchImages();
      }
    );
  };

  handleImageClick = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    const apiKey = '37208715-2f059b20d89d3ba30564c9c4f';
    const perPage = 12;

    this.setState({ isLoading: true });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`
      );

      const newImages = response.data.hits;

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        isLoading: false,
      }));
    } catch (error) {
      console.log('Error:', error.message);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {images.length > 0 && !isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal onCloseModal={this.handleCloseModal} image={selectedImage} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
  showModal: PropTypes.bool,
  selectedImage: PropTypes.object,
};

export default App;
