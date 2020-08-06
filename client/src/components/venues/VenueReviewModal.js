import React from "react";
import Modal from "../general/Modal";
import StarRatings from "react-star-ratings";

const VenueReviewModal = ({ ...modalProps }) => {
  return (
    <Modal {...modalProps}>
      <form>
        <StarRatings rating={3} starDimension="16px" starRatedColor="#FBFF24" />
        <input />
        <button>Write</button>
      </form>
    </Modal>
  );
};

export default VenueReviewModal;
