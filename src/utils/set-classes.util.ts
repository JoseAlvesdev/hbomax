import getElement from './get-element.util';

export default (
  refElement: string[], 
  reusePresentClasses?: boolean, ...classes: string[]
): void => {
  const setClasses = (scElement: string): void => {
    const element: HTMLElement | null = getElement(scElement);

    if (element) {
      if (classes.length > 0 && classes[0] !== '') {
        if (reusePresentClasses) {
          classes.forEach((c: string): void => {
            if (!element.classList.contains(c)) {
              element.classList.add(c);
            }
          });
        } else {
          element.setAttribute('class', classes.join(' '));
        }
      } else {
        element.removeAttribute('class');
      }
    } else {
      console.error(`Elemento com referência "${scElement}" não encontrado.`);
    }
  };

  if (refElement.length > 1) {
    refElement.forEach((element: string): void => {
      setClasses(element);
    });
  } else {
    setClasses(refElement[0]);
  }
};

