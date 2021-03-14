const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let categorias = [];
let cart = [];
fetch(url).then(res=>res.json()).then(res=>{
    categorias = res;
}).then(()=>{
    let menu = document.getElementById("menu");
    let cont = document.getElementById("contenido");
    for(let cat of categorias){
        let name = cat.name;
        let name2 = name.replace(/\s+/g,'');
        //console.log("Name: "+name);
        let col = createCol(1);
        let p = createText("p", name);
        p.onclick = setContent;
        col.appendChild(p);
        menu.appendChild(col);
        
    }
});

function setContent(category){
    let hr = document.createElement("hr");
    let hr2 = document.createElement("hr");
    let content = document.getElementById("content");
    content.innerHTML = '';
    let str = category.target.textContent;
    let t = createText("h2", '<strong>'+str+'</strong>');
    let row1 = createRow();
    row1.appendChild(t);
    content.appendChild(hr);
    content.appendChild(row1);
    content.appendChild(hr2);
    let cat;
    let j;
    //console.log("asdfsa: "+categorias[0].name);
    for(let i=0;i<categorias.length;i++){
        let c = categorias[i];
        let name = c.name;
        //console.log("Probando con " + c + ", el nombre es " + name);
        if(str===c.name){
            cat = c;
            j = i;
        }
    }
    let prods = cat.products;
    let row2 = createRow();
    for(let p of prods){ 
        let col = createCol(1);
        let card = document.createElement("div");
        card.classList.add("card");
        let imgCard = document.createElement("img");
        imgCard.src = p.image;
        imgCard.width = 100;
        imgCard.height = 100;
        card.appendChild(imgCard);
        col.appendChild(card);
        row2.appendChild(col);
    }

    content.appendChild(row2);
}
function setCart(cart){
    let hr = document.createElement("hr");
    let hr2 = document.createElement("hr");
    let content = document.getElementById("content");
    content.innerHTML = '';
    let orDet = createText("h2", '<strong>Order detail</strong>');
    let row1 = createRow();
    row1.appendChild(orDet);
    content.appendChild(hr);
    content.appendChild(row1);
    content.appendChild(hr2);
    let tableRow = createRow();
    let row2 = createRow();
    let col1 = createCol(1);
    let col2 = createCol(1);
    let col3 = createCol(3);
    let col4 = createCol(1);
    let col5 = createCol(1);
    let col6 = createCol(2);
    let t1 = createText("p", '<strong>Item</strong>')
    let t2 = createText("p", '<strong>Qty.</strong>')
    let t3 = createText("p", '<strong>Description</strong>')
    let t4 = createText("p", '<strong>Unit Price</strong>')
    let t5 = createText("p", '<strong>Amount</strong>')
    let t6 = createText("p", '<strong>Modify</strong>')
    col1.appendChild(t1);
    col2.appendChild(t2);
    col3.appendChild(t3);
    col4.appendChild(t4);
    col5.appendChild(t5);
    col6.appendChild(t6);
    row2.appendChild(col1);
    row2.appendChild(col2);
    row2.appendChild(col3);
    row2.appendChild(col4);
    row2.appendChild(col5);
    row2.appendChild(col6);
    tableRow.appendChild(row2);

    content.appendChild(tableRow);
}

function createText(type, content){
    let t = document.createElement(type);
    t.innerHTML = content;
    return t;
}
function createRow(){
    let row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("container");
    row.classList.add("text-center");
    return row;
}
function createCol(size){
    let col = document.createElement("div");
    let param="";
    if(size==0){
        param = "col-" + size;
    }else{
        param = "col";
    }
    
    col.classList.add(param);
    col.classList.add("text-center");
    return col;
}
/* Visualización inicial del boton del carrito */
let imgCarro = document.getElementById("btnCarro");
imgCarro.src = "media/carro.png";
imgCarro.alt = "Logotipo del carro de compras";
imgCarro.width = 40;
imgCarro.height = 40;
imgCarro.textContent = "0 items"
imgCarro.onclick = setCart;

/* Corrección tamaño footer */

let foot = document.getElementById("footerText");
foot.style.fontSize = "small";