class Product {
  
  constructor() {
    this.classNameActive = 'btn-active';
    this.labelAdd = 'Добавить в корзину';
    this.labelRemove = 'Убрать';
  }

  handleSetlocationStorage(element, id){
    const { pushProduct, products } = localStorageUtil.putProducts(id);
    
    if(pushProduct) {
      element.classList.add(this.classNameActive);
      element.innerHTML = this.labelRemove
    }
    else {
      element.classList.remove(this.classNameActive);
      element.innerHTML = this.labelAdd
    }
  }

  render() {
    let htmlProduct = '';
    let htmlBox = '';
    let htmlSlider = '';
    let htmlPricePage = '';
    let newPrice = 0;

    const productsStore = localStorageUtil.getProducts();

    CATALOG.forEach(({id,name,img1,img2,price,info,sale}) => {
      
      if(id == prodId) {
        let textButton = '';
        let activeClass = '';

        if(productsStore.indexOf(id) === -1) {
          textButton = this.labelAdd;
        }

        else {
          activeClass = ''+this.classNameActive;
          textButton = this.labelRemove;
        }

        if(sale != '') {
          newPrice = Math.round((100 - sale) * price /100);
  
          htmlPricePage = `
            <p class="card-price">${newPrice}</p>
            <p class="card-price old">${price}</p>
          `
        }
  
        else {
          htmlPricePage = `
            <p class="card-price">${price}</p>
          `
        }

        if(img2 == ''){
          htmlSlider += `
          <img class="slider-img" src="${img1}">
          `
        }

        else {
          htmlSlider += `
          <img class="slider-img" src="${img1}">
          <img class="slider-img" src="${img2}">
          `

          htmlBox += `
            <img class="box-img prev" src="${img1}">
            <img class="box-img next" src="${img2}">
          `
        }

        htmlProduct += `
        <a class="back-button" href="">&larr; Все товары</a>
        <div class="slider__container">
          <div class="slider">
            ${htmlSlider}
            <button class="prev-button visually-hidden" aria-label="Посмотреть предыдущий слайд">&lt;</button>
            <button class="next-button" aria-label="Посмотреть следующий слайд">&gt</button>
          </div>
        </div>
        <div class="product-info">
          <h4 class="card-title">${name}</h4>
          <span class="product__price">${htmlPricePage}</span>
          <button class="btn ${activeClass}" onclick="productPage.handleSetlocationStorage(this, '${id}');">${textButton}</button>
          <p class="card-info">${info}</p>
        </div>
        <div class="slider__box">
          ${htmlBox}
        </div>
        `;
      }
    });

    const htmlPage = `
    <div class="skates-products">
      ${htmlProduct}
    <div>
    `;

    ROOT_PRODUCT.innerHTML = htmlPage;
    Slider();
  }
  
}

const productPage = new Product();
productPage.render();

function Slider() {
  const slider = document.querySelector('.slider');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const prevImg = document.querySelector('.prev');
  const nextImg = document.querySelector('.next');
  const slides = Array.from(slider.querySelectorAll('img'));
  const slideCount = slides.length;
  let slideIndex = 0;


  prevButton.addEventListener('click', showPreviousSlide);
  nextButton.addEventListener('click', showNextSlide);

  console.log("eawea",slideCount);

  if (slideCount != 1) {
    nextImg.addEventListener('click', showNextSlide);
    prevImg.addEventListener('click', showPreviousSlide);
  }

  else {
    nextButton.classList.add('visually-hidden');
    updateSlider();
  }

  function showPreviousSlide() {
    if (slideIndex != 0) {
      slideIndex = (slideIndex - 1 + slideCount) % slideCount;
      prevButton.classList.add('visually-hidden');
      nextButton.classList.remove('visually-hidden');
      updateSlider();
    }
  }

  function showNextSlide() {
    if (slideIndex == 0) {
      slideIndex = (slideIndex + 1) % slideCount;
      prevButton.classList.remove('visually-hidden');
      nextButton.classList.add('visually-hidden');
      updateSlider();
    }
  }

  function updateSlider() {
    slides.forEach((slide, index) => {
      if (index === slideIndex && slideCount != 0) {
        slide.style.display = 'block';
      } else {
        slide.style.display = 'none';
      }
    });
  }

  function addBuy() {
    buyElement.addEventListener('click', (buy) => {
      console.log("yes");
    })
  }

  updateSlider();
}

