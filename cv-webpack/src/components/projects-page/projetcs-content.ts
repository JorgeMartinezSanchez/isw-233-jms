import Handlebars from "handlebars";

export const projects: {
    name: string
    imageFileName: string
    description: string
}[] = [
    {
        name: "SafeChat",
        imageFileName: "safechat-logo",
        description: "SafeChat is an end-to-end encrypted chat aplication made with Angular for the Frontend and ASP.NET Core Web API for the Backend and MongoDB as the main database."
    },
    {
        name: "Residencial al cubo",
        imageFileName: "residencial-al-cubo-logo",
        description: "Residencial al cubo is a hotel room manager made with Python's Tkinter for the GUI and Microsoft SQL server management for the database."
    },
    {
        name: "EnviosYa",
        imageFileName: "envios-ya-logo",
        description: "Envios Ya is a logisitic and delivery application with a Frontend built with Angular with a Backend made with Java's Spring Boot."
    },
    {
        name: "86x Computer Architecture Simulator",
        imageFileName: "86x-sim-image",
        description: "It's a simulator created on Microsoft Excel's Macros that represents how a 86x computer architecture works."
    }
]

const template = Handlebars.compile(`
    {{#each projects}}
    <div class="project-card">
        <img src="/assets/projects-images/{{imageFileName}}.png" alt="{{name}}">
        <div class="project-description">
            <h2>{{name}}</h2>
            <p>{{description}}</p>
        </div>
    </div>
    {{/each}}
`);

export const ProjectTemplate = (projects: {
    name: string
    imageFileName: string
    description: string
}[]) => template({ projects });