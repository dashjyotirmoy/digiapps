import React from 'react';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const App  = () =>{
  const classes = useStyles();
        return (
          <div className={classes.root}>
          <Grid container spacing={3}>
                {this.props.children}
                </Grid>
            </div>
        )
    }

export default App;