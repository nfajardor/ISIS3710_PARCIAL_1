const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let categorias = [];
let cart = [];
let productos = [];
let totalPrice = 0;

/* Se encarga de guardar en cateforias la lista de todas las categorias de productos. Guarda en productos todos los productos */
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
        let prod = cat.products;
        for(let p of prod){
            productos.push(p);
        }
        
    }
});


/* Muestra el contenido de la categoría seleccionada */
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
 //       col.classList.add("col-3");
        let card = document.createElement("div");
        card.style.height = "25rem";
        card.style.width = "10rem";
        card.classList.add("card");
        let imgCard = document.createElement("img");
        imgCard.src = p.image;
        imgCard.height = 100;
        let bod = document.createElement("div");
        bod.classList.add("card-body");
        bod.classList.add("container");
        bod.classList.add("text-left");
        let pname = createText("p", '<strong>'+p.name+'</strong>')
        pname.classList.add("cardTitle");
        bod.appendChild(pname);
        let pdesc = createText("p", p.description);
        pdesc.classList.add("cardDescription");
        bod.appendChild(pdesc);
        let price = p.price+"";
        let temp = price.split(".");
        if(temp.length<2){
            price = price+".00";
        }else{
            if(temp[1].split("").length<2){
                price = price+"0";
            }
        }
        let pprice = createText("p", '<strong>$'+price+'</strong>')
        pprice.classList.add("cardTitle");
        bod.appendChild(pprice);
        let btn = document.createElement("a");
        btn.classList.add("btn");
        btn.classList.add("btn-dark");
        btn.textContent = "Add to car";
        btn.id = p.name.replace(/\s+/g,'');
        btn.onclick = addToCart;

        bod.appendChild(btn);
        card.appendChild(imgCard);
        card.appendChild(bod);
        col.appendChild(card);
        row2.appendChild(col);
    }

    content.appendChild(row2);
}

/* Añadir un elemento al carrito de compra */
function addToCart(element){
    let elid = element.target.id;
    let car = document.getElementById("colCarro");
    let img = car.firstChild;
    car.innerHTML = '';
    car.appendChild(img);
    for(let p of productos){
        let ptemp = p.name.replace(/\s+/g,'');
        if(elid===ptemp){
            let esta = false;
            for(let c of cart){
                if(c[1]===p){
                    esta = true;
                    c[0]++;
                }
            }
            if(!esta){
                cart.push([1,p, p.price]);
            }
        }
    }
    let cantidadItems = 0;
    for(let c of cart){
        cantidadItems+=c[0];
    }

    let strNode = cantidadItems + " items";
    let node = document.createTextNode(strNode);
    car.appendChild(node);
}

/* Actualiza el costo total de los productos del carro */
function updateTotalPrice(){
    let price = 0;
    for(let c of cart){
        price+=c[0]*c[2];
    }
    totalPrice = price;
}

/* Desplegar el menú del carro de compra */
function setCart(){
    updateTotalPrice();
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

    let table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-striped");
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    let item = document.createElement("th");
    item.setAttribute("scope","col");
    let thnode1 = document.createTextNode("Item");
    item.appendChild(thnode1);
    tr.appendChild(item);

    let qty = document.createElement("th");
    qty.setAttribute("scope","col");
    let thnode2 = document.createTextNode("Qty");
    qty.appendChild(thnode2);
    tr.appendChild(qty);
    
    let desc = document.createElement("th");
    desc.setAttribute("scope","col");
    let thnode3 = document.createTextNode("Description");
    desc.appendChild(thnode3);
    tr.appendChild(desc);
    
    let uprice = document.createElement("th");
    uprice.setAttribute("scope","col");
    let thnode4 = document.createTextNode("Unit price");
    uprice.appendChild(thnode4);
    tr.appendChild(uprice);
    
    let amount = document.createElement("th");
    amount.setAttribute("scope","col");
    let thnode5 = document.createTextNode("Amount");
    amount.appendChild(thnode5);
    tr.appendChild(amount);
    
    let modify = document.createElement("th");
    modify.setAttribute("scope","col");
    let thnode6 = document.createTextNode("Modify");
    modify.appendChild(thnode6);
    tr.appendChild(modify);

    thead.appendChild(tr);
    table.appendChild(thead);

    let itid = 0;
    let tbody = document.createElement("tbody");
    
    for(let c of cart){
        
        if(c[0]>0){
            itid++;
            let trb = document.createElement("tr");

            let th = document.createElement("th");
            th.setAttribute("scope","row");
            let thnode = document.createTextNode(itid+"");
            th.appendChild(thnode);
            trb.appendChild(th);
    
            let td1 = document.createElement("td");
            let qtytxt = c[0]+"";
            let tdnode1 = document.createTextNode(qtytxt);
            td1.appendChild(tdnode1);
            trb.appendChild(td1);
    
            let td2 = document.createElement("td");
            let desctxt = c[1].name;
            let tdnode2 = document.createTextNode(desctxt);
            td2.appendChild(tdnode2);
            trb.appendChild(td2);
    
            let unitPrice = c[1].price;

            let td3 = document.createElement("td");
            let uptxt = unitPrice+"";
            let temp = uptxt.split(".");
            if(temp.length<2){
                uptxt = uptxt+".00";
            }else{
                if(temp[1].split("").length<2){
                    uptxt = uptxt+"0";
                }
            }
            let tdnode3 = document.createTextNode(uptxt);
            td3.appendChild(tdnode3);
            trb.appendChild(td3);
    
            let td4 = document.createElement("td");
            let amounttxt = unitPrice*c[0]+"";
            let temp2 = amounttxt.split(".");
            if(temp2.length<2){
                amounttxt = amounttxt+".00";
            }else{
                if(temp2[1].split("").length<2){
                    amounttxt = amounttxt+"0";
                }
            }
            let tdnode4 = document.createTextNode(amounttxt);
            td4.appendChild(tdnode4);
            trb.appendChild(td4);
    
            let prodName = c[1].name.replace(/\s+/g,'');
            let td5 = document.createElement("td");
            let btnrow = createRow();
            let btncolplus = createCol(6);
            let btncolminus = createCol(6);
            btncolplus.classList.add("btncol");
            btncolminus.classList.add("btncol");

            let btnplus = document.createElement("button");
            btnplus.classList.add("btn");
            btnplus.classList.add("btn-secondary");
            btnplus.classList.add("btn-sm");
            btnplus.id = prodName+"p";
            let pbtn = document.createTextNode("+");
            btnplus.appendChild(pbtn);
            btnplus.setAttribute("type","button");
            btnplus.onclick = modifyElementPlus;
            btncolplus.appendChild(btnplus);

            let btnminus = document.createElement("button");
            btnminus.classList.add("btn");
            btnminus.classList.add("btn-secondary");
            btnminus.classList.add("btn-sm");
            btnminus.id = prodName+"m";
            let mbtn = document.createTextNode("-");
            btnminus.appendChild(mbtn);
            btnminus.setAttribute("type","button");
            btnminus.onclick = modifyElementMinus;
            btncolminus.appendChild(btnminus);

            btnrow.appendChild(btncolplus);
            btnrow.appendChild(btncolminus);
            td5.appendChild(btnrow);
            trb.appendChild(td5);
    
    
            tbody.appendChild(trb);
        }
    }

    table.appendChild(tbody);
    tableRow.appendChild(table);
    let finalrow = createRow();
    let totalcol = createCol(11);
    let totPrice = totalPrice+"";
    let temp3 = totPrice.split(".");
    if(temp3.length<2){
        totPrice = totPrice+".00";
    }else{
        if(temp3[1].split("").length<2){
            totPrice = totPrice+"0";
        }
    }
    temp3 = totPrice.split(".");
    let pA = temp3[0];
    let pB = temp3[1].substring(0,2);
    totPrice = pA + "." + pB;
    let totaltxt = createText("p", '<strong>$'+totPrice+'</strong>');
    totaltxt.classList.add("totalPriceTxt");
    totalcol.appendChild(totaltxt);
    let btnscol = createCol(1);
    let btnsrow = createRow();
    let btncancelcol = createCol(6);
    let btnconfirmcol = createCol(6);

    let btncancel = document.createElement("button");
    btncancel.classList.add("btn");
    btncancel.classList.add("btn-danger");
    btncancel.classList.add("btn-sm");
    btncancel.classList.add("orderButtons");
    let btncancelnode = document.createTextNode("Cancel");
    btncancel.appendChild(btncancelnode);
    btncancel.setAttribute("type","button");
    btncancel.onclick = cancelOrder;
    btncancelcol.appendChild(btncancel);

    let btnconfirm = document.createElement("button");
    btnconfirm.classList.add("btn");
    btnconfirm.classList.add("btn-light");
    btnconfirm.classList.add("btn-sm");
    btnconfirm.classList.add("orderButtons");
    let btnconfirmnode = document.createTextNode("Confirm order");
    btnconfirm.appendChild(btnconfirmnode);
    btnconfirm.setAttribute("type","button");
    btnconfirm.onclick = confirmOrder;
    btnconfirmcol.appendChild(btnconfirm);
    
    btnscol.classList.add("btncol");
    btnconfirmcol.classList.add("btncol");
    btncancelcol.classList.add("btncol");

    finalrow.appendChild(totalcol);
    btnsrow.appendChild(btncancelcol);
    btnsrow.appendChild(btnconfirmcol);
    btnscol.appendChild(btnsrow);
    finalrow.appendChild(btnscol);
    content.appendChild(table);
    content.appendChild(finalrow);
}

function cancelOrder(){
    console.log("Cancel");
}
function confirmOrder(){

    console.log("Cancel");
}

function modifyElementPlus(btn){
    let btnid = btn.target.id.slice(0,-1);
    for(let c of cart){
        if(c[1].name.replace(/\s+/g,'')===btnid){
            c[0]++;
        }
    }
    setCart();
}

function modifyElementMinus(btn){
    let btnid = btn.target.id.slice(0,-1);
    for(let c of cart){
        if(c[1].name.replace(/\s+/g,'')===btnid){
            c[0]--;
        }
    }
    setCart();
}

/* Crea un elemento de texto de tipo type con el contenido html content */
function createText(type, content){
    let t = document.createElement(type);
    t.innerHTML = content;
    return t;
}

/* Crea una fila de bootstrap */
function createRow(){
    let row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("container");
    row.classList.add("text-center");
    return row;
}

/* Crea una columna de bootstrap de tamaño size */
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
let imgCarro = document.createElement("img");
imgCarro.src = "media/carro.png";
imgCarro.alt = "Logotipo del carro de compras";
imgCarro.width = 40;
imgCarro.height = 40;
imgCarro.textContent = "0 items"
imgCarro.onclick = setCart;

let colCarro = document.getElementById("colCarro");
colCarro.appendChild(imgCarro);
let node = document.createTextNode("0 items");
colCarro.appendChild(node);

/* Corrección tamaño footer */

let foot = document.getElementById("footerText");
foot.style.fontSize = "small";

setCart();