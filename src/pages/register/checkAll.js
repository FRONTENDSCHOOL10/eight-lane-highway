function checkAll(checkAllAgreement) {
  const arrCheckAgreement = document.getElementsByName("checkAgreement");

  arrCheckAgreement.forEach((checkAgreement) => {
    checkAgreement.checked = checkAllAgreement.checked;
  });
}
