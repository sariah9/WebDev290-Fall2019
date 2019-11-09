//Chapter 2 Exercises
//Looping A Triangle 
let count = 0;
let string = " ";
while (count < 7) {
  console.log(string += "#");
  count++;
}

//FizzBuzz
let count = 0;
let numerical = 0;
let div3 = "Fizz";
let div5 = "Buzz";
while (count < 100) {
  numerical++;
  if (((numerical % 3) == 0) && ((numerical % 5) == 0)){
    console.log(div3 + div5);
  } else if ((numerical % 3) == 0) {
    console.log(div3);
  } else if ((numerical % 5) == 0) {
    console.log(div5);
  } else {
    console.log(numerical);
  }
  count++;
}

//Chessboard
let size = 8;
let board = "";
for (let y = 0; y < size; y++) {   
  for (let x = 0; x < size; x++) {
    if ((x + y) % 2 == 0) {
      board += " ";
    } else {
      board += "#";
    }
  }
  board += "\n";
}

console.log(board);

//Chapter 14
//Tabs
<tab-panel>
  <div id="wrapper">
  <div data-tabname="one">Tab one</div>
  <div data-tabname="two">Tab two</div>
  <div data-tabname="three">Tab three</div>
  </div>
</tab-panel>
<script>
  function asTabs(node) {
    // Your code here.
    var tabs = [];
    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      if (child.nodeType == document.ELEMENT_NODE)
        tabs.push(child);
    }

    var tabList = document.createElement("div");
    tabs.forEach(function(tab, i) {
      var button = document.createElement("button");
      button.textContent = tab.getAttribute("data-tabname");
      button.addEventListener("click", function() { selectTab(i); });
      tabList.appendChild(button);
    });
    node.insertBefore(tabList, node.firstChild);

    function selectTab(n) {
      tabs.forEach(function(tab, i) {
        if (i == n)
          tab.style.display = "";
        else
          tab.style.display = "none";
      });
      for (var i = 0; i < tabList.childNodes.length; i++) {
        if (i == n)
          tabList.childNodes[i].style.background = "violet";
        else
          tabList.childNodes[i].style.background = "";
      }
    }
    selectTab(0);
  }
  asTabs(document.querySelector("#wrapper"));
</script>
