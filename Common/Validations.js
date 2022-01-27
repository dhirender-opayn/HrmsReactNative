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
      if(password.length < 5) return "Password Should be Grater then 5 Charaters Long."
      return ''
  }
}