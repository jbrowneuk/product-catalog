// Add event handlers here
document.getElementById('id-input-button').addEventListener('click', () => {
  processIdSearch(document.getElementById('id-input').value);
});

document.getElementById('type-input-button').addEventListener('click', () => {
  processTypeSearch(document.getElementById('type-input').value);
});

document.getElementById('price-input-button').addEventListener('click', () => {
  processPriceSearch(document.getElementById('price-input').value);
});

api.searchAllProducts().then((value) => {
  updateTable('allTable', value);
});

// Add function definitions here
function processIdSearch(searchId) {
  api.searchProductById(searchId).then((val) => {
    return Promise.all([api.searchProductsByPrice(val.price, 50), api.searchProductsByType(val.type), val]);
  }).then((val) => {
    const similarArray = getIntersection(val[0], val[1], val[2].id);
    updateExaminedText(val[2]);
    updateTable('similarTable', similarArray);
  }).catch((val) => {
    alert(val);
  });
}

function processTypeSearch(searchType) {
  api.searchProductsByType(searchType).then((val) => {
    updateTable('similarTable', val);
  }).catch((val) => {
    alert(val);
  });
}

function processPriceSearch(searchPrice) {
  api.searchProductsByPrice(searchPrice, 50).then((val) => {
    updateTable('similarTable', val);
  }).catch((val) => {
    alert(val);
  });
}

function getIntersection(arrA, arrB, searchedId) {
  const samePrice = arrA;
  const sameType = arrB;
  const similarArray = [];
  samePrice.forEach((obj1) => {
    sameType.forEach((obj2) => {
      if (obj1.id == obj2.id && obj1.id != searchedId) {
        similarArray.push(obj1);
      }
    });
  });

  return similarArray;
}

function updateExaminedText(product) {
  let outputString = `Product Id: ${product.id}`;
  outputString += `<br> Price: ${product.price}`;
  outputString += `<br> Type: ${product.type}`;
  document.getElementById('productText').innerHTML = outputString;
}

function createTableHeader(tableId) {
  const tableHeaderRow = document.createElement('TR');
  const th1 = document.createElement('TH');
  const th2 = document.createElement('TH');
  const th3 = document.createElement('TH');
  const th4 = document.createElement('TH');
  th1.appendChild(document.createTextNode('Product Id'));
  th2.appendChild(document.createTextNode('Type'));
  th3.appendChild(document.createTextNode('Price'));
  th4.appendChild(document.createTextNode('Examine'));
  tableHeaderRow.appendChild(th1);
  tableHeaderRow.appendChild(th2);
  tableHeaderRow.appendChild(th3);
  tableHeaderRow.appendChild(th4);
  document.getElementById(tableId).appendChild(tableHeaderRow);
}

function updateTable(tableId, productArray) {
  const tableBody = document.getElementById(tableId);
  // reset table
  while (tableBody.hasChildNodes()) {
    tableBody.removeChild(tableBody.firstChild);
  }
  // create table header
  createTableHeader(tableId);

  // populate table rows
  for (let i = 0; i < productArray.length; i += 1) {
    const tr = document.createElement('TR');
    const td1 = document.createElement('TD');
    const td2 = document.createElement('TD');
    const td3 = document.createElement('TD');
    const td4 = document.createElement('TD');
    const examineButton = document.createElement('button');

    examineButton.addEventListener('click', () => {
      processIdSearch(td4.parentNode.firstChild.innerHTML);
    });
    examineButton.appendChild(document.createTextNode('Examine'));
    examineButton.className = 'btn btn-secondary';

    td1.appendChild(document.createTextNode(productArray[i].id));
    td2.appendChild(document.createTextNode(productArray[i].type));
    td3.appendChild(document.createTextNode(productArray[i].price));
    td4.appendChild(examineButton);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tableBody.appendChild(tr);
  }
}
