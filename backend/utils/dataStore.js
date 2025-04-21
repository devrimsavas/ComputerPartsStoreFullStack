//this file does not only keep global data but also crud operations
//such as controller 

let data = []; // this holds your parts list

function getData() {
  return data;
}

function setData(newData) {
  data = newData;
}

function addPart(part) {
  data.push(part);
}

function updatePart(updatedPart) {
  const index = data.findIndex((p) => p.id === updatedPart.id);
  if (index !== -1) {
    data[index] = updatedPart;
  }
}

module.exports = {
  getData,
  setData,
  addPart,
  updatePart,
};
