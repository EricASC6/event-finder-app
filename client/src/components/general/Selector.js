import React from "react";
import generalStyles from "../../styles/general.module.css";

// component rerenders everytime the entries array changes
// even if the values in the array remain exactly the same

// the entries rarely changes anyways so unneccessary rerenders are produced
// to prevent this, I memoized the component and compared the prevProps
// to the nextProps to determine if a rerender is necessary

// rerenders should only be triggered by the active prop
const Selector = React.memo(
  ({ active, entries, onChange }) => {
    return (
      <ul className={generalStyles.selector}>
        {entries.map((entry, indx) => {
          const { key, value } = entry;
          const activeItem = value === active && generalStyles.active;

          return (
            <li
              className={`${generalStyles.selectorItem} ${activeItem}`}
              key={indx}
              onClick={() => {
                onChange(value);
              }}
            >
              {key}
            </li>
          );
        })}
      </ul>
    );
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);

export default Selector;
