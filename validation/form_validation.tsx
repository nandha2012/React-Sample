import validator from 'validator';
export const isValid = (field: string, fieldValue: string, action: any): any => {

    switch (field) {
        case "emailId":
            if (fieldValue !== "" && validateEmail(fieldValue) && fieldValue.length < 39) {
                action.removeError("error_email")
                action.addError("error_validate")
            }
            else {
                action.addError("error_email")
                action.removeError("error_validate")
            }
            break;
        case "mobile":
            if (fieldValue !== "" && validateMobile(fieldValue)) {
                action.removeError("error_mobile");
                action.addError("error_validate")
            }
            else {
                action.addError("error_mobile")
                action.removeError("error_validate")
            }
            break;
        case "password":
            if (fieldValue !== "" && (validPassword(fieldValue) >= 20.1)) {
                action.removeError("error_password")
                action.addError("error_validate")
            }
            else {
                console.log(fieldValue)
                console.log(fieldValue.length)
                action.addError("error_password")
                action.removeError("error_validate")
            }
            break;
        case "confirmPassword":
            let password = action.state.formReducer.password;
            let confirmPassword = action.state.formReducer.confirmPassword;
            if ((confirmPassword !== "") && confirmPassword === password) {
                action.removeError("error_Cpassword")
                action.addError("error_validate")
            }
            else {
                action.addError("error_Cpassword")
                action.removeError("error_validate")

            }
            break;

        default:
            return;
    }
}
export const validateEmail = (emailId: string): boolean => {
    //console.log(validator.isEmail(emailId));
    return validator.isEmail(emailId, { domain_specific_validation: true });
}
export const validateMobile = (mobileNum: string) => {
    return validator.isMobilePhone("+91" + mobileNum, 'en-IN')
}
export const validPassword = (password: string) => {
   let passwordValue = validator.isStrongPassword(password,{returnScore:true});
   console.log(passwordValue)
    return passwordValue;
}