import { ProjectTemplate, projects } from "./projetcs-content";

class ProjectsPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Projects</h1>
        <article id="project-carrousel">
          <div class="card-group">
            ${ProjectTemplate(projects)}
          </div>
        </article>
      </div>
    `;
  }
}

customElements.define('projects-page', ProjectsPage);