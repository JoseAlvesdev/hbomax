// 2. Styles
import './styles/index.scss';

// 3. NavBar
import { NavBar } from "./components/navbar.component.ts";
customElements.define('max-navbar', NavBar);

// 4. Footer
import { Footer } from './components/footer.component.ts';
customElements.define('max-footer', Footer);

// 1. Router
import './router.ts';