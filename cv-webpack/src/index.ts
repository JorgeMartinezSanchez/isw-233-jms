// Importar todos los componentes que se van a usar
import './components/home-page';
import './components/about-page/about-page';
import './components/blog-page';
import './components/projects-page/projects-page';

// También importar los subcomponentes que se cargan dinámicamente
import './components/about-page/about-education/about-education';
import './components/about-page/about-expierence/about-experience';
import './components/about-page/about-skills/about-skills';
import './components/about-page/about-hobbies/about-hobbies';

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