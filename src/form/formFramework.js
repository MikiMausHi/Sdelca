function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  const re = /^(\+)?\d{11}$/;
  return re.test(String(phone));
}

export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ""
  };
}

export function validate(value, validation = null, confirmPassword = null) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (validation.minLength) {
    isValid = value.trim().length >= validation.minLength && isValid;
  }
  if (validation.maxLength) {
    isValid = value.trim().length <= validation.maxLength && isValid;
  }
  if (validation.email) {
    isValid = validateEmail(value.trim()) && isValid;
  }
  if (validation.emailPhone) {
    isValid =
      (validateEmail(value.trim()) || validatePhone(value.trim())) && isValid;
  }
  if (validation.phone) {
    isValid = validatePhone(value.trim()) && isValid;
  }

  if (validation.confirmPassword) {
    isValid = value.trim() === confirmPassword.trim() && isValid;
  }

  return isValid;
}

export function validateForm(formControls) {
  let isFormValid = true;

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }

  return isFormValid;
}
