class Basket {

  handleSetlocationStorage(element, id){
    let j = more.length - 1;
    for(let i = more.length - 1; i >= 0; i -= 1) {
      if(id == productBasket[i]) {
        j = i;
      }
    }

    if(element == false) {
      if(Number(more[j]) == 1){
        more[j] = Number(more[j]) - 1;
        localStorageUtil.putProducts(id);
        location.reload()
      }
      else if(Number(more[j]) > 1) {
        more[j] = Number(more[j]) - 1;
      }
    }
    else if(Number(more[j]) != 0){
      more[j] = Number(more[j]) + 1;
    }
    else {
      more[j] = Number(more[j]) + 1;
      localStorageUtil.putProducts(id);
    }
    basketPage.render(productBasket, j, id);
  }

  render(count, j, idMore) {
    let htmlBasketLi = '';
    let htmlBasket = '';
    let lastPrice = 0;
    let htmlPricePage = '';
    let htmlMore = '';
    let i = 0;

    CATALOG.forEach(({id, name, img1, price, info, sale}) => {

      count.forEach((item) => {

        if(item == id) {

          if(item == idMore) {
            htmlMore = `<span>${more[j]}</span>`
          }

          else if(item == id){
            htmlMore = `<span>${more[i]}</span>`
          }

          if (i < count.length && i != j) {
            i += 1;
          }
          else if(i == j || i < count.length) {
            i = j + 1;
          }
          else {
            i = 0;
          }

          if(sale != '') {

            let newPrice = Math.round((100 - sale) * price / 100);
    
            htmlPricePage = `
              <span class="basket-price">${newPrice}</span>
            `
            price = newPrice;
          }
    
          else {
            htmlPricePage = `
              <span class="basket-price">${price}</span>
            `
          }

          htmlBasketLi += `
            <li class="catalog-item">
              <a class="basket-link">
                <img class="basket-img" src="${img1}"/>
                <div class="basket-info">
                  <h4 class="basket-title">${name}</h4>
                  <p class="basket-description">zero</p>
                </div>
                <div class="basket-more">
                  <button class="clear-button basket-button" onclick="basketPage.handleSetlocationStorage(false, '${id}');">-</button>
                  ${htmlMore}
                  <button class="plus-button basket-button" onclick="basketPage.handleSetlocationStorage(true, '${id}');">+</button>
                </div>
                ${htmlPricePage}
              </a>
            </li>
          `;

          let check = item.split('');
          
          if(check[0] == 't') {
            lastPrice += 2 * Number(price);
          }
          else {
            lastPrice += Number(price);
          }

          htmlBasket = `
          <ul class="basket__catalog">
            ${htmlBasketLi}
          </ul>
          <div class="basket__buy">
            <span class="buy-title">itooog</span>
            <span class="basket-price">${lastPrice}</span>
          </div>
          <button class="basket__back">Купить</button>
          `;
        };

      });
    });

    ROOT_BASKET.innerHTML = htmlBasket;
  }
}

let more = [];
for (let i = 0; i < productBasket.length; i++) {
  more[i] = 1;
}


const basketPage = new Basket();
basketPage.render(productBasket, 0, 0);