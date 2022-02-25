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
      if(password.length < 5) return "Please enter a valid passworder of atleast 5 charaters."
      return ''
    },
    NameValidation:name =>{
      if(!name) return "Please enter name."
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
    }
}