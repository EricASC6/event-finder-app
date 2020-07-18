export const createSelectorEntries = (obj) => {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
};
