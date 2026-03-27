class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav style="display: flex; justify-content: center; gap: 2rem; padding: 2rem;">
        <div class="about-div" style="cursor: pointer; text-align: center;">
          <img class="icon-main" src="/public/home-page-images/aboutmeaislop.png" style="width: 100px; height: 100px;">
          <p>About Me</p>
        </div>
        <div class="projects-div" style="cursor: pointer; text-align: center;">
          <img class="icon-main" src="/public/home-page-images/proyectsaislopicon.png" style="width: 100px; height: 100px;">
          <p>Projects</p>
        </div>
        <div class="blog-div" style="cursor: pointer; text-align: center;">
          <img class="icon-main" src="/public/home-page-images/blogaislopicon.png" style="width: 100px; height: 100px;">
          <p>Blog</p>
        </div>
      </nav>
    `;

    this.querySelector('.about-div')?.addEventListener('click', () => {
      history.pushState({}, '', '/about');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    this.querySelector('.projects-div')?.addEventListener('click', () => {
      history.pushState({}, '', '/projects');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    this.querySelector('.blog-div')?.addEventListener('click', () => {
      history.pushState({}, '', '/blog');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }
}

customElements.define('home-page', HomePage);