<img src="/public/images/readme-images/cover.png">

<h1 align="center">Site HBO Max</h1>
<h4 align="center">Clone com modificações</h4>

<p align="center">
  O projeto é um clone do site <a href="https://www.hbomax.com/br/pt">HBO Max</a>, com o intuito de reproduzir a interface, com algumas modificações, aplicando os temas abordados ao longo das aulas de CSS da plataforma da <a href="https://dio.me">Digital Innovation One</a>.
</p>
<p align="center">
  Eu utilizando como base o projeto da dio.me proposto pela Instrutora: Michele Ambrosio, implentei uma Single Page Aplication, utilizando-se de várias técnologias adicionais, como por exemplo a utilização de componentes nativos do JavaScript, também convenções de nomenclatura e estruturação.
</p>

<a href="https://josealvesdev.github.io/hbomax/">
  <img src="/public/images/readme-images/cover-2.png">
</a>

## 📎 Sumário

- [✨ Features](#features)
- [📦 Temas abordados](#topics)
- [❗ Mixin](#mixin)
- [🔡 Router](#router)
- [✅ Deploy](#demo)
- [💻 Autor](#author)

<h2 id="features">✨ Features</h2>

- Menu de navegação
- Cabeçalho com animação gradiente
- Cards com os planos de assinatura animados
- Lista de filmes e séries disponíveis na plataforma
- Formulário de login
- Rodapé com links importantes
- UI Responsiva

*As features são visuais, não possuindo integração com nenhuma API. O intuito do projeto é reproduzir a interface do site original, com algumas modificações.*

<h2 id="topics">📦 Temas abordados</h2>

O projeto possui como intuito aplicar os conceitos abordados na Trilha de CSS da <a href="https://dio.me">DIO</a>, ministrada pela instrutora <a href="https://github.com/micheleambrosio">Michele Ambrosio</a>.

Recursos CSS presentes no projeto:

- Fundamentos do CSS
- Grid Layout
- Flexbox
- Responsividade
- Pseudo-elementos
- Pseudo-classes
- Transformações 2D e 3D
- Transições e animações
- Tratamento de campos inválidos no formulário

Melhorias na:

- Responsividade
- Estruturação
- nomenclaturas

Implementações:

- ViteJs
- TypeScript
- Web Components
- SASS
- SCSS
- SPA
- Página de não econtrada 404

Convenções utilizadas:

- ITCSS
- BEMIT

<h2 id="mixin">❗ Mixin utilizando SCSS</h2>

Cria uma lista de URL's, com o `@each` itera item por item, e por fim foi criadas seis classes, utilizando a variável counter para definir a posição específica de cada card.

```scss
$urls: (
  '/images/hbo-hover_0.webp',
  '/images/MAX-Hover.webp',
  '/images/DC-Hover.webp',
  '/images/WB-Hover.webp',
  '/images/CN-Hover.png',
  '/images/UCL-Hover.webp'
);

@mixin generate-hover-backgrounds($urls) {
  $counter: 1;

  @each $url in $urls {
    .c-contents__card:nth-child(#{$counter}):hover {
      cursor: pointer;
      background-image: url(#{$url});
    }

    $counter: $counter + 1;
  }
}
```

<h2 id="router">🔡 Router implementado</h2>

Router desenvolvido utilizando recursos nativos do JavaScript e do navegador.

```ts
// Views
import HomeView from './views/home.view';
import NotFoundView from './views/not-found.view';
import SignInView from "./views/signin.view";

// Interfaces
import IRoute from "./interfaces/IRoute.interface";
import IPotentialMatch from "./interfaces/IPotentialMatch.interface";

// Utils
import getElement from './utils/get-element.util';
import setClasses from './utils/set-classes.util';
import sleep from './utils/sleep.util';

const navigateTo = (url: string): void => {
  window.location.hash = url; // Muda o hash da URL
  router();
};

const router: () => Promise<void> = async (): Promise<void> => {
  const routes: IRoute[] = [
    { path: "#/", view: HomeView },
    { path: "#/signin", view: SignInView },
    { path: '#/404', view: NotFoundView }
  ];

  // Test each route potential match
  const potentialMatches: IPotentialMatch[] = routes.map((route: IRoute): IPotentialMatch => {
    return {
      route: route,
      isMatch: location.hash === route.path // Verifica o hash
    }
  });

  let match: IPotentialMatch | undefined = potentialMatches
    .find((potentialMatch: IPotentialMatch): boolean => potentialMatch.isMatch);

  if (!match) {
    // Verifica se o hash corresponde a um ID existente
    const hashId = location.hash.substring(1);
    const element = document.getElementById(hashId);
    
    if (element) {
      // Se o ID existir, não redireciona para 404
      match = { route: { path: '', view: HomeView }, isMatch: true }; // Usa uma view padrão
    } else {
      match = {
        route: routes.find((route: IRoute): boolean => route.path === '#/404') || routes[routes.length - 1],
        isMatch: true
      };
    }
  }

  const root: HTMLElement = getElement('#root');
  const view = new match.route.view();

  const init: () => Promise<void> = async (): Promise<void> => {
    root.innerHTML = await view.getHtml();
    setClasses(['main'], true, 'is-rendered');

    const isRendered: boolean 
      = getElement('main').classList.contains('is-rendered');

    if (isRendered) {
      getElement('#loader').classList.add('is-hidden');
      setClasses(['max-navbar', 'max-footer'], true, 'is-visible');
      await sleep(.3);
      setClasses(['#root'], false, 'is-show');
    }

    // Rolagem para o ID especificado no hash
    const hash: string = window.location.hash.substring(1); // Remove o '#'
    
    if (hash) {
      const element: HTMLElement | null = document.getElementById(hash);

      if (element) element.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente para o elemento
      else console.warn(`Elemento com ID "${hash}" não encontrado.`);
    }
  }

  init();
};

window.addEventListener('hashchange', router); // Escuta mudanças no hash

document.addEventListener('DOMContentLoaded', (): void => {
  // Defina o hash padrão se estiver vazio
  if (!window.location.hash) window.location.hash = "#/"; // Defina o hash inicial como a página inicial

  document.body.addEventListener('click', (e: MouseEvent): void => {
    const target = e.target as HTMLElement;

    if (target.matches('[data-link]')) {
      e.preventDefault(); // Sempre prevenir o comportamento padrão
      const currentUrl: string = window.location.hash; // Obtém o hash atual
      const linkUrl: string = (target as HTMLAnchorElement).href.split('#')[1]; // Obtém o hash do link
      
      // Navega para o novo hash
      if (`#${linkUrl}` !== currentUrl) navigateTo(linkUrl); 
    }
  });

  router(); // Chama o router na inicialização
});
```

[🔡 Inspiração](https://youtu.be/6BozpmSjk-Y?si=MAOlHY-lut2FtDAE)

<h2 id="demo">✅ Deploy</h2>

Você pode acessar ao resultado final do projeto [clicando aqui](https://josealvesdev.github.io/hbomax/).


<h2 id="author">💻 Autor</h2>
<p>
    <img align=left margin=10 width=80 src="https://avatars.githubusercontent.com/u/137122689?v=4"/>
    <p>&nbsp&nbsp&nbspJose Alves<br>
    &nbsp&nbsp&nbsp<a href="https://www.instagram.com/henrjos_/">Instagram</a>&nbsp;|&nbsp;<a href="https://github.com/JoseAlvesdev">GitHub</a>&nbsp;|&nbsp;<a href="https://www.linkedin.com/in/josé-alves-9b6134205">LinkedIn</a></p>
</p>
<br/><br/>
<p>

---
✔️ Por [Jose Alves](https://github.com/JoseAlvesdev) 🫡
