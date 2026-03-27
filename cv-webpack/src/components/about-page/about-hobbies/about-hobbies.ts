class AboutHobbies extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <article class="abt-article">
        <h1 class="abt-title">Hobbies</h1>
        <div>
          <h3>Digital Art</h3>
          <p>
            Is one of my biggest passions alongside with coding, I love drawing on my tablet
            and I carve for improvement on that.
          </p>
        </div>
      </article>
    `;
  }
}

customElements.define('about-hobbies', AboutHobbies);