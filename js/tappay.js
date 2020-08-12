TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox');

let fields = {
    number: {
        // css selector
        element: document.getElementById('card-number'),
        placeholder: '**** **** **** ****'
    },
    expirationDate: {
        // DOM object
        element: document.getElementById('card-expiration-date'),
        placeholder: 'MM / YY'
    },
    ccv: {
        element: document.getElementById('card-ccv'),
        placeholder: 'ccv'
    }
}

TPDirect.card.setup({
    fields: fields,
    styles: {
        //Style all elements 
        'input': {
            'color': 'gray'
        },
        // Styling ccv field
        'input.ccv': {
            // 'font-size': '16px'
        },
        // Styling expiration-date field
        'input.expiration-date': {
            // 'font-size': '16px'
        },
        // Styling card-number field
        'input.card-number': {
            // 'font-size': '16px'
        },
        // style focus state
        ':focus': {
            // 'color': 'black'
        },
        // style valid state
        '.valid': {
            'color': 'green'
        },
        // style invalid state
        '.invalid': {
            'color': 'red'
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        // '@media screen and (max-width: 400px)': {
        //     'input': {
        //         'color': 'orange'
        //     }
        // }
    }
})


let submitButton = document.getElementById('pay-button');

TPDirect.card.onUpdate(function (update) {
    // console.log(update);
    // update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    if (update.canGetPrime) {
        // Enable submit Button to get prime.
        // submitButton.removeAttribute('disabled');
    } else {
        // Disable submit Button to get prime.
        // submitButton.setAttribute('disabled', true);
    }

    // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
    if (update.cardType === 'visa') {
        // Handle card type visa.
    }

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        // setNumberFormGroupToError('#card-number');
    } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess('#card-number');
    } else {
        // setNumberFormGroupToNormal('#card-number');
    }

    if (update.status.expiry === 2) {
        // setNumberFormGroupToError('#card-expiration-date');
    } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess('#card-expiration-date');
    } else {
        // setNumberFormGroupToNormal('#card-expiration-date');
    }

    if (update.status.cvc === 2) {
        // setNumberFormGroupToError('#card-ccv');
    } else if (update.status.cvc === 0) {
        // setNumberFormGroupToSuccess('#card-ccv');
    } else {
        // setNumberFormGroupToNormal('#card-ccv');
    }
})


// call TPDirect.card.getPrime when user submit form to get tappay prime
// $('form').on('submit', onSubmit)

function onSubmit(event) {
    document.getElementById('pay-button').textContent='處理中...';
    if (checkEmpty() && localStorage.getItem('cart')) {
        event.preventDefault();
        // 取得 TapPay Fields 的 status
        const tappayStatus = TPDirect.card.getTappayFieldsStatus();
        // 確認是否可以 getPrime
        if (tappayStatus.canGetPrime === false) {
            alert('Credit Card Error!');
            document.getElementById('pay-button').textContent='確認付款';
            return;
        }
        // Get prime
        TPDirect.card.getPrime((result) => {
            if (result.status !== 0) {
                alert('Credit Card Error: ' + result.msg);
                document.getElementById('pay-button').textContent='確認付款';
                return;
            } else {
                //alert('Success! Prime: ' + result.card.prime);
                sendCheckOut(result.card.prime);
            }
            // send prime to your server, to pay with Pay by Prime API .
            // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
        })
    }
    else if(!localStorage.getItem('cart')){
        alert('Cart is empty!');
        document.getElementById('pay-button').textContent='確認付款';
    }
}

// TPDirect.card.getPrime(onSubmit);

submitButton.addEventListener('click', onSubmit);


const sendCheckOut = (prime) => {
    let all = {};
    all.prime = prime;
    let order = {};
    order.shipping = 'delivery';
    order.payment = document.getElementById('ship-payment').options[document.getElementById('ship-payment').options.selectedIndex].value;
    order.subtotal = Number(document.getElementById('total-price').textContent.replace(' NTD', ''));
    order.freight = 100;
    order.total = order.subtotal + order.freight;
    let recipient = {};
    recipient.name = document.getElementById('customer-name').value;
    recipient.phone = document.getElementById('customer-phone').value;
    recipient.email = document.getElementById('customer-email').value;
    recipient.address = document.getElementById('customer-address').value;
    recipient.time = document.querySelector('input[type=radio][checked]').value;
    order.recipient = recipient;
    let list = [];
    if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.forEach(item => {
            let i = {};
            i.id = item.id;
            i.name = item.name;
            i.price = item.price;
            i.color = {
                code: item.color,
                name: item.colorName
            };
            i.size = item.size;
            i.qty = item.qty;
            list.push(i);
        })
    }
    order.list = list;
    all.order = order;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            localStorage.removeItem('cart');
            localStorage.setItem('orderNum', xhr.responseText);
            window.location.href = `./thankyou.html`;
        }
    }

    xhr.open('POST', urlHead + '/order/checkout', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if(localStorage.getItem('response')){
        let response = JSON.parse(localStorage.getItem('response'));
        xhr.setRequestHeader('Authorization', 'Bearer ' + response.authResponse.accessToken);
    }
    xhr.send(JSON.stringify(all));
}

const checkEmpty = () => {
    if (!document.getElementById('customer-name').value) {
        alert('Please enter your name!');
        document.getElementById('pay-button').textContent='確認付款';
        return false;
    } else if (!document.getElementById('customer-phone').value) {
        alert('Please enter your phone number!');
        document.getElementById('pay-button').textContent='確認付款';
        return false;
    } else if (!document.getElementById('customer-email').value) {
        alert('Please enter your email address!');
        document.getElementById('pay-button').textContent='確認付款';
        return false;
    } else if (!document.getElementById('customer-address').value) {
        alert('Please enter your address!');
        document.getElementById('pay-button').textContent='確認付款';
        return false;
    }
    return true;
}