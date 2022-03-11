 module.exports = {
      EmailValidation : email => {
        const re = /\S+@\S+\.\S+/;
        if (!email) return "Please enter email."
        if (!re.test(email)) return 'Please enter a valid email.'
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
    },
    NavHeaderStyle: title =>{
        return {headerStyle: {backgroundColor: color.backgroundBlack,
            shadowOpacity: 0}, headerShadowVisible: false, headerBackTitleVisible: false, 
          headerTitleStyle:{color:"white"}, title: title}
    }
}