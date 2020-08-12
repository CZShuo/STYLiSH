const setNewProduct = (obj, type) => {
    if (document.getElementById('current-product')) {
        document.getElementById('current-product').removeAttribute('id');
    }
    if (!obj.id) {
        obj.id = 'current-product';
    }

    getProducts(type);
}

const colorBoxes = (colors) => {
    var prodColors = document.createElement('div');
    prodColors.className = "product-colors";

    colors.map(color => {
        let prodColor = document.createElement('div');
        prodColor.className = "product-color";
        prodColor.style.backgroundColor = `#${color.code}`;
        prodColors.appendChild(prodColor);
    })
    return prodColors;
}

const createProduct = (data) => {
    data.map(product => {
        let {
            main_image
        } = product;
        let {
            title
        } = product;
        let {
            price
        } = product;
        let {
            colors
        } = product;
        let p_id = product.id;

        let prodDiv = document.createElement('div');
        prodDiv.className = "product";

        let prodImg = document.createElement('img');
        prodImg.className = "product-pic";
        prodImg.src = main_image;
        prodImg.key = p_id;
        prodImg.style.cursor = "pointer";
        prodImg.addEventListener('click', e => {
            hrefProduct(e.target.key);
        });

        let prodColors = colorBoxes(colors);

        let prodTitle = document.createElement('p')
        prodTitle.className = "product-name";
        prodTitle.textContent = title;
        prodTitle.key = p_id;
        prodTitle.style.cursor = "pointer";
        prodTitle.addEventListener('click', e => {
            hrefProduct(e.target.key);
        });

        let prodPrice = document.createElement('p')
        prodPrice.className = "product-price";
        prodPrice.textContent = `NTD ${price}`;

        prodDiv.appendChild(prodImg);
        prodDiv.appendChild(prodColors);
        prodDiv.appendChild(prodTitle);
        prodDiv.appendChild(prodPrice);
        document.getElementById("main-products").appendChild(prodDiv);
    })
}

const getProducts = (type) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const {
                data
            } = JSON.parse(this.responseText);
            document.getElementById('main-products').innerHTML = '';
            createProduct(data);

            if (JSON.parse(this.responseText).next_paging) {
                setPaging(JSON.parse(this.responseText).next_paging);
                loaded = false;
            }

            preLoaded = true;
        }
    }
    requrl = url + type;
    xhr.open('GET', requrl, true);
    xhr.send();
}

const bodyOnload = () => {
    loadSlide();
    if (window.location.search) {
        if (window.location.search.slice(1, 5) == 'type') {
            type = window.location.search.slice(6);
            if (type == 'all') {
                getProducts(type);
                cartOnload();
            } else {
                let types = document.querySelectorAll('.product-type');
                for (let i = 0; i < type.length; i++) {
                    if (types[i].getAttribute('key') == type) {
                        setNewProduct(types[i], type);
                        cartOnload();
                        break;
                    }
                }
            }
        } else if (window.location.search.slice(1, 8) == 'keyword') {
            let keyword = window.location.search.slice(9);
            searchInput.value = decodeURIComponent(keyword);
            mobileSearchInput.value = decodeURIComponent(keyword);
            searchProducts(keyword);
            cartOnload();
        }
    } else {
        getProducts(type);
        cartOnload();
    }
}

//Scroll listener
let paging = 0;

const setPaging = (page) => {
    paging = page;
}
let preLoaded = false;
let loaded = true;

let body = document.querySelector('body');
window.addEventListener('scroll', () => {
    if (window.pageYOffset + window.innerHeight >= Math.floor(body.clientHeight) && preLoaded === true && loaded === false) {
        if (paging !== 0) {
            loaded = true;
            getPagingProducts(paging);
        }
    }
})

//Request new page
const getPagingProducts = (page) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const {
                data
            } = JSON.parse(this.responseText);

            createProduct(data);

            if (JSON.parse(this.responseText).next_paging) {
                setPaging(JSON.parse(this.responseText).next_paging);
                loaded = false;
            } else {
                setPaging(0);
                loaded = true;
            }

        }
    }
    xhr.open('GET', `${requrl}?paging=${page}`, true);
    xhr.send();
}