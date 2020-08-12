let coverPicDiv = document.getElementById('cover-pictures');
const loadSlide = () => {
    const coverPic = new XMLHttpRequest();
    coverPic.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const {
                data
            } = JSON.parse(this.responseText);

            data.map((slide) => {
                let div = document.createElement('div');
                div.className = 'cover-picture';
                div.key=slide.product_id;
                div.addEventListener('click', e=>{
                    hrefProduct(e.target.key);
                })
                div.style.backgroundImage = `url(${host + slide.picture})`;

                let story = slide.story;
                story = story.replace(/\u3002(\r\n)/,
                    '\u3002<br><span class="cover-text-from">');
                story = story.replace(/\r\n/g, '<br>');
                story += '</span>';

                let p = document.createElement('p');
                p.className = 'cover-text';
                p.innerHTML = story;
                p.key=slide.product_id;
                p.addEventListener('click', e=>{
                    hrefProduct(e.target.key);
                })

                div.appendChild(p);
                coverPicDiv.appendChild(div);
            })

            slides = document.querySelectorAll('.cover-picture');

            let nodes = document.createElement('div');
            nodes.id = 'slide-nodes';
            for (let i = 0; i < slides.length; i++) {
                let node = document.createElement('div');
                node.className = 'slide-node';
                node.onclick = targetSlide;
                nodes.appendChild(node);
            }
            coverPicDiv.appendChild(nodes);

            allNodes = document.querySelectorAll('.slide-node');
            slides[0].id = 'current-slide';
            allNodes[0].id = 'current-node';
            slideStart(slides, allNodes);
        }
    }
    coverPic.open('GET', urlHead + '/marketing/campaigns', true);
    coverPic.send()
}

let slides;
let allNodes;
let currentSlide = 1;
const changeSlide = (slides, allNodes) => {
    if (document.getElementById('current-slide')) {
        document.getElementById('current-slide').removeAttribute('id');
    }
    if (document.getElementById('current-node')) {
        document.getElementById('current-node').removeAttribute('id');
    }
    slides[currentSlide % slides.length].id = 'current-slide';
    allNodes[currentSlide % slides.length].id = 'current-node';
    currentSlide++;
}
let interval;
const slideStart = (slides, allNodes) => {
    interval = setInterval(() => {
        changeSlide(slides, allNodes);
    }, 10000);
}


const targetSlide = e => {
    for (let i = 0; i < allNodes.length; i++) {
        if (allNodes[i] === e.target) {
            currentSlide = i;
            break;
        }
    }
    if (e.target.id != 'current-node') {
        document.getElementById('current-node').removeAttribute('id');
        e.target.id = 'current-node';
        document.getElementById('current-slide').removeAttribute('id');
        slides[currentSlide % slides.length].id = 'current-slide';
        currentSlide++;
        clearInterval(interval);
        slideStart(slides, allNodes);
    } else {
        currentSlide++;
        clearInterval(interval);
        slideStart(slides, allNodes);
    }

}