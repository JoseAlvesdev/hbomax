import setClasses from "../utils/set-classes.util";
import AbstratctView from "./abstract.view";

export default class NotFoundView extends AbstratctView {
  constructor() {
    super();
    this.setTitle('Error 404 Page Not Found');
    setClasses(['max-navbar'], false, 'c-not-found-navbar');
  }

  async getHtml(): Promise<string> {
    const url: string = '/views/not-found.view.html'
    const resquest: string = await fetch(url)
      .then((data: Response): Promise<string> => data.text());
    
    return resquest;
  }
}
