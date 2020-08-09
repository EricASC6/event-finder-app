import React, { useState } from "react";
import Modal from "../general/Modal";
import StarRatings from "react-star-ratings";
import venueStyles from "../../styles/venue.module.css";

const VenueReviewModal = ({
  onWrite = ({ stars, text }) => {},
  ...modalProps
}) => {
  const [stars, setStars] = useState(0);
  const [text, setText] = useState("");

  return (
    <Modal {...modalProps}>
      <form
        className={venueStyles.reviewForm}
        onSubmit={(e) => {
          e.preventDefault();
          onWrite({ stars, text });
        }}
      >
        <StarRatings
          rating={stars}
          starDimension="18px"
          starRatedColor="#FBFF24"
          starHoverColor="#f4ff78"
          changeRating={(stars) => setStars(stars)}
        />
        <textarea
          value={text}
          className={venueStyles.reviewInput}
          type="text"
          placeholder="Write your review"
          required
          onChange={(e) => setText(e.target.value)}
          style={{ marginTop: "0.75rem" }}
        />
        <button
          className={venueStyles.btn}
          style={{ marginLeft: "auto", marginTop: "0.75rem" }}
        >
          Write
        </button>
      </form>
    </Modal>
  );
};

export default VenueReviewModal;
