import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
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

export default function EnterpriseStatusCard(props) {
  const classes = useStyles(); 

  return (
    <Card className={classes.root}>
      <CardContent>
        <Alert severity="success" style={{backgroundColor:'#c2f0c2'}}>You have completed activation for Android for Work.</Alert>
        <Typography variant="h6" component="h2" style={{marginBottom:'20px',marginTop:'10px'}}>
          Android Enterprise Setup
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <table className="table table-bordered m-0">
            <tbody>
              <tr>
                <td>Activation Status</td>
                <td>Activated</td>
              </tr>
              <tr>
                <td>Activated on</td>
                <td>{props.actdate}</td>
              </tr>   
              <tr>
                <td>Enterprise Name</td>
                <td>{props.name}</td>
              </tr> 
              <tr>
                <td>Enterprise Email</td>
                <td>{props.email}</td>
              </tr>
            </tbody>                                              
          </table>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
