import React, { useState, useEffect } from "react";
import { createClient } from "pexels";
import "./gallery.css";
import lruCache from "lru-cache";

const cache = new lruCache({ max: 50 });

export const Gallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const pexelsClient = createClient(process.env.REACT_APP_PEXELS_API_KEY);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      const cacheKey = query ? `${query}_${page}` : page;
      if (cache.has(cacheKey)) {
        result = cache.get(cacheKey);
      } else {
        if (query) {
          result = await pexelsClient.photos.search({
            query,
            page,
            per_page: 12,
          });
        } else {
          result = await pexelsClient.photos.curated({ page, per_page: 12 });
        }
        cache.set(cacheKey, result);
      }
      setImages(result.photos);
      setHasPreviousPage(result.page > 1);
      setHasNextPage(result.next_page);
    };

    fetchData();
  }, [query, page, pexelsClient]);

  const handlePreviousClick = () => {
    setPage(page - 1);
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="gallery-container">
        {images.map((image) => (
          <div className="image-container" key={image.id}>
            <div
              className="background-image"
              style={{ backgroundImage: `url(${image.src.large})` }}
            />
            <div className="image-caption">
              <a className="bio-link" href={image.photographer_url}>
                {image.photographer}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        {hasPreviousPage && (
          <button onClick={handlePreviousClick}>Previous</button>
        )}
        {hasNextPage && <button onClick={handleNextClick}>Next</button>}
      </div>
    </>
  );
};
