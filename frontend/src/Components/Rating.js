import React from "react";
import { PropTypes } from "prop-types";

const Rating = ({ rating, review, color }) => {
  return (
    <div className="rating">
      <span>
        {rating >= 1 ? (
          <i class="fa-solid fa-star" style={{ color: `${color}` }}></i>
        ) : rating >= 0.5 ? (
          <i
            class="fa-solid fa-star-half-stroke"
            style={{ color: `${color}` }}
          ></i>
        ) : (
          <i class="far fa-star" style={{ color: `${color}` }}></i>
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <i class="fa-solid fa-star" style={{ color: `${color}` }}></i>
        ) : rating >= 1.5 ? (
          <i
            class="fa-solid fa-star-half-stroke"
            style={{ color: `${color}` }}
          ></i>
        ) : (
          <i class="far fa-star" style={{ color: `${color}` }}></i>
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <i class="fa-solid fa-star" style={{ color: `${color}` }}></i>
        ) : rating >= 2.5 ? (
          <i
            class="fa-solid fa-star-half-stroke"
            style={{ color: `${color}` }}
          ></i>
        ) : (
          <i class="far fa-star" style={{ color: `${color}` }}></i>
        )}
      </span>
      <span>
        {rating >= 4 ? (
          <i class="fa-solid fa-star" style={{ color: `${color}` }}></i>
        ) : rating >= 3.5 ? (
          <i
            class="fa-solid fa-star-half-stroke"
            style={{ color: `${color}` }}
          ></i>
        ) : (
          <i class="far fa-star" style={{ color: `${color}` }}></i>
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <i class="fa-solid fa-star" style={{ color: `${color}` }}></i>
        ) : rating >= 4.5 ? (
          <i
            class="fa-solid fa-star-half-stroke"
            style={{ color: `${color}` }}
          ></i>
        ) : (
          <i class="far fa-star" style={{ color: `${color}` }}></i>
        )}
      </span>
      {review && ` ${review} reviews`}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  review: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Rating.defaultProps = {
  color: "blue",
};

export default Rating;
