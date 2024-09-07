import AbstratctView from "./abstract.view.ts";

export default class HomeView extends AbstratctView {
  constructor() {
    super();
    this.setTitle('HBO Max');
  }

  async getHtml(): Promise<string> {
    const url: string = '/hbomax/views/home.view.html';
    const resquest: string = await fetch(url)
      .then((data: Response): Promise<string> => data.text())

    return resquest;
  }
}
