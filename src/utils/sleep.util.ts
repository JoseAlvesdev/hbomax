export default (sc: number): Promise<void> => {
  return new Promise(
    (resolve: (
      value: void | PromiseLike<void>) => void 
    ): number => setTimeout(resolve, sc * 1000)
  );
}