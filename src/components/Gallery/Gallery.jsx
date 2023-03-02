import { useState, useEffect } from 'react';
import css from './Gallery.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import { fetchImages } from 'services/api';
import Button from 'components/Button/Button';
import Modal from 'shared/component/Modal';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [searchQuery, setsearchQuery] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const data = await fetchImages(searchQuery, page);
        if (data.hits.length === 0) {
          toast.error('NOTHING FOUND');
          return;
        }
        setItems(prev => [...prev, ...data.hits]);
        setTotalHits(data.totalHits);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (searchQuery) {
      fetch();
    }
  }, [searchQuery, page]);

  const onSearchImages = query => {
    if (query === searchQuery) {
      return;
    }
    setItems([]);
    setPage(1);
    setsearchQuery(query);
    // this.setState({ items: [], page: 1, searchQuery: query });
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onshowModal = (largeImageURL, tags) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={css.gallery}>
      {showModal && (
        <Modal close={closeModal}>
          <img src={largeImageURL} alt={tags} width="800" />
        </Modal>
      )}
      <Searchbar onSubmit={onSearchImages} />

      <ToastContainer autoClose={3000} theme="colored" position="top-right" />

      {items.length > 0 && <ImageGallery items={items} onClick={onshowModal} />}
      {loading && <Loader />}
      {items.length < totalHits && items.length > 0 && (
        <Button onClick={onLoadMore} />
      )}
    </div>
  );
};

export default Gallery;
