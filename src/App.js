import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pandemic } from "./pandemic";


const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    padding: theme.spacing(3),
  },
  content: {
    padding: theme.spacing(3),
  },
  column: {
    textAlign: "center",
  },
  columnTitle: {
    paddingBottom: theme.spacing(3),
  },
  image: {
    maxWidth: "75%",
  },
}));

const App = () => {
  const classes = useStyles();

  // TODO these parameters should be adjustable by user somehow in the future
  var covid = new Pandemic(1000, 10, .11, 1000000, 500000);

  return (
    <>
      <Typography variant="h5" component="h1" className={classes.title}>
        COVIDUALISE: A Visualisation Tool For COVID-19 Infection Rates
      </Typography>

      <Grid container component="main" className={classes.content}>
        <Grid item xs={2} className={classes.column}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.columnTitle}
          >
            Preventative Measures
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Hand Washing" onChange={() => {
              covid.toggleHandWashing();
              console.log(covid.handWashing);
            }}/>
            <FormControlLabel control={<Checkbox />} label="Social Distancing" onChange={() => {
              covid.toggleSocialDistancing();
              console.log(covid.socialDistancing);
            }}/>
            <FormControlLabel control={<Checkbox />} label="Masks" onChange={() => {
              covid.toggleMasks();
              console.log(covid.masks);
            }}/>
            <FormControlLabel control={<Checkbox />} label="Foo" />
            <FormControlLabel control={<Checkbox />} label="Bar" />
            <FormControlLabel control={<Checkbox />} label="One" />
            <FormControlLabel control={<Checkbox />} label="Two" />
            <FormControlLabel control={<Checkbox />} label="Three" />
            <FormControlLabel control={<Checkbox />} label="Four" />
          </FormGroup>
        </Grid>

        <Grid item xs={8} className={classes.column}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.columnTitle}
          >
            Visualisation and Graphing
          </Typography>
          <img
            src="https://i.redd.it/ylu4wlgozgt51.jpg"
            alt=""
            className={classes.image}
          />
        </Grid>

        <Grid item xs={2} className={classes.column}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.columnTitle}
          >
            Context and Factualisation
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet et delectus accommodare his consul
            copiosae legendos at vix ad putent delectus delicata usu. Vidit
            dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum
            an. Per facer affert ut. Mei iisque mentitum
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
