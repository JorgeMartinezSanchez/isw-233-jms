class AboutHobbies extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <article class="abt-article">
        <h1 class="abt-title">Hobbies</h1>
        <div class="abt-section-card">
          <img class="abt-img" src="/about-hobbies-images/digital-art.jpg">
          <div class="abt-info">
            <h3 class="abt-subtitle">Digital Art</h3>
            <p class="abt-description">
              Is one of my biggest passions alongside with coding, i love drawing on my tablet
              and i carve for improvement on that.
            </p>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define('about-hobbies', AboutHobbies);