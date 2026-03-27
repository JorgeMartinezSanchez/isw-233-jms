import { language, LanguageProgressTemplate } from "./content/language-content";
import { frameworks, FrameworkTemplate } from "./content/frameworks-content";

class AboutSkills extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <article class="abt-article">
        <h1 class="abt-title">Skills</h1>
        <div>
          <h2>Programming Languages</h2>
          <ul>
            <li>C++ (82%)</li>
            <li>Python (73%)</li>
            <li>C# (90%)</li>
            <li>TypeScript (85%)</li>
            <li>JavaScript (30%)</li>
            <li>SQL (86%)</li>
          </ul>
        </div>
      </article>
    `;
  }
}

customElements.define('about-skills', AboutSkills);