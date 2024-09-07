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

// Base URL
import viteConfig from '../vite.config'

const navigateTo = (url: string): void => {
  history.pushState(null, '', url);
  router();
};

const router: () => Promise<void> = async (): Promise<void> => {
  const routes: IRoute[] = [
    { path: "/", view: HomeView },
    { path: "/signin", view: SignInView },
    { path: '/404', view: NotFoundView }
  ];

  // Test each route potential match
  const potentialMatches: IPotentialMatch[] = routes.map((route: IRoute): IPotentialMatch => {
    return {
      route: route,
      isMatch: location.pathname === `${viteConfig.base.substring(0, 7)}${route.path}`
    }
  });

  let match: IPotentialMatch | undefined = potentialMatches
    .find((potentialMatch: IPotentialMatch): boolean => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes.find((route: IRoute): boolean => route.path === '/404') || routes[routes.length - 1],
      isMatch: true
    };
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
    
    const route: string = match.route.path;

    if (route !== '/') 
      getElement('.ts-assign-link').setAttribute('data-link', '');
    else 
      getElement('.ts-assign-link').removeAttribute('data-link');
  }

  init();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', (): void => {
  document.body.addEventListener('click', (e: MouseEvent): void => {
    // const exit: () => void = async (): Promise<void> => {
    //   await sleep(.3);
    //   setClasses(['#root'], true, 'is-show--exit');
    // }
    
    const target = e.target as HTMLElement;
    
    if (target.matches('[data-link]')) {
      e.preventDefault(); // Sempre prevenir o comportamento padrão

      const currentUrl: string = window.location.href;
      const linkUrl: string = (target as HTMLAnchorElement).href;
      
      if (currentUrl !== linkUrl) {
        //exit();
        navigateTo(linkUrl);
      } 
    }
  });

  router();
});

