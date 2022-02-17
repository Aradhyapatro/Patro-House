import React from "react";
import { PropTypes } from "prop-types";

const Rating = ({ rating, review, color }) => {
  return (
    <div className="rating">
      <span>
        {rating >= 1 ? (
          <i className="fa-solid fa-star" style={{ color: `${color}` }}></i>
        ) : rating >= 0.5 ? (
          <i
            className="fa-solid fa-star-half-stroke"
            style={{ color: `${color}` }}
          ></i>
        ) : (
          <i className="far fa-star" style={{ color: `${color}` }}></i>
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <i className="fa-solid fa-star" style={{ color: `${color}` }}></i>
        ) : rating >= 1.5 ? (
          <i
            className="fa-solid fa-star-half-stroke"
            style={{ color: `${color}` }}
          ></i>
        ) : (
          <i className="far fa-star" style={{ color: `${color}` }}></i>
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <i className="fa-solid fa-star" style={{ color: `${color}` }}></i>
        ) : rating >= 2.5 ? (
          <i
            className="fa-solid fa-star-half-stroke"
            style={{ color: `${color}` }}
          ></i>
        ) : (
          <i className="far fa-star" style={{ color: `${color}` }}></i>
        )}
      </span>
      <span>
        {rating >= 4 ? (
          <i className="fa-solid fa-star" style={{ color: `${color}` }}></i>
        ) : rating >= 3.5 ? (
          <i
            className="fa-solid fa-star-half-stroke"
            style={{ color: `${color}` }}
          ></i>
        ) : (
          <i className="far fa-star" style={{ color: `${color}` }}></i>
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <i className="fa-solid fa-star" style={{ color: `${color}` }}></i>
        ) : rating >= 4.5 ? (
          <i
            className="fa-solid fa-star-half-stroke"
            style={{ color: `${color}` }}
          ></i>
        ) : (
          <i className="far fa-star" style={{ color: `${color}` }}></i>
        )}
      </span>
      {review && ` ${review} reviews`}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  review: PropTypes.number.isRequired,
  color: PropTypes.string,
};

Rating.defaultProps = {
  color: "blue",
};

export default Rating;
