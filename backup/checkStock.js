// const checkStock = (data) => {
//     let selectedColor = document.getElementById('pro-current-color');
//     let selectedSize = document.getElementById('pro-current-size');

//     let currentStock = 0;
//     for (let i = 0; i < data.variants.length; i++) {
//         if (selectedColor.colorCode == data.variants[i].color_code && selectedSize.textContent == data.variants[i].size) {
//             currentStock = data.variants[i].stock;
//         }
//     }
//     return currentStock;
// }

// const setCurrentColor = e => {
//     let currentColor;
//     if (document.getElementById('pro-current-color')) {
//         currentColor = document.getElementById('pro-current-color');
//         currentColor.removeAttribute('id');
//     }
//     e.target.id = 'pro-current-color';

//     if (document.getElementById('pro-current-size')) {
//         setStock();
//     }else{
//         document.getElementById('pro-button').textContent='請選擇尺寸';
//     }
// }
// const setCurrentSize = e => {
//     let currentSize;
//     if (document.getElementById('pro-current-size')) {
//         currentSize = document.getElementById('pro-current-size');
//         currentSize.removeAttribute('id');
//     }
//     e.target.id = 'pro-current-size';

//     if (document.getElementById('pro-current-color')) {
//         setStock();
//     }else{
//         document.getElementById('pro-button').textContent='請選擇顏色';
//     }
// }

// const setStock = () => {
//     let proNumber =document.getElementById('pro-number');
//     let currentStock = document.getElementById('pro-stock');
//     let proAdd= document.getElementById('pro-add');
//     let proMinus= document.getElementById('pro-minus');
//     let proButton= document.getElementById('pro-button');
//     currentStock.textContent = checkStock(dataPro);
//     if (checkStock(dataPro) > 0) {
//         proNumber.textContent='1';
//         proNumber.style.color='#000';
//         currentStock.style.color = '#000';
//         proMinus.style.color='#000';
//         proAdd.style.color='#000';
//         proButton.style.backgroundColor='#000';
//         proButton.textContent='加入購物車';
//         if(checkStock(dataPro)==1){
//             proAdd.style.color='#ececec';
//         }
//     } else {
//         currentStock.style.color = '#ececec';
//         proNumber.textContent='0';
//         proNumber.style.color='#ececec';
//         proMinus.style.color='#ececec';
//         proAdd.style.color='#ececec';
//         proButton.style.backgroundColor='#ececec';
//         proButton.textContent='已售完';
//     }
// }

// const increment = e => {
//     let currentStock = Number(document.getElementById('pro-stock').textContent);
//     let currentNum = Number(document.getElementById('pro-number').textContent);

//     if(currentNum<currentStock){
//         document.getElementById('pro-number').textContent=currentNum+1;
//         currentNum+=1;
//         document.getElementById('pro-number').style.color='#000';
//         document.getElementById('pro-minus').style.color='#000';
//         document.getElementById('pro-button').style.backgroundColor='#000';
//     }
//     if(currentNum==currentStock){
//         e.target.style.color='#ececec';
//     }
// }
// const decrement = e => {
//     let currentNum = Number(document.getElementById('pro-number').textContent);

//     if(currentNum>0){
//         document.getElementById('pro-number').textContent=currentNum-1;
//         currentNum-=1;
//         document.getElementById('pro-add').style.color='#000';
//     }
//     if(currentNum==0){
//         document.getElementById('pro-number').style.color='#ececec';
//         e.target.style.color='#ececec';
//         document.getElementById('pro-button').style.backgroundColor='#ececec';
//     }
// }