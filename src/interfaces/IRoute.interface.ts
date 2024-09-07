import AbstratctView from "../views/abstract.view";

export default interface IRoute {
  path: string, 
  view: new () => AbstratctView
}