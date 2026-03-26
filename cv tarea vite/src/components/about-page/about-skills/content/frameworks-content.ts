import Handlebars from 'handlebars';

export const frameworks: {
  databases: string[]
  frontend: string[]
  backend: string[]
} = {
  databases: ['microsoft-sql-server-logo', 'mongodb'],
  frontend: ['angular'],
  backend: ['asp-net-core-web-api', 'supabase']
}

export const FrameworkTemplate = (items: string[]) => compiled({ items });

const compiled = Handlebars.compile(`
  {{#each items}}
  <img src="/about-skills-images/{{this}}.png">
  {{/each}}
`);
