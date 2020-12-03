import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';      //for bootstrap 

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function EnterpriseInfoCard() {
  const classes = useStyles();  

  return (
    <Card className={classes.root}>
      <CardContent>        
        <Typography variant="h6" component="h2" style={{marginBottom:'20px',marginTop:'10px'}}>
          Q. How to enroll Android Devices?
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <ol>
            <li>
              This feature is supported on Android 6.0 onwards. 
              You would need a new device or a device that has been factory reset. 
              Once you power on the device Select your Language and Country.
            </li>
            <li>Configure a Wifi Connection - this is required to download Scalefusion in the next step.</li>
            <li>When the device asks you to enter your GMail account, then enter afw#mobilock and tap Next.</li>
            <li>The device will download Scalefusion client.</li>
            <li>Follow the onscreen instructions and you should see Scalefusion setup page.</li>
            <li>Use your email/password or License key to complete setup.</li>
          </ol>                   
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
