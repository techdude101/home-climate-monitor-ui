export const isInputValid = (value, minLength=3) => {
  // Allow things like Seán with unicode characters
  // Disallow things like <script>alert;
  const regex = /[!"#$%&'()*+,.£\\/:;<=>?@[\]^_`{|}~]/;

  if (value.length < minLength || regex.test(value) === true) {
    return false;
  }
  return true;
};