import React from "react";
import Modal from "../general/Modal";
import StarRatings from "react-star-ratings";
import venueStyles from "../../styles/venue.module.css";

const VenueReviewModal = ({ ...modalProps }) => {
  return (
    <Modal {...modalProps}>
      <form
        className={venueStyles.reviewForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <StarRatings rating={3} starDimension="18px" starRatedColor="#FBFF24" />
        <textarea
          className={venueStyles.reviewInput}
          type="text"
          placeholder="Write your review"
          required
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
