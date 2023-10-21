class Catalog {

  render() {
    let htmlCatalog = '';
    let htmlCardImgs = '';
    let htmlSale = '';
    let htmlPricePage = '';
    let newPrice = 0;

    CATALOG.forEach(({id, name, img1, img2, price, sale}) => {
      
      if(pageUp[0].id == id.split('')[0]) {

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
            <a class="card-link" href="#${id}">
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

    const html = `
    <ul class="catalog__list">
      ${htmlCatalog}
    </ul>
    `;

    ROOT_SKATE.innerHTML = html;
  }
}

const catalogPage = new Catalog();
catalogPage.render();
const containHide = () => imgId.classList.contains('hide-img');

class Hover {
  render() {
    [...document.querySelectorAll("img")].forEach(item => {
      item.addEventListener("mouseenter", (e) => {
        console.log("1", e.target.getAttribute("id"));
        if(lastId == null){
          imgId = document.getElementById(item.id);
        }

        if(containHide && lastId != item.id) {
          imgId.classList.remove('hide-img');
        }

        if (e.target.getAttribute("id") != null) {
          lastId = item.id;
        }

        if (lastId != null) {
          prodId = lastId
          item.addEventListener("click", (show) => {
            console.log("yews", prodId)
            const productPage = new Product();
            productPage.render();
          });
        }

        lastId = item.id;
      });
    });

    [...document.querySelectorAll("img")].forEach(item => {
      item.addEventListener("mouseleave", (e) => {
        console.log("2", e.target.getAttribute("id"));
        if(e.target.getAttribute("id") == null) {
        
          if(!containHide()) {
            imgId.classList.add('hide-img');
            lastId = e.target.getAttribute("id");
          };
        };
      });
    });
  }
}

const HoverPage = new Hover();
HoverPage.render();
