const defaultoffset = 200;
let lastScroll = 0;
const header = document.querySelector(".header");

const scrollPosition = () => window.pageXOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {

  if(scrollPosition() > lastScroll && containHide() && scrollPosition() > defaultoffset){
    header.classList.remove('hide');
    console.log('down');
  }
  else if(scrollPosition() < lastScroll && !containHide() && scrollPosition() < defaultoffset){
    header.classList.add('hide');
    console.log('up');
  }

  lastScroll = scrollPosition();
});


class Favorites {

  render() {
    let htmlCatalog = '';
    let htmlCardImgs = '';
    let htmlSale = '';
    let htmlPricePage = '';
    let newPrice = 0;
    let htmlLink = '';

    while(i < 8) {

      CATALOG.forEach(({id, name, img1, img2, sale, price}) => {

        if(array[i] == id) {
          
          if(array[i].split('')[0] == 's'){
            htmlLink = `
            /content/skate-page/skate.html#${id}
            `
          }

          if(array[i].split('')[0] == 'b'){
            htmlLink = `
            /content/bones-page/bones.html#${id}
            `
          }

          if(array[i].split('')[0] == 'c'){
            htmlLink = `
            /content/screws-page/screws.html#${id}
            `
          }

          if(array[i].split('')[0] == 'k'){
            htmlLink = `
            /content/skin-page/skin.html#${id}
            `
          }

          if(array[i].split('')[0] == 't'){
            htmlLink = `
            /content/trak-page/track.html#${id}
            `
          }

          if(array[i].split('')[0] == 'w'){
            htmlLink = `
            /content/wheels-page/wheels.html#${id}
            `
          }

          if(sale != '') {
            htmlSale = `
              <div class="sale-logo">sale</div>
            `;
  
            newPrice = Math.round((100 - sale) * price /100);
  
            htmlPricePage = `
              <p class="card-price">${newPrice}</p>
              <p class="card-price old">${price}</p>
            `
          }
  
          else {
  
            htmlSale = '';
  
            htmlPricePage = `
              <p class="card-price">${price}</p>
            `
          }
  
          if(img2 == '') {
            htmlCardImgs = `
            <img class="card-catalog hide-img test" src="${img1}" id="${id}"/>
            <img class="card-catalog" src="${img1}"/>
            `
          }
  
          else {
            htmlCardImgs = `
            <img class="card-catalog hide-img test" src="${img1}" id="${id}"/>
            <img class="card-catalog" src="${img2}"/>
            `
          }
  
          htmlCatalog += `
            <li class="catalog__list-item">
            ${htmlSale}
              <a class="card-link" href="${htmlLink}">
                ${htmlCardImgs}
                <h4 class="card-title">${name}</h4>
                <span class="product__price just">
                ${htmlPricePage}
                </span>
              </a>
            </li>
          `
        }
      });
      i += 1;
    }

    const htmlFavorit = `
      <h2 class="favorites__title">Meet our best sellers</h2>
      <ul class="favorites__card-list">
        ${htmlCatalog}
      </ul>
    `

    ROOT_FAVORIT.innerHTML = htmlFavorit;
  }
}

let array = [];
let i = 0;
var randomIndex = Math.floor(Math.random() * CATALOG.length);

for(let j = 0; j < 8; j++) {
  if(array.indexOf(CATALOG[randomIndex].id) == -1) {
    array[j] = CATALOG[randomIndex].id;
    randomIndex = Math.floor(Math.random() * CATALOG.length);
  }
  else {
    j -= 1;
    randomIndex = Math.floor(Math.random() * CATALOG.length);
  }
}

const ROOT_FAVORIT = document.getElementById('favorites');
const favoritesPage = new Favorites();
favoritesPage.render();
