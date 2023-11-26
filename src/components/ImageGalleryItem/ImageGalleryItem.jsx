import { Component } from 'react';
import Modal from '../Modal/Modal';
import styles from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  render() {
    const {
      galleryItem: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <>
        <li className={styles['image-gallery-item']} onClick={this.toggleModal}>
          <img
            src={webformatURL}
            className={styles['image-gallery-item-image']}
            alt={tags}
          />
        </li>
        {this.state.isModalOpen && (
          <Modal
            modalSrc={largeImageURL}
            alt={tags}
            onCloseModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}
