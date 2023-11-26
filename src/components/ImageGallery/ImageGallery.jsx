import React from 'react';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ galleryItems }) {
  return (
    <ul className={styles['image-gallery']}>
      {galleryItems.map(galleryItem => (
        <ImageGalleryItem key={galleryItem.id} galleryItem={galleryItem} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  galleryItems: PropTypes.array.isRequired,
};
