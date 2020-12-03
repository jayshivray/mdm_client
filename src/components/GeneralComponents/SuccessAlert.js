import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts(props) {
  const classes = useStyles();
  console.log('success props',props);
  return (
    <div className={classes.root} style={props.style}>
      <Alert id={props.id} severity="success">{props.message}!</Alert>      
    </div>
  );
}
