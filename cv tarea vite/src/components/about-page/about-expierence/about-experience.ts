class AboutExperience extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <article class="abt-article">
        <h1 class="abt-title">Experience</h1>
        <div class="abt-section-card">
          <img class="abt-exp-img" src="/about-expierence-images/spaceapps.jpg" alt="SpaceApps Logo">
          <div class="abt-info">
            <h3 class="abt-subtitle">Space Apps</h3>
            <p class="abt-description">
              I've participated in the Space Apps of <b>Santa Cruz, Bolivia.</b> I learned a lot about design, and working in teams to develop an
              application on the hackathon.
            </p>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define('about-experience', AboutExperience);