import React from "react";
import venueStyles from "../../styles/venue.module.css";

const NUM_REVIEWS = [5, 4, 3, 2, 1];

const ReviewsBreakdown = ({ total = 10, breakdown = [0, 0, 0, 0, 0] }) => {
  return (
    <div className={venueStyles.breakdownBox}>
      {NUM_REVIEWS.map((i, indx) => {
        const percentage = (breakdown[indx] / total) * 100;
        return (
          <div key={i} className={venueStyles.breakdownGraph}>
            <p className={venueStyles.breakdownLabel}>{i} Stars</p>
            <div className={venueStyles.graphContainer}>
              <div
                className={venueStyles.graphBar}
                style={{
                  width: `${percentage}%`,
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsBreakdown;
