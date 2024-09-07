import IRoute from "./IRoute.interface";

export default interface IPotentialMatch {
  route: IRoute,
  isMatch: boolean
}