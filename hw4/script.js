let createTable = function() {
  let column = 1;
  let row = 1;

  function tableFill(func) {
     let body = document.body;
     let table = document.createElement('table');
     let tableBody = document.createElement('tbody');

     table.style.width = '75%';
     table.setAttribute('border', '2');

     for (let r = 0; r < 4; r++) {
        let tr = document.createElement('tr');
        for (let c = 0; c < 4; c++) {
           if (r === 0) {
              let th = document.createElement('th');
              th.appendChild(document.createTextNode("Header " + (c + 1)));
              tr.appendChild(th);
           } else {
              let td = document.createElement('td');
              let label = (r) + "," + (c + 1);
              td.appendChild(document.createTextNode(label));
              td.setAttribute('id', label);
              tr.appendChild(td);
           }       
        }
        tableBody.appendChild(tr);
     }
     table.appendChild(tableBody);
     body.appendChild(table);
     
     if (func) {
        func();
     }
  }

  function markCell() {
     let cell = document.getElementById(row + "," + column);
     cell.style.background = "yellow";
  }

  function appendButtons() {
     let body = document.body;
     let labels = ["Up", "Down", "Left", "Right", "Mark Cell"];

     for (let i = 0; i < labels.length; i++) {
        let button = document.createElement('button');
        button.appendChild(document.createTextNode(labels[i]));
        body.appendChild(button);
        let dir = labels[i];
        button.addEventListener("click", function(e) {
            if (e.target.innerText !== "Mark Cell") {
               moveCursor(e.target.innerText);
            } else {
               markCell();
            }
        });
     }
  }

  function moveCursor(dir) {
     let cellName = row + "," + column;
     let currCell = document.getElementById(cellName);
     currCell.style.border = "1px solid black";

     switch (dir) {
       case "Up":
          if (row !== 1) {
             row--;
          }
          break;
       case "Down":
          if (row !== 3) {
             row++;
          }
          break;
       case "Left":
          if (column !== 1) {
             column--;
          }
          break;
       case "Right":
          if (column !== 4) {
             column++;
          }
          break;
     }

     cellName = row + "," + column;
     currCell = document.getElementById(cellName);
     currCell.style.border = "3px solid black";
  }

  tableFill(appendButtons);
};

createTable();
