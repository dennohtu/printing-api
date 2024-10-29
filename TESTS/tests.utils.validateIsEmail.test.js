import { validateEmail} from "../utils/utils.validateIsEmail.js";

test('Check if email is valid', async () => {
    expect(await validateEmail("email@email.com")).toBeTruthy()
    expect(await validateEmail("emailemail.com")).toBeFalsy()
    expect(await validateEmail("email@emailcom")).toBeFalsy()


})

