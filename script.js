//const fetch = require("node-fetch");
const json = require("./media/data");

function addItem(item){
    let li = document.createElement('li');
    li.class = "nav-item";
    li.appendChild(addItem2(item));
}
function addItem2(name){
    let a = document.createElement('a');
    a.textContent = name;
    a.className = "nav-link";
    a.href = "#" + name;
}

let cats = [];
for(let  i = 0;i<json.length;i++){
    cats.push(json[i].name);
}
console.log(cats);
let menu = document.querySelector('#menu');

for(let i = 0; i<cats.length;i++){
    menu.appendChild(addItem(cats[i]));
    console.log(cats[i]);
}

/*
  fetch("data.json").then(function(response) {
  response.text().then(function(text) {
    let obj = JSON.parse(text);
        
        let cats = [];
        for(let  i = 0;i<obj.length;i++){
          cats.push(obj[i].name);
        }
        console.log(cats);
  });
});*/