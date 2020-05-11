import chunk from 'lodash.chunk';
import flatten from 'lodash.flatten';
import cloneDeep from 'lodash.clonedeep';

const updatePagedList = (list, newItem, chunkSize, updating = false) => {
  const curList = cloneDeep(list);
  const curArr = flatten(Object.keys(curList).map(page => curList[page]));

  let newArr;

  if (updating) {
    newArr = curArr.map(item => {
      if (item.id === newItem.id) {
        return newItem;
      }
      return item;
    })
  } else {
    newArr = curArr.concat().push(newItem);
  }

  const newList = {};
  chunk(newArr, chunkSize).forEach((arr, index) => {
    newList[index + 1] = arr;
  });
  return newList;
};

export default updatePagedList;
