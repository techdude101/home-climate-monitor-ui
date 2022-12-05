export const getFirstAndLastInArray = (arr) => {
  if ((arr === undefined) || (arr === null)) return null;
  const length = arr.length;
  if (length < 1) return null;
  if (length === 1) return arr;
  const first = arr[0];
  const last = arr[length - 1];
  return [first, last];
};

export const getNelementsEvenlySpaced = (arr, numberOfElements) => {
  if ((arr === undefined) || (arr === null)) return null;
  const length = arr.length;
  let spaceBetweenElements = 0;
  if (length < numberOfElements) return null;
  if (numberOfElements < 2) return null;
  if (length < 1) return null;
  if (length === 1) return arr;
  if (numberOfElements === 2) return getFirstAndLastInArray(arr);
  if (numberOfElements % 2 === 1){ 
    spaceBetweenElements = Math.floor(length / numberOfElements) + 1;
  } else {
    spaceBetweenElements = Math.floor(length / numberOfElements);
  }
  let result = [];
  for (let i = 0; i <= (length - spaceBetweenElements); i += spaceBetweenElements) {
    result.push(arr[i]);
  }
  // Add the last element in the array
  result.push(arr[length - 1]);
  return result;
};