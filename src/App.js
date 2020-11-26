import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import Visualisations from "./Visualisations";
import { makeStyles } from "@material-ui/core/styles";
import { Pandemic } from "./pandemic";
import PandemicSlider from "./PandemicSlider";

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

  const FACTORS = {
    HANDWASHING: 1 - 0.05,
    SOCIALDISTANCING: 0.6,
    MASKS: 1 - 0.1,
  };
  const MODEL_DEFAULTS = {
    casesOnDay0: 1000,
    infectedAvgExposures: 12,
    probInfectFromExpose: 0.2,
    popSize: 5463300, // actual population
    // popSize: 1000000,
    hospitalCapacity: 500000,
    avgLengthOfInfection: 14,
  };

  const [covid1, setCovid1] = useState({
    pandemic: new Pandemic(MODEL_DEFAULTS.casesOnDay0, MODEL_DEFAULTS.infectedAvgExposures, MODEL_DEFAULTS.probInfectFromExpose, MODEL_DEFAULTS.popSize, MODEL_DEFAULTS.hospitalCapacity),
    factors: {
      handWashing: 1,
      socialDistancing: 1,
      masks: 1,
    },
  });
  const [covid2, setCovid2] = useState({
    pandemic: new Pandemic(MODEL_DEFAULTS.casesOnDay0, MODEL_DEFAULTS.infectedAvgExposures, MODEL_DEFAULTS.probInfectFromExpose, MODEL_DEFAULTS.popSize, MODEL_DEFAULTS.hospitalCapacity),
    factors: {
      handWashing: 1,
      socialDistancing: 1,
      masks: 1,
    },
  });

  const days = 0;

  const toggleFactor = (factor, covidState, setCovidState) => {
    let newState = covidState;

    if (newState.factors[factor] === 1) {
      newState.factors[factor] = FACTORS[factor.toUpperCase()];
    } else {
      newState.factors[factor] = 1;
    }

    setCovidState({pandemic: newState.pandemic, factors: newState.factors});
    newState.pandemic.updateFactors(newState.factors);
  };

  return (
    <>
      <Typography variant="h5" component="h1" className={classes.title}>
        COVIDUALISE: A Visualisation Tool For COVID-19 Infection Rates
      </Typography>

      <Grid container component="main" className={classes.content}>
        <Grid item xs={2} className={classes.column}>
          <Typography variant="h6" component="h2" className={classes.rowTitle}>
            Preventative Measures
          </Typography>
          <Grid item className={classes.row}>
            <Typography
              variant="h6"
              component="h2"
              className={classes.rowTitle}
            >
              Model 1
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Hand Washing"
                onChange={(event) => {
                  toggleFactor("handWashing", covid1, setCovid1);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Social Distancing"
                onChange={() => {
                  toggleFactor("socialDistancing", covid1, setCovid1);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Masks"
                onChange={() => {
                  toggleFactor("masks", covid1, setCovid1);
                }}
              />
              <FormControlLabel control={<Checkbox />} label="Foo" />
              <FormControlLabel control={<Checkbox />} label="Bar" />
              <FormControlLabel control={<Checkbox />} label="One" />
              <FormControlLabel control={<Checkbox />} label="Two" />
              <FormControlLabel control={<Checkbox />} label="Three" />
              <FormControlLabel control={<Checkbox />} label="Four" />
            </FormGroup>
            {/*<Button title='Recalculate' variant='contained' color='primary'>
                Recalculate
              </Button>*/}
          </Grid>
          <Grid item className={classes.row}>
            <Typography
              variant="h6"
              component="h2"
              className={classes.rowTitle}
            >
              Model 2
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Hand Washing"
                onChange={(event) => {
                  toggleFactor("handWashing", covid2, setCovid2);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Social Distancing"
                onChange={() => {
                  toggleFactor("socialDistancing", covid2, setCovid2);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Masks"
                onChange={() => {
                  toggleFactor("masks", covid2, setCovid2);
                }}
              />
              <FormControlLabel control={<Checkbox />} label="Foo" />
              <FormControlLabel control={<Checkbox />} label="Bar" />
              <FormControlLabel control={<Checkbox />} label="One" />
              <FormControlLabel control={<Checkbox />} label="Two" />
              <FormControlLabel control={<Checkbox />} label="Three" />
              <FormControlLabel control={<Checkbox />} label="Four" />
            </FormGroup>
            {/*<Button title='Recalculate' variant='contained' color='primary'>
                Recalculate
              </Button>*/}
          </Grid>
        </Grid>

        <Grid item xs={8} className={classes.column}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.columnTitle}
          >
            Visualisation and Graphing
          </Typography>
          {/*<img
                src="https://i.redd.it/ylu4wlgozgt51.jpg"
                alt=""
                className={classes.image}
              />*/}

          <Grid item className={classes.row}>
            <Typography
              variant="h6"
              component="h2"
              className={classes.columnTitle}
            >
              Model 1
            </Typography>
            <div id="pandemicTempDemo">
              <Visualisations pandemicState={covid1.pandemic} />
              <PandemicSlider pandemicState={covid1.pandemic} />
              <PandemicTempDemo
                dailyCases={covid1.pandemic.tempDemo()}
              ></PandemicTempDemo>
            </div>
          </Grid>

          <Grid item className={classes.row}>
            <Typography
              variant="h6"
              component="h2"
              className={classes.columnTitle}
            >
              Model 2
            </Typography>
            <div id="pandemicTempDemo">
              <Visualisations pandemicState={covid2.pandemic} />
            </div>
          </Grid>
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

const PandemicTempDemo = (props) => {
  const dailyCases = props.dailyCases;
  const listItems = dailyCases.map((day) => (
    <li key={day.dayNum.toString()}>
      Day {day.dayNum.toString()}: {day.cases.toString()} cases
    </li>
  ));
  return (
    <ul style={{ listStyleType: "none", paddingLeft: 30, textAlign: "left" }}>
      {listItems}
    </ul>
  );
};

/*App.propTypes = {
  classes: PropTypes.object.isRequired,
};*/

export default App;
