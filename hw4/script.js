let tableFill = [
  { "Header 1": "1,1", "Header 2": "1,2", "Header 3": "1,3", "Header 4":"1,4" },
  { "Header 1": "2,1", "Header 2": "2,2", "Header 3": "2,3", "Header 4":"2,4"  },
  { "Header 1": "3,1", "Header 2": "3,2", "Header 3": "3,3", "Header 4":"3,4"  },
];

function createTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function createTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

let table = document.createElement("TABLE");  /* or let table = document.querySelector("table");*/
let data = Object.keys(tableFill[0]);
createTable(table, tableFill); // generate the table first
createTableHead(table, data); // then the head
