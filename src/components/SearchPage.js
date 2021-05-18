import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { red } from '@material-ui/core/colors';
import ListScreen from './ListScreen';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: "center", 
    width: '100%',
    marginTop:"35%",
    backgroundColor:'blanchedalmond',
  },
  
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  
  },

   button: {
    margin: theme.spacing(2),
  },
   
}));

function SearchPage() {
  const classes = useStyles();
const Search = ()=>{
};
  return (
    <div className={classes.root} >
         <TextField
          id="outlined-full-width"
          style={{ margin: 7 },{backgroundColor:'red'}}
          placeholder="e.g Margarita"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined" 
        />

          <Button onClick={() => { alert('clicked') }}
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        </Button> 

    
     
      {/* <ListScreen SearchKey={Search}/> */}
    </div>
  );
}

export default SearchPage;
