export default (refElement: string): any => {
  const element: HTMLElement | null = document.querySelector(refElement);
  if (element) return element;
};
