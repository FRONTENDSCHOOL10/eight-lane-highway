const popup = document.querySelector(".modal");

export function closeCartPopUp() {
  popup.textContent = "";
  popup.style.display = "none";
  document.body.style.overflow = "visible";
}
