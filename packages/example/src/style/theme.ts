import {createTheme} from "@material-ui/core/styles";

export const theme = createTheme({
  palette:{    
    background:{
      default: "#121212"
    },
    type:"dark",
  }
});

export const card_style = {
  button:{
    borderColor:"rgba(212,43,105,1)",
    borderRadius: "20px",
    color:"rgba(212,43,105,1)"
  },
  card: {
    background: "#1d1d1d",
    borderRadius: "25px",
    boxShadow: "5px 10px 20px rgba(0,0,0,0.5),-5px -5px 20px rgba(0,0,0,0.5),5px -5px 20px rgba(0,0,0,0.5)",
    height: "100%"
  },
  table: {
    background: "#1d1d1d",
  }
};