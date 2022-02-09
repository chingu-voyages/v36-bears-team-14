import { isEmailValid } from "../../utils/string-helpers/validate-email";

type ValidationElement = {
  data: string;
  setErrorMessage: (message: string) => void;
  setHasError: (hasError: boolean) => void;
};

type TSanitizedRegistrationData = {
  isAllDataValidated: boolean;
  sanitizedData: {
    email: string;
    firstName: string;
    lastName: string;
    password1: string;
    password2: string;
  };
};

interface IRegistrationValidationDetails {
  email: ValidationElement;
  firstName: ValidationElement;
  lastName: ValidationElement;
  password1: ValidationElement;
  password2: ValidationElement;
}

export const validateAndSanitizeRegistration = ({
  input,
}: {
  input: IRegistrationValidationDetails;
}): TSanitizedRegistrationData => {
  let foundError = false;

  if (
    !isEmailValid({ email: input.email.data }) ||
    !input.email.data ||
    input.email.data.trim().length < 4
  ) {
    foundError = true;
    input.email.setHasError(true);
    input.email.setErrorMessage("Please enter a valid email");
  }

  if (!input.firstName.data || input.firstName.data.trim().length <= 0) {
    foundError = true;
    input.firstName.setHasError(true);
    input.firstName.setErrorMessage("Please enter a first name");
  }

  if (!input.lastName.data || input.lastName.data.trim().length <= 0) {
    foundError = true;
    input.lastName.setHasError(true);
    input.lastName.setErrorMessage("Please enter a last name");
  }

  if (!input.password1.data || input.password1.data.trim().length < 8) {
    foundError = true;
    input.password1.setHasError(true);
    input.password1.setErrorMessage(
      "Please enter a password (password non-existent or too short)"
    );
  }

  if (!input.password2.data) {
    foundError = true;
    input.password2.setHasError(true);
    input.password2.setErrorMessage("Please confirm the password");
  }

  if (input.password1.data.trim() !== input.password2.data.trim()) {
    foundError = true;
    input.password1.setHasError(true);
    input.password1.setErrorMessage("Ensure passwords match");
    input.password2.setHasError(true);
    input.password2.setErrorMessage("Ensure passwords match");
  }

  const sanitizedData = {
    email: sanitizeElement(input.email.data),
    firstName: sanitizeElement(input.firstName.data),
    lastName: sanitizeElement(input.lastName.data),
    password1: sanitizeElement(input.password1.data),
    password2: sanitizeElement(input.password2.data),
  };
  return {
    isAllDataValidated: !foundError,
    sanitizedData,
  };
};

const sanitizeElement = (data: string): string => {
  return data.trim();
};
