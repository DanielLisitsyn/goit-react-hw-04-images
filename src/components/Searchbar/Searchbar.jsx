import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handelSubmit = e => {
    e.preventDefault();
    if (text.trim() === '') {
      toast.warn('Enter image name');
      return;
    }
    onSubmit(text);
    reset();
  };

  const reset = () => {
    setText('');
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setText(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handelSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <ImSearch />
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={text}
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
