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




