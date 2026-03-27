class AboutEducation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <article class="abt-article">
        <h1 class="abt-title">Education</h1>
        <div class="abt-section-card">
          <img class="abt-img" src="/about-education-images/ucb.png" alt="UCB Logo">
          <div class="abt-info">
            <h4 class="abt-subtitle">"Católica Boliviana San Pablo" University in Santa Cruz, Bolivia.</h4>
            <span class="abt-period">2024 - Currently</span>
            <p class="abt-description">
              Currently studying <b>Software Engineering.</b>
            </p>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define('about-education', AboutEducation);