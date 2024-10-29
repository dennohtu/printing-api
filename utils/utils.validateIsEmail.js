 export const  validateEmail =   async (emailToCheck) => {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return !!emailToCheck.match(regexEmail);
}
