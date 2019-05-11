//arrayToObject turns an array of objects into an object with keyField (_id) as keys
export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

//mergeNotes takes an array of notebooks and turns it into an array of notes.
export const mergeNotes = array =>
  array.reduce((accumulator, currentValue) => {
    accumulator.push(currentValue.notes);
    //The flat() method creates a new array with all sub-array elements concatenated into it recursively & removes empty slots in arrays.
    return accumulator.flat();
  }, []);
