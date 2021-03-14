const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let categorias = [];

fetch(url).then(res=>res.json()).then(res=>{
    categorias = res;
}).then(()=>{
    let ul = document.getElementById("navMenu");
    for(let cat of categorias){
        let name = cat.name;
        let name2 = name.replace(/\s+/g,'');
        console.log("Name: "+name);
        let li = document.createElement("li");
        li.classList.add('nav-item');
        let a = document.createElement("a");
        a.classList.add("nav-link");
        let tarId = "#"+name2;
        console.log("ID: "+ tarId);
        a.href = tarId;
        a.setAttribute("data-toggle", "tab");
        a.textContent = name;
        li.appendChild(a);
        ul.appendChild(li);
    }
});