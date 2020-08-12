let host = 'https://api.appworks-school.tw';
let urlHead = 'https://api.appworks-school.tw/api/1.0';
let url = urlHead + '/products/';

let requrl = '';

let type = 'all';

//index

let mobileSearchOpen = false;
let mobileSearch = document.getElementById('mobile-search');
let mobileSearchInput = document.getElementById('mobile-search-input');

//mobileEvent


let search = document.getElementById('search');
let searchInput = document.getElementById('search-input');

//search

//=======================================================================//

const hrefProduct = (p_id) => {
    window.location.href = `./product.html?id=${p_id}`;
}

const hrefIndex = (type) => {
    window.location.href = `./index.html?type=${type}`;
}

const hrefSearch = (keyword) => {
    window.location.href = `./index.html?keyword=${keyword}`;
}

const hrefCart = () => {
    window.location.href = `./cart.html`;
}

const hrefMember = () => {
    window.location.href = `./profile.html`;
}

//=======================================================================//

const searchProducts = (keyword) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const {
                data
            } = JSON.parse(this.responseText);
            paging = 0;
            document.getElementById('main-products').innerHTML = '';

            if (data.length !== 0) {
                createProduct(data);
            } else {
                document.getElementById('main-products').innerHTML = '<p style="margin:50px">Nothing Match</p>';
            }

            if (JSON.parse(this.responseText).next_paging) {
                setPaging(JSON.parse(this.responseText).next_paging);
                loaded = false;
            }
            preLoaded = true;
        }
    }
    requrl = `${url}search?keyword=${keyword}`;
    xhr.open('GET', requrl, true);
    xhr.send();
}


search.addEventListener('click', () => {
    if (searchInput.value) {
        hrefSearch(search.value);
    }
});
searchInput.addEventListener('keydown', e => {
    if (e.keyCode === 13 && searchInput.value) {
        hrefSearch(searchInput.value);
    }
})

mobileSearch.addEventListener('click', () => {

    if (mobileSearchOpen) {
        if (mobileSearchInput.value) {
            searchProducts(mobileSearchInput.value);
        }
        mobileSearchInput.style.display = 'none';
        mobileSearchOpen = false;
    } else {
        mobileSearchInput.style.display = 'block';
        mobileSearchOpen = true;
    }
})

mobileSearchInput.addEventListener('keydown', e => {
    if (e.keyCode === 13 && mobileSearchInput.value) {
        searchProducts(mobileSearchInput.value);
    }
})


//=======================================================================//

const cartOnload = () => {
    let totalItems = 0;
    if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.forEach(item => {
            totalItems += Number(item.qty);
        })
    }
    if (totalItems == 0) {
        document.getElementById('in-cart').style.display = 'none';
        document.getElementById('mobile-in-cart').style.display = 'none';
    } else {
        document.getElementById('in-cart').style.display = 'block';
        document.getElementById('mobile-in-cart').style.display = 'block';
        document.getElementById('in-cart').textContent = totalItems;
        document.getElementById('mobile-in-cart').textContent = totalItems;
    }
    memberOnload();
}

const memberOnload = () => {
    if(localStorage.getItem('profile')){
        let profile = JSON.parse(localStorage.getItem('profile'));
        let mobileMember = document.getElementById('mobile-member-image');
        let member = document.getElementById('member');
        member.style.backgroundImage = `url(${profile.picture.data.url})`;
        member.style.backgroundSize = 'cover';
        mobileMember.src=profile.picture.data.url;
        mobileMember.style.borderRadius = '50%';
        let mobileMemberName = document.getElementById('mobile-member-name');
        mobileMemberName.textContent = profile.name;
    }
    else{
        let member = document.getElementById('member');
        member.style.backgroundImage = `url('../images/member.png')`;
        member.style.backgroundSize = 'auto';
        let mobileMember = document.getElementById('mobile-member-image');
        mobileMember.src="../images/member-white.png";
        mobileMember.style.borderRadius = '0';
        let mobileMemberName = document.getElementById('mobile-member-name');
        mobileMemberName.textContent = '會員';
    }
}