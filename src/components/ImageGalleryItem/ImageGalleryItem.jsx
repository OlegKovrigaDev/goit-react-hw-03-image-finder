import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image, onImageClick }) {
  return (
    <li
      className={styles['image-gallery-item']}
      onClick={() => onImageClick(image.largeImageURL)}
    >
      <img
        src={image.webformatURL}
        className={styles['image-gallery-item-image']}
        alt={image.id}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
