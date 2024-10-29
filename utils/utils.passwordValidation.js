import passwordValidator from "password-validator";

const passSchema = new passwordValidator();

passSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

export const checkPasswordValidity = async (passwordToCheck) => {
  try {
    // returns a list of errors.
    // If the returned value is an empty string, the password met all the validation schemas
    return passSchema.validate(passwordToCheck, { list: true });
  } catch (error) {
    console.error(
      `Error on registerNewUser function in the passwordValidation file : ${error.message}`
        .red.underline.bold
    );

    throw Error(
      `Something went wrong while trying to check password validity. ${error.message}`
    );
  }
};
