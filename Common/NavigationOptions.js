const ImagesPath = require("../images/ImagesPath");
const { color } = require("./Colors");
const fonts = require("./fonts");

module.exports = {
    NavHeaderStyle: title =>{
      return {headerStyle: {
          backgroundColor: color.backgroundBlack,
          shadowOpacity: 0,
          marginHorizontal:24,
        }, 
        headerShadowVisible: false, 
        headerBackTitleVisible: false, 
        headerTitleStyle:{color:"white"}, 
        title: title,
        // headerBackImageSource:ImagesPath.backImg, 
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: fonts.semiBold,
          fontSize: 20,
        },
        
      }
  }
}