export function FormValidation(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const elements = form.querySelectorAll("input, select");

  elements.forEach((element) => {
    if (!element.checkValidity()) {
      element.classList.add("invalid:border-red-500");
      const errorMessage = element.parentNode.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.classList.remove("hidden");
      }
    } else {
      element.classList.remove("invalid:border-red-500");
      const errorMessage = element.parentNode.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.classList.add("hidden");
      }
    }
  });

  return form.checkValidity();
}
