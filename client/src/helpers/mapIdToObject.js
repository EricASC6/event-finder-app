// Function to convert an array of objects with ids to an object
// mapping the object id to the object

export const mapIdToObject = (array) => {
  const obj = {};

  array.forEach((elem) => {
    obj[elem.id] = elem;
  });

  return obj;
};
