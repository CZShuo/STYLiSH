let dataPro;
const getProductPage = (p_id) => {
    let url = 'https://api.appworks-school.tw/api/1.0/products/';
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const {
                data
            } = JSON.parse(this.responseText);
            dataPro = data;
            let main = document.getElementById('main');

            let divA = document.createElement('div');
            divA.id = 'pro-image';
            let img = document.createElement('img');
            img.id = "pro-img";
            img.src = data.main_image;
            divA.appendChild(img);
            main.appendChild(divA);

            let divDescription = document.createElement('div');
            divDescription.id = "pro-description";


            divA = document.createElement('div');
            divA.id = "pro-title";

            let divS = document.createElement('div');
            divS.id = "pro-name";
            divS.textContent = data.title;
            divA.appendChild(divS);


            divS = document.createElement('div');
            divS.id = "pro-id";
            divS.textContent = data.id;
            divA.appendChild(divS);


            divS = document.createElement('div');
            divS.id = "pro-price";
            divS.textContent = `TWD ${data.price}`;
            divA.appendChild(divS);


            divDescription.appendChild(divA);


            divA = document.createElement('div');
            divA.id = "pro-buy";

            divS = document.createElement('div');
            divS.className = "pro-colsiz";

            let divXS = document.createElement("div");
            divXS.className = "pro-tag";
            divXS.textContent = "顏色";
            divS.appendChild(divXS);


            data.colors.forEach(color => {
                divXS = document.createElement("div");
                divXS.className = "pro-color";
                divXS.colorCode = color.code;
                divXS.colorName = color.name;
                divXS.style.backgroundColor = `#${color.code}`;
                divXS.onclick = setCurrentColor;
                divXS.style.cursor = "pointer";
                divS.appendChild(divXS);
            })
            divA.appendChild(divS);


            divS = document.createElement('div');
            divS.className = "pro-colsiz";

            divXS = document.createElement("div");
            divXS.className = "pro-tag";
            divXS.textContent = "尺寸";
            divS.appendChild(divXS);


            data.sizes.forEach(size => {
                divXS = document.createElement("div");
                divXS.className = "pro-size";
                divXS.textContent = size;
                divXS.onclick = setCurrentSize;
                divXS.style.cursor = "pointer";
                divXS.style.userSelect = "none";
                divS.appendChild(divXS);
            })
            divA.appendChild(divS);


            divS = document.createElement('div');
            divS.className = "pro-colsiz";

            divXS = document.createElement("div");
            divXS.className = "pro-tag";
            divXS.textContent = "庫存";
            divS.appendChild(divXS);

            divXS = document.createElement("div");
            divXS.id = "pro-stock";
            divXS.textContent = '-';
            divS.appendChild(divXS);
            divA.appendChild(divS);


            divS = document.createElement('div');
            divS.id = "pro-count";

            divXS = document.createElement("div");
            divXS.className = "pro-add-minus";
            divXS.id="pro-minus";
            divXS.textContent = '-';
            divXS.onclick = decrement;
            divS.appendChild(divXS);


            divXS = document.createElement("div");
            divXS.id = "pro-number";
            divXS.textContent = '0';
            divS.appendChild(divXS);


            divXS = document.createElement("div");
            divXS.className = "pro-add-minus";
            divXS.id= "pro-add";
            divXS.textContent = '+';
            divXS.onclick = increment;
            divS.appendChild(divXS);


            divA.appendChild(divS);


            divS = document.createElement('div');
            divS.id = "pro-button";
            divS.textContent = "加入購物車";
            divS.onclick = cartAdd;
            divA.appendChild(divS);

            divDescription.appendChild(divA);


            divA = document.createElement('div');
            divA.id = "pro-note";
            divA.innerHTML = `*${data.note}<br><br>
                材質：${data.texture}<br>
                ${data.description.replace(/\r\n/,'<br>')}<br><br>
                清洗：${data.wash}<br>
                產地：${data.place}`

            divDescription.appendChild(divA);
            main.appendChild(divDescription);

            divA = document.createElement('div');
            divA.id = "pro-story";


            divS = document.createElement('div');
            divS.id = "pro-story-top";
            divXS = document.createElement("div");
            divXS.id = "pro-story-title";
            divXS.textContent = "細部說明";
            divS.appendChild(divXS);
            divXS = document.createElement("div");
            divXS.id = "pro-story-title-hr";
            divS.appendChild(divXS);
            divA.appendChild(divS);


            divS = document.createElement('div');
            divS.id = "pro-story-content";
            divS.textContent = data.story;
            divA.appendChild(divS);


            data.images.forEach(url => {
                let imgs = document.createElement('img');
                imgs.className = "pro-story-image";
                imgs.src = url;
                divA.appendChild(imgs);
            })

            main.appendChild(divA);
        }
    }
    xhr.open('GET', url + `details?id=${p_id}`, true);
    xhr.send();
}

const checkStock = (data) => {
    let selectedColor = document.getElementById('pro-current-color');
    let selectedSize = document.getElementById('pro-current-size');

    let currentStock = 0;
    for (let i = 0; i < data.variants.length; i++) {
        if (selectedColor.colorCode == data.variants[i].color_code && selectedSize.textContent == data.variants[i].size) {
            currentStock = data.variants[i].stock;
        }
    }
    return currentStock;
}

const setCurrentColor = e => {
    let currentColor;
    if (document.getElementById('pro-current-color')) {
        currentColor = document.getElementById('pro-current-color');
        currentColor.removeAttribute('id');
    }
    e.target.id = 'pro-current-color';

    if (document.getElementById('pro-current-size')) {
        setStock();
    }else{
        document.getElementById('pro-button').textContent='請選擇尺寸';
    }
}
const setCurrentSize = e => {
    let currentSize;
    if (document.getElementById('pro-current-size')) {
        currentSize = document.getElementById('pro-current-size');
        currentSize.removeAttribute('id');
    }
    e.target.id = 'pro-current-size';

    if (document.getElementById('pro-current-color')) {
        setStock();
    }else{
        document.getElementById('pro-button').textContent='請選擇顏色';
    }
}

const setStock = () => {
    let proNumber =document.getElementById('pro-number');
    let currentStock = document.getElementById('pro-stock');
    let proAdd= document.getElementById('pro-add');
    let proMinus= document.getElementById('pro-minus');
    let proButton= document.getElementById('pro-button');
    currentStock.textContent = checkStock(dataPro);
    if (checkStock(dataPro) > 0) {
        proNumber.textContent='1';
        proNumber.style.color='#000';
        currentStock.style.color = '#000';
        proMinus.style.color='#000';
        proAdd.style.color='#000';
        proButton.style.backgroundColor='#000';
        proButton.textContent='加入購物車';
        if(checkStock(dataPro)==1){
            proAdd.style.color='#ececec';
        }
    } else {
        currentStock.style.color = '#ececec';
        proNumber.textContent='0';
        proNumber.style.color='#ececec';
        proMinus.style.color='#ececec';
        proAdd.style.color='#ececec';
        proButton.style.backgroundColor='#ececec';
        proButton.textContent='已售完';
    }
}

const increment = e => {
    let currentStock = Number(document.getElementById('pro-stock').textContent);
    let currentNum = Number(document.getElementById('pro-number').textContent);

    if(currentNum<currentStock){
        document.getElementById('pro-number').textContent=currentNum+1;
        currentNum+=1;
        document.getElementById('pro-number').style.color='#000';
        document.getElementById('pro-minus').style.color='#000';
        document.getElementById('pro-button').style.backgroundColor='#000';
    }
    if(currentNum==currentStock){
        e.target.style.color='#ececec';
    }
}
const decrement = e => {
    let currentNum = Number(document.getElementById('pro-number').textContent);

    if(currentNum>0){
        document.getElementById('pro-number').textContent=currentNum-1;
        currentNum-=1;
        document.getElementById('pro-add').style.color='#000';
    }
    if(currentNum==0){
        document.getElementById('pro-number').style.color='#ececec';
        e.target.style.color='#ececec';
        document.getElementById('pro-button').style.backgroundColor='#ececec';
    }
}

const cartAdd = () => {
    if (document.getElementById('pro-number').textContent > 0) {
        let cart = [];
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            localStorage.removeItem('cart');
        }

        let exist = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === document.getElementById('pro-id').textContent &&
                cart[i].color === document.getElementById('pro-current-color').colorCode &&
                cart[i].size === document.getElementById('pro-current-size').textContent) {
                if (cart[i].qty + Number(document.getElementById('pro-number').textContent) > Number(document.getElementById('pro-stock').textContent)) {
                    window.alert(`Tooooo much~~~
                    Already have: ${cart[i].qty} in cart. You can add ${Number(document.getElementById('pro-stock').textContent)-cart[i].qty} more.`);
                    exist = true;
                } else {
                    cart[i].qty += Number(document.getElementById('pro-number').textContent);
                    exist = true;
                }
            }
        }

        if (!exist) {
            let item = {};
            item.id = document.getElementById('pro-id').textContent;
            item.name = document.getElementById('pro-name').textContent;
            item.price = Number(document.getElementById('pro-price').textContent.slice(4));
            item.color = document.getElementById('pro-current-color').colorCode;
            item.colorName = document.getElementById('pro-current-color').colorName;
            item.size = document.getElementById('pro-current-size').textContent;
            item.qty = Number(document.getElementById('pro-number').textContent);
            item.url = document.getElementById('pro-img').src;
            item.stock = Number(document.getElementById('pro-stock').textContent);

            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('已加入購物車！')
        cartOnload();
    }
}