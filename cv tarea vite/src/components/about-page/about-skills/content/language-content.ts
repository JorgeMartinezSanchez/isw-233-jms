import Handlebars from 'handlebars';

export const language: {
    photo: string
    knowledge: number
}[] = [              
    { photo: 'cpp',    knowledge: 82 },
    { photo: 'Python', knowledge: 73 },
    { photo: 'cslogo', knowledge: 90 },
    { photo: 'Ts',     knowledge: 85 },
    { photo: 'js',     knowledge: 30 },
    { photo: 'Rlogo',  knowledge: 9  },
    { photo: 'Sql',    knowledge: 86 },
]

export const LanguageProgressTemplate = (languages: 
    {
    photo: string
    knowledge: number
    }[]
) => compiled({ languages });


const compiled = Handlebars.compile(`
    {{#each languages}}
    <div class="language">
        <img src="/about-skills-images/{{photo}}.png">
        <progress value="{{knowledge}}" max="100"></progress>
        <span class="percentage">{{knowledge}}%</span>
    </div>
    {{/each}}
`)
