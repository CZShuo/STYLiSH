
//Search
// const searchProducts = (keyword) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             const {
//                 data
//             } = JSON.parse(this.responseText);
//             paging = 0;
//             document.getElementById('main-products').innerHTML = '';

//             if (data.length !== 0) {
//                 createProduct(data);
//             } else {
//                 document.getElementById('main-products').innerHTML = '<p style="margin:50px">Nothing Match</p>';
//             }

//             if (JSON.parse(this.responseText).next_paging) {
//                 setPaging(JSON.parse(this.responseText).next_paging);
//                 loaded = false;
//             }
//             preLoaded = true;
//         }
//     }
//     requrl = `${url}search?keyword=${keyword}`;
//     xhr.open('GET', requrl, true);
//     xhr.send();
// }



//Get search input
// search.addEventListener('click', () => {
//     if (searchInput.value) {
//         searchProducts(searchInput.value);
//     }
// });
// searchInput.addEventListener('keydown', e => {
//     if (e.keyCode === 13 && searchInput.value) {
//         searchProducts(searchInput.value);
//     }
// })


// //Scroll listener
// let paging = 0;

// const setPaging = (page) => {
//     paging = page;
// }
// let preLoaded = false;
// let loaded = true;

// let body = document.querySelector('body');
// window.addEventListener('scroll', () => {
//     if (window.pageYOffset + window.innerHeight >= Math.floor(body.clientHeight) && preLoaded === true && loaded === false) {
//         if (paging !== 0) {
//             loaded = true;
//             getPagingProducts(paging);
//         }
//     }
// })

// //Request new page
// const getPagingProducts = (page) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             const {
//                 data
//             } = JSON.parse(this.responseText);

//             createProduct(data);

//             if (JSON.parse(this.responseText).next_paging) {
//                 setPaging(JSON.parse(this.responseText).next_paging);
//                 loaded = false;
//             } else {
//                 setPaging(0);
//                 loaded = true;
//             }

//         }
//     }
//     xhr.open('GET', `${requrl}?paging=${page}`, true);
//     xhr.send();
// }