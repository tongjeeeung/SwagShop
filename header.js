class Header {

  render(count) {

    const htmlHeader = `
    <nav class="header__menu">
      <a class="header__logo" href="/index.html">
        <img 
          class="header__logo-image"
          src="/images/nMetfr_2abA.jpg"
          alt="Лого сайта"
          >
      </a>
      <ul class="menu-list">
        <li class="menu-list-item">
          <a class="menu-list-item-link" href="/index.html">Главная</a>
        </li>
        <li class="menu-list-item">
          <a class="menu-list-item-link" href="/index.html#part_catalog">Магазин</a>
        </li>
        <li class="menu-list-item">
          <a class="menu-list-item-link" href="/content/basket-page/basket.html">Корзина [${count}]</a>
        </li>
        <li class="menu-list-item">
          <a class="menu-list-item-link" href="/content/come-page/come.html">Профиль</a>
        </li>
      </ul>
    </nav>
    `;

    ROOT_HEADER.innerHTML = htmlHeader;
  }
}

const headerPage = new Header();

const productBasket = localStorageUtil.getProducts();
headerPage.render(productBasket.length);