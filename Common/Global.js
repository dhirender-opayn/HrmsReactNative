module.exports = {
  
    projct:{
        BASE_URL: 'http://3.22.185.42/hrms-api/public/api/',
        filesURL: 'http://3.22.185.42/hrms-api/public/uploads/',
        ios:{
            BASE_URL: 'http://3.22.185.42/hrms-api/public/api/',
            COLOR_TEXT: 'white',
            REQLOGIN:'login',
            maincolor:'black',
            headerTitleColor:'#ED7D7979',
            alertColor:'#ff1e46',
            mainFontFamily:'',

            RESETPASSWORD : "reset-possword",

            forgetpassword:'forget-password',
            code:'code',
            password:"password",
            confirm_password:"confirm_password",
            //etc

        },
        android:{
            BASE_URL: 'http://3.22.185.42/hrms-api/public/api/',
            COLOR_TEXT: 'white',
            REQLOGIN:'login',
            maincolor:'black',
            headerTitleColor:'#ED7D7979',
            alertColor:'#ff1e46',
            title:'Opayn HRMS',

            RESETPASSWORD : "reset-possword",

            forgetpassword:'forget-password',
            code:'code',
            password:"password",
            confirm_password:"confirm_password",
          
        },
        apiSuffix:{
            login: "login",
            addTicket: "ticket",
            changePassword: "change-password",
            logout: "logout",
            ATTANDANCE: "attendance",
 
        },
        apiPrams:{
            lat:"lat",
            lng:"lng",
            time:"timing",
            type:"type",
            AuthToken : ""
           
        },
        dateFormates:{
            YearMonthDateTime : "YYYY-MM-DD HH:mm:ss",
        },
        leaveDateTypes:{
            StartDate: "Start Date",
            EndDate: "End Date",
            StartTime: "Start Time",
            EndTime: "End Time"
        }
    }
   
    
  };