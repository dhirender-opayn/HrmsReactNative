const { color } = require("./Colors");

module.exports = {
     EmailValidation : email => {
      const re = /\S+@\S+\.\S+/;
      if (!email) return "Please enter email."
      if (!re.test(email)) return 'Please enter a valid email.'
      return ''
    },
    MobileValidation : mobile => {
        const reg = /^[0]?[6789]\d{9}$/;
        if (!mobile) return "Please enter mobile number."
        if (!reg.test(mobile)) return 'Please enter a valid mobile number.'
        return ''
    },
    PasswordValidation: password =>{
      if(!password) return "Please enter password."
      if(password.length < 5) return "Please enter a valid password of atleast 5 charaters."
      return ''
    },
    NameValidation:name =>{
      if(!name) return "Please enter name."
      return ''
    },
    OtpValidation: otp =>{
      if(!otp) return "Please enter otp"
      if(otp.length != 4) return "Please enter all 4 digits of otp."
      return ''
  },
    SubjectValidation:subject =>{
        if(!subject) return "Please enter subject."
        return ''
    },
    TitleValidation:subject =>{
      if(!subject) return "Please enter title."
      return ''
  },
    DescriptonValidation:description => {
        if (!description) return "Please enter description."
        return ''
    },
    FieldValidation : inputText => {
      if (!inputText) return "Please enter "
      return ''
    },
    EmptyFieldStr : fieldName => {
      return "Please enter "+fieldName
    },
    UnselectFieldStr : fieldName => {
      return "Please select "+fieldName
    }
}