import setClasses from "../utils/set-classes.util";

export default class AbstratctView {
  constructor() {
    setClasses(['body', 'max-navbar', '#root', 'max-footer'], false, '');
  }

  setTitle(title: string): void {
    document.title = title;
  }

  async getHtml(): Promise<string> {
    return '';
  }
}
