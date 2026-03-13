// 1. Declarar la referencia al contenedor
const viewContainer = document.getElementById('view-container');

// 2. Arrancar en home (no pushState al inicio)
renderHome();

window.addEventListener('popstate', () => {
    renderPage(window.location.pathname);
});

function renderPage(path) {
  switch (path) {
    case '/':      return renderHome();
    case '/about': return renderAbout();
    case '/projects': return renderProjects();
    case '/blog': return renderBlog();
    default:       return render404();
  }
}

function renderHome(){
    viewContainer.innerHTML = `            
    <div class="main-menu">
        <div class="about-div">
            <img src="./images/aboutmeaislop.png">
            <p>About Me</p>
        </div>

        <div class="projects-div">
            <img src="./images/proyectsaislopicon.png">
            <p>Projects</p>
        </div>

        <div class="blog-div">
            <img src="./images/blogaislopicon.png">
            <p>Blog</p>
        </div>
    </div>
    `;
    attachMenuListeners();
}

function renderAbout(){
    viewContainer.innerHTML = `
    <div class="main_div">
        <div class="card">
            <div class="card__content">
                <h2 class="card__title">Educación</h2>
                <p class="card__description">Me gradué como Ingeniero de Software en la Universidad Católica Boliviana "San Pablo".</p>
                <img class="card__icon" style="width: 145px; height: 145px;" src="./../images/ed.png" alt="edu icon">
            </div>
        </div>

        <div class="card">
            <div class="card__content">
                <h2 class="card__title">Experiencia</h2>
                <p class="card__description">Tuve experiencia participando en el Space Apps del 2024.</p>
                <img class="card__icon" style="width: 172px; height: 171px;" src="./../images/exp.png" alt="exp icon">
            </div>
        </div>

        <div class="card">
            <div class="card__content">
                <h2 class="card__title">Habilidades</h2>
                <p class="card__description">Puedo manejar los siguientes lenguajes de programación:</p>
                <div class="card__skills-row">
                    <img style="width: 119px; height: 119px;" src="./../images/cpp.png" alt="C++">
                    <img style="width: 130px; height: 145px;" src="./../images/cslogo.png" alt="C#">
                    <img style="width: 122px; height: 122px;" src="./../images/Python.png" alt="Python">
                    <img style="width: 124px; height: 140px;" src="./../images/Ts.png" alt="TypeScript">
                </div>
                <div class="card__languages">
                    <p>Idiomas:</p>
                    <p>+ 🇺🇸 Inglés</p>
                    <p>+ 🇪🇸 Español</p>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card__content">
                <h2 class="card__title">Hobbies</h2>
                <p class="card__description">Suelo realizar dibujo en digital.</p>
                <img class="card__icon" style="width: 227px; height: 227px;" src="./../images/tablet.png" alt="hobby">
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderProjects(){
    viewContainer.innerHTML = `
        <div class="proyect-main-div">
            <p>Coming soon...</p>
        </div>
    `;
}

function renderBlog(){
    viewContainer.innerHTML = `
        <div class="contact__icons">
            <div class="contact__item">
                <a id="whatsapp_icon_button" href="https://wa.me/68211104" target="_blank" rel="noopener">
                    <img class="contact__icon" src="./images/wssp.png" alt="WhatsApp de Jorge" />
                </a>
                <p id="whatsapp_number_text" class="contact__info">+591 68211104</p>
            </div>

            <div class="contact__item">
                <a id="linkedln_icon_button" href="https://www.linkedin.com/in/jorge-mart%C3%ADnez-s%C3%A1nchez-609ab8300" target="_blank" rel="noopener">
                    <img class="contact__icon" src="./images/linkedln.png" alt="LinkedIn de Jorge" />
                </a>
                <p id="linkedln_text" class="contact__info">Jorge Martinez Sanchez</p>
            </div>

            <div class="contact__item">
                <a id="instagram_icon_button" href="https://www.instagram.com/jorge.mtzsa05/" target="_blank" rel="noopener">
                    <img class="contact__icon" src="./images/ig.png" alt="Instagram de Jorge" />
                </a>
                <p id="instagram_text" class="contact__info">@jorge.mtzsa05</p>
            </div>

            <div class="contact__item">
                <a id="github_icon_button" href="https://github.com/JorgeMartinezSanchez" target="_blank" rel="noopener">
                    <img class="contact__icon" src="./images/guthib.png" alt="Github de Jorge" />
                </a>
                <p id="github_text" class="contact__info">JorgeMartinezSanchez</p>
            </div>
        </div>   
    `;
}

function attachMenuListeners() {
    document.querySelector('.about-div').addEventListener('click', () => {
        history.pushState({}, '', '/about');
        renderAbout();
    });
    document.querySelector('.projects-div').addEventListener('click', () => {
        history.pushState({}, '', '/projects');
        renderProjects();
    });
    document.querySelector('.blog-div').addEventListener('click', () => {
        history.pushState({}, '', '/blog');
        renderBlog();
    });
}
