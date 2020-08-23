const checkFormValues = (firstname, lastname, mobile) => {
  let errorMessage = '';

  if (firstname.length < 1) {
    errorMessage += 'Please enter a first name.</br>';
  }
  if (lastname.length < 1) {
    errorMessage += 'Please enter a last name.</br>';
  }
  if (!mobile.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
    errorMessage += 'Please enter a valid phone number. (10 digits)</br>';
  }

  return errorMessage;
};