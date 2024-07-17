export function setupNameCheck(inputId, warningId) {
  const nameField = document.getElementById(inputId);
  const warningMessage = document.getElementById(warningId);

  if (!nameField || !warningMessage) {
    console.error("Invalid element IDs provided.");
    return;
  }

  let isComposing = false;

  nameField.addEventListener("compositionstart", () => (isComposing = true));
  nameField.addEventListener("compositionend", () => {
    isComposing = false;
    validateInput();
  });

  nameField.addEventListener("input", () => {
    if (!isComposing) validateInput();
  });

  function validateInput() {
    const value = nameField.value;
    // 한글과 한글 자모 외의 문자가 있는지 확인
    const isValid = /^[가-힣ㄱ-ㅎㅏ-ㅣ]*$/.test(value);
    warningMessage.style.display = isValid ? "none" : "block";
  }
}
