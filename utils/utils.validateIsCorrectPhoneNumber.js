export const  validatePhoneNumberFormate = async (phoneNumber) => {
     const phoneRegex = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/;
     const ph = /^((\+1)?[\s-]?)?\(?[1-9]\d\d\)?[\s-]?[1-9]\d\d[\s-]?\d\d\d\d/;
    const p =/^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/

     if(phoneNumber.match(ph)) {
        return true;
    }
    else {
        return false;
    }
}