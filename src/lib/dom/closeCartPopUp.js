export function closeCartPopUp() {
  const popup = document.querySelector(".modal");

  if (!popup) {
    console.warn("Popup modal not found.");
    return;
  }
  popup.textContent = "";
  popup.style.display = "none";
  document.body.style.overflow = "visible";
}
