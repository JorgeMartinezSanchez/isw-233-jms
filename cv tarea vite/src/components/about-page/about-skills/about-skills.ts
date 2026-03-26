import { language, LanguageProgressTemplate } from "./content/language-content";
import { frameworks, FrameworkTemplate } from "./content/frameworks-content";

class AboutSkills extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <article class="abt-article">
        <h1 class="abt-title">Skills</h1>
        <div class="abt-skills-section-card">
          <h2 class="skill-title">Programming Languages</h2>
          <div class="languages-array">
            ${LanguageProgressTemplate(language)}
          </div>
        </div>

        <div class="abt-skills-section-card">
          <h2 class="skill-title">Frameworks</h2>
          <div class="framework-array">
            <h3>Database</h3>
            <div class="fw-array">
              ${FrameworkTemplate(frameworks.databases)}
            </div>
          </div>

          <div class="framework-array">
            <h3>Front-End</h3>
            <div class="fw-array">
              ${FrameworkTemplate(frameworks.frontend)}
            </div>
          </div>

          <div class="framework-array">
            <h3>Back-End</h3>
            <div class="fw-array">
              $${FrameworkTemplate(frameworks.backend)}
            </div>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define('about-skills', AboutSkills);