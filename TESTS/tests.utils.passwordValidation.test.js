import { checkPasswordValidity} from "../utils/utils.passwordValidation.js";


test("Check how strong the password is",async () => {
    // check min 8
    let issueWithPassword = await checkPasswordValidity("1@eff");
    expect(issueWithPassword.length).toBeGreaterThan(0)
//    max 100
    issueWithPassword = await checkPasswordValidity("z!qae-]2Yf<!,.-A-bR9+]S/fvrEz?mzd5Am6m+QVPTweRHSq9ZSLAEYLUxKhk'RvYHq@]gc>kr@2R\"6(Rj!-{~q}>%B4z>UzAp\"-va");
    expect(issueWithPassword.length).toBeGreaterThan(0)
// lower case
     issueWithPassword = await checkPasswordValidity("?B;'F?4]LJ?5\"3K[!L9");
    expect(issueWithPassword.length).toBeGreaterThan(0)
//    upper case
    issueWithPassword = await checkPasswordValidity("j9m+*#mt^53es9y^+*t");
    expect(issueWithPassword.length).toBeGreaterThan(0)
//    2 digits
    issueWithPassword = await checkPasswordValidity("ZUmtbUWL!BjVRWw$=*_");
    expect(issueWithPassword.length).toBeGreaterThan(0)
//    no spaces
    issueWithPassword = await checkPasswordValidity("_rtR=s2y*PC4 xP!%2 pM");
    expect(issueWithPassword.length).toBeGreaterThan(0)
//    not common
    issueWithPassword = await checkPasswordValidity("Passw0rd");
    expect(issueWithPassword.length).toBeGreaterThan(0)
    issueWithPassword = await checkPasswordValidity("Password123");
    expect(issueWithPassword.length).toBeGreaterThan(0)
} )