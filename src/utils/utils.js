export const dataFilter = (data, n) => {
  const addArray = (array, element, n) => {
    for (let i = 0; i < n; i++) {
      array.push(element);
    }
    return array;
  };
  if (Array.isArray(data) && data.length) {
    const _data =
      data.length >= n
        ? data.slice(0, n)
        : addArray(data, data[data.length - 1], n - data.length);
    return _data;
  }
  return data;
};
