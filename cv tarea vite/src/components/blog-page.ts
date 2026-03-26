class BlogPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="contact__icons">
        <div class="contact__item">
          <a href="https://wa.me/68211104" target="_blank" rel="noopener">
            <img class="contact__icon" src="./../images/bwssp.png" alt="WhatsApp">
          </a>
          <p class="contact__info">+591 68211104</p>
        </div>
        <!-- resto de iconos... -->
      </div>
    `;
  }
}

customElements.define('blog-page', BlogPage);