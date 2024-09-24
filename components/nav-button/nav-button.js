export function createButton(type, onClick) {
  const button = document.createElement("button");
  button.classList.add("button");
  button.addEventListener("click", onClick);
  if (type === "prev") {
    button.classList.add("button--prev");
    button.setAttribute("data-js", "button-prev");
    button.textContent = "previous";
  } else if (type === "next") {
    button.classList.add("button--next");
    button.setAttribute("data-js", "button-next");
    button.textContent = "next";
  }
  return button;
}
