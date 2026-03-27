import './about-education/about-education';
import './about-expierence/about-experience';
import './about-skills/about-skills';
import './about-hobbies/about-hobbies';

class AboutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="about-layout">
        <div class="about-sidebar">
          <div class="abtme-education"><span>Education</span></div>
          <div class="abtme-experience"><span>Experience</span></div>
          <div class="abtme-skills"><span>Skills</span></div>
          <div class="abtme-hobbies"><span>Hobbies</span></div>
        </div>
        <section id="about-content"></section>
      </div>
    `;

    this.#attachSidebarListeners();
    this.#loadSection('about-education');
  }

  #loadSection(tag: string) {
    const content = this.querySelector('#about-content');
    if (content) {
      content.innerHTML = '';
      content.appendChild(document.createElement(tag));
    }

    this.querySelectorAll('.about-sidebar div').forEach(el => {
      el.classList.remove('active');
    });

    const map: Record<string, string> = {
      'about-education': '.abtme-education',
      'about-experience': '.abtme-experience',
      'about-skills': '.abtme-skills',
      'about-hobbies': '.abtme-hobbies',
    };
    const element = this.querySelector(map[tag]);
    if (element) {
      element.classList.add('active');
    }
  }

  #attachSidebarListeners() {
    this.querySelector('.abtme-education')?.addEventListener('click', () => {
      history.pushState({}, '', '/about/education');
      this.#loadSection('about-education');
    });
    this.querySelector('.abtme-experience')?.addEventListener('click', () => {
      history.pushState({}, '', '/about/experience');
      this.#loadSection('about-experience');
    });
    this.querySelector('.abtme-skills')?.addEventListener('click', () => {
      history.pushState({}, '', '/about/skills');
      this.#loadSection('about-skills');
    });
    this.querySelector('.abtme-hobbies')?.addEventListener('click', () => {
      history.pushState({}, '', '/about/hobbies');
      this.#loadSection('about-hobbies');
    });
  }
}

customElements.define('about-page', AboutPage);