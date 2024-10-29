import { validatePhoneNumberFormate} from "../utils/utils.validateIsCorrectPhoneNumber.js";

test('Check if phone number is formatted correctly', async () => {
    expect(await validatePhoneNumberFormate("254700123456")).toBeTruthy()
    expect(await validatePhoneNumberFormate("0700123456")).toBeFalsy()
    expect(await validatePhoneNumberFormate("254-700-123-456")).toBeFalsy()
    expect(await validatePhoneNumberFormate("+254-700-123-456")).toBeFalsy()
    expect(await validatePhoneNumberFormate("(254)-700-123-456")).toBeFalsy()
    expect(await validatePhoneNumberFormate("(254) 700 123 456")).toBeFalsy()
    expect(await validatePhoneNumberFormate("+254700123456")).toBeFalsy()
    expect(await validatePhoneNumberFormate("(+254) 700123456")).toBeFalsy()
    // expect(await validatePhoneNumberFormate("(254) 700123456")).toBeFalsy()


})

