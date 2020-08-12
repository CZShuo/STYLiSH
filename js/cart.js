const clearCart = () => {
    localStorage.removeItem('cart');
    cartOnload();
}

const orderRender = () => {
    if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let orderHtml = document.getElementById('orders');
        orderHtml.innerHTML = '';

        let title = document.createElement('div');
        title.id = 'cart-title';
        let divA = document.createElement('div');
        divA.id = 'cart-title-name';
        divA.textContent = '購物車';
        title.appendChild(divA);
        divA = document.createElement('div');
        divA.id = 'web-title';
        let divB = document.createElement('div');
        divB.textContent = '數量';
        divA.appendChild(divB);
        divB = document.createElement('div');
        divB.textContent = '單價';
        divA.appendChild(divB);
        divB = document.createElement('div');
        divB.textContent = '小計';
        divA.appendChild(divB);
        title.appendChild(divA);
        orderHtml.appendChild(title);

        cart.forEach(item => {
            let order = document.createElement('div');
            order.className = 'order';

            let firstLevel = document.createElement('div');
            firstLevel.className = 'order-image';
            let secondLevel = document.createElement('img');
            secondLevel.src = item.url;
            firstLevel.appendChild(secondLevel);
            order.appendChild(firstLevel);

            firstLevel = document.createElement('div');
            firstLevel.className = 'order-detail';
            secondLevel = document.createElement('div');
            secondLevel.className = 'order-name';
            secondLevel.textContent = item.name;
            firstLevel.appendChild(secondLevel);

            secondLevel = document.createElement('div');
            secondLevel.className = 'order-id';
            secondLevel.textContent = item.id;
            firstLevel.appendChild(secondLevel);

            secondLevel = document.createElement('div');
            secondLevel.className = 'order-color';
            secondLevel.textContent = `顏色 ｜ ${item.colorName}`;
            firstLevel.appendChild(secondLevel);

            secondLevel = document.createElement('div');
            secondLevel.className = 'order-size';
            secondLevel.textContent = `尺寸 ｜ ${item.size}`;
            firstLevel.appendChild(secondLevel);
            order.appendChild(firstLevel);

            firstLevel = document.createElement('div');
            firstLevel.className = 'order-delete';
            firstLevel.onclick = deleteCart;
            firstLevel.key = {
                id: item.id,
                color: item.color,
                size: item.size
            };
            order.appendChild(firstLevel);

            firstLevel = document.createElement('div');
            firstLevel.className = 'order-prices';
            secondLevel = document.createElement('div');
            secondLevel.className = 'order-counts';
            let thirdLevel = document.createElement('div');
            thirdLevel.className = 'mobile-title';
            thirdLevel.textContent = '數量';
            secondLevel.appendChild(thirdLevel);

            thirdLevel = document.createElement('form');
            let forthLevel = document.createElement('select');
            forthLevel.onchange = changeQty;
            forthLevel.key = {
                id: item.id,
                color: item.color,
                size: item.size
            };
            for (let i = 1; i <= item.stock; i++) {
                let fifthLevel = document.createElement('option');
                fifthLevel.value = `${i}`;
                fifthLevel.textContent = i;
                if (i === item.qty) {
                    fifthLevel.selected = true;
                }
                forthLevel.appendChild(fifthLevel);
            }
            thirdLevel.appendChild(forthLevel);
            secondLevel.appendChild(thirdLevel);
            firstLevel.appendChild(secondLevel);

            secondLevel = document.createElement('div');
            secondLevel.className = 'order-counts';
            thirdLevel = document.createElement('div');
            thirdLevel.className = 'mobile-title';
            thirdLevel.textContent = '單價';
            secondLevel.appendChild(thirdLevel);
            thirdLevel = document.createElement('div');
            thirdLevel.className = 'single-price';
            thirdLevel.textContent = item.price;
            secondLevel.appendChild(thirdLevel);
            firstLevel.appendChild(secondLevel);

            secondLevel = document.createElement('div');
            secondLevel.className = 'order-counts';
            thirdLevel = document.createElement('div');
            thirdLevel.className = 'mobile-title';
            thirdLevel.textContent = '小計';
            secondLevel.appendChild(thirdLevel);
            thirdLevel = document.createElement('div');
            thirdLevel.className = 'total-price';
            thirdLevel.key = {
                id: item.id,
                color: item.color,
                size: item.size
            };
            thirdLevel.textContent = item.price * item.qty;
            secondLevel.appendChild(thirdLevel);
            firstLevel.appendChild(secondLevel);

            secondLevel = document.createElement('div');
            secondLevel.className = 'web-order-delete';
            thirdLevel = document.createElement('div');
            thirdLevel.onclick = deleteCart;
            thirdLevel.key = {
                id: item.id,
                color: item.color,
                size: item.size
            };
            secondLevel.appendChild(thirdLevel);
            firstLevel.appendChild(secondLevel);
            order.appendChild(firstLevel);

            orderHtml.appendChild(order);
        })
    } else {
        let orderHtml = document.getElementById('orders');
        orderHtml.innerHTML = '';

        let title = document.createElement('div');
        title.id = 'cart-title';
        let divA = document.createElement('div');
        divA.id = 'cart-title-name';
        divA.textContent = '購物車';
        title.appendChild(divA);
        divA = document.createElement('div');
        divA.id = 'web-title';
        let divB = document.createElement('div');
        divB.textContent = '數量';
        divA.appendChild(divB);
        divB = document.createElement('div');
        divB.textContent = '單價';
        divA.appendChild(divB);
        divB = document.createElement('div');
        divB.textContent = '小計';
        divA.appendChild(divB);
        title.appendChild(divA);
        orderHtml.appendChild(title);

        let emptyCart = document.createElement('div');
        emptyCart.textContent = '購物車為空，快去選購商品吧！';
        emptyCart.id='cart-empty';
        orderHtml.appendChild(emptyCart);
    }
    countPrice();
}

const countPrice = () => {
    if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let sum = 0;
        cart.forEach(item => {
            sum += (item.qty * item.price);
        })
        let price = document.getElementById('total-price');
        price.textContent = `${sum} NTD`;
        let priceShip = document.getElementById('price-ship');
        priceShip.textContent = `${sum+100} NTD`;
    }
}

const changeQty = (e) => {
    if (localStorage.getItem('cart')) {
        let target = e.target.key;
        let cart = JSON.parse(localStorage.getItem('cart'));
        let price = 0;
        cart.forEach(item => {
            if (item.id == target.id && item.color == target.color && item.size == target.size) {
                item.qty = e.target.options.selectedIndex + 1;
                price = item.price;
            }
        })
        let totalPrice = document.querySelectorAll('.total-price');
        for (let i = 0; i < totalPrice.length; i++) {
            if (totalPrice[i].key.id == target.id && totalPrice[i].key.color == target.color && totalPrice[i].key.size == target.size) {
                totalPrice[i].textContent = `${(e.target.options.selectedIndex+1) * price}`;
                break;
            }
        }
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(cart));
        cartOnload();
        countPrice();
    }
}

const deleteCart = (e) => {
    if (localStorage.getItem('cart')) {
        let target = e.target.key;
        let cart = JSON.parse(localStorage.getItem('cart'));
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == target.id && cart[i].color == target.color && cart[i].size == target.size) {
                let temp = cart.splice(i, 1);
                break;
            }
        }
        console.log(cart);
        localStorage.removeItem('cart');
        if (cart.length>0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        alert('Removed!')
        cartOnload();
        orderRender();
    }
}