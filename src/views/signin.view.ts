import setClasses from "../utils/set-classes.util.ts";
import AbstratctView from "./abstract.view.ts";

export default class SignInView extends AbstratctView {
  constructor() {
    super();
    this.setTitle('Entrar HBO Max');
    setClasses(['body'], false, 'signin');
    setClasses(['max-navbar'], false, 'c-signin-navbar');
  }

  async getHtml(): Promise<string> {
    const url: string = '/views/signin.view.html';
    const resquest: string = await fetch(url)
      .then((data: Response): Promise<string> => data.text());
    
    return resquest;
  }
}
