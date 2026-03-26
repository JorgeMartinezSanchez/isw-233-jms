// Importar todos los componentes que se van a usar
import './components/home-page.ts';
import './components/about-page/about-page.ts';
import './components/blog-page.ts';
import './components/projects-page/projects-page.ts';

// También importar los subcomponentes que se cargan dinámicamente
import './components/about-page/about-education/about-education.ts';
import './components/about-page/about-expierence/about-experience.ts';
import './components/about-page/about-skills/about-skills.ts';
import './components/about-page/about-hobbies/about-hobbies.ts';

const viewContainer = document.getElementById('view-container');

function swapView(tag: string) {
  if (viewContainer) {
    viewContainer.innerHTML = '';
    viewContainer.appendChild(document.createElement(tag));
  }
}

function renderPage(path: string) {
  switch (path) {
    case '/':
    case '/index.html':
      return swapView('home-page');
    case '/about':
      return swapView('about-page');
    case '/projects':
      return swapView('projects-page');
    case '/blog':
      return swapView('blog-page');
    default:
      if (path.startsWith('/about/')) {
        return swapView('about-page');
      }
      return swapView('home-page');
  }
}

renderPage(window.location.pathname);

window.addEventListener('popstate', () => {
  renderPage(window.location.pathname);
});