document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
  document.getElementById('urlSubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var payload = {dessert:null};
    payload.dessert = document.getElementById('dessert').value;
    req.open('POST', 'http://httpbin.org/post', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(payload));
    var response = JSON.parse(req.responseText);
    document.getElementById('favDessert').textContent = response.dessert;
    event.preventDefault();
  });
}
