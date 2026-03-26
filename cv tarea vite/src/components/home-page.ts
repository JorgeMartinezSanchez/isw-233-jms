class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <div class="about-div">
          <img class="icon-main" src="/home-page-images/aboutmeaislop.png">
          <p>About Me</p>
        </div>
        <div class="projects-div">
          <img class="icon-main" src="/home-page-images/proyectsaislopicon.png">
          <p>Projects</p>
        </div>
        <div class="blog-div">
          <img class="icon-main" src="/home-page-images/blogaislopicon.png">
          <p>Blog</p>
        </div>
      </nav>
    `;

    // Los listeners van acá, no en un attachMenuListeners() suelto
    this.querySelector('.about-div')!.addEventListener('click', () => {
      history.pushState({}, '', '/about');
      window.dispatchEvent(new PopStateEvent('popstate')); // dispara el router
    });
    this.querySelector('.projects-div')!.addEventListener('click', () => {
      history.pushState({}, '', '/projects');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    this.querySelector('.blog-div')!.addEventListener('click', () => {
      history.pushState({}, '', '/blog');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }

  // disconnectedCallback se llama automático cuando swapView() destruye este elemento
  disconnectedCallback() {
    // No hace falta limpiar listeners porque el elemento entero se destruye
    // Pero si tuvieras timers o observers, los limpiarías acá
  }
}

customElements.define('home-page', HomePage);