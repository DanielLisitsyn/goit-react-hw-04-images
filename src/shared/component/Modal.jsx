import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, close }) => {
  const onClickEsc = e => {
    if (e.code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', onClickEsc);

    return () => {
      document.body.removeEventListener('keydown', onClickEsc);
    };
  });

  const handleClose = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      close();
    }
  };

  return createPortal(
    <div onClick={handleClose} className={css.overlay}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
Modal.propTypes = {
  close: PropTypes.func,
  children: PropTypes.node,
};
