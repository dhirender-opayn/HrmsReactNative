 module.exports = {
      EmailValidation : email => {
        const re = /\S+@\S+\.\S+/;
        if (!email) return "Email can't be empty."
        if (!re.test(email)) return 'Ooops! We need a valid email address.'
        return ''
    },
    NameValidation:name =>{
        if(!name) return "Name Can't Be Empty."
        return ''
    },
    PasswordValidation: password =>{
        if(!password) return "Password Can't Be Empty."
        if(password.length < 6) return "Password Should be Grater then 5 Charaters Long."
        return ''
    },
    OtpValidation: otp =>{
        if(!otp) return "Otp Can't Be Empty"
        if(otp.length != 4) return "Otp should be 4 digits"
        return ''
    }
}