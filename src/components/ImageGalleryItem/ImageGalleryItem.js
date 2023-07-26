import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={css.galleryItem} onClick={onClick}>
      <img src={image.webformatURL} alt={image.tags} className={css.image} />
    </li>
  );
};

export default ImageGalleryItem