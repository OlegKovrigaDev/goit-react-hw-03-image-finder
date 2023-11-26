import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.onCloseModal();
  };

  handleClose = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onCloseModal();
    }
  };
  render() {
    const { modalSrc, alt } = this.props;
    return (
      <div className={styles.overlay} onClick={this.handleClose}>
        <div className={styles.modal}>
          <img src={modalSrc} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.proppTypes = {
  modalSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
