import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Visualisations from "./Visualisations";
import { makeStyles } from "@material-ui/core/styles";
import { Pandemic } from "./pandemic";
import PreventativeMeasures from "./components/PreventativeMeasures";
import ContextFactualisation from "./components/ContextFactualisation";

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
    pandemic: new Pandemic(
      MODEL_DEFAULTS.casesOnDay0,
      MODEL_DEFAULTS.infectedAvgExposures,
      MODEL_DEFAULTS.probInfectFromExpose,
      MODEL_DEFAULTS.popSize,
      MODEL_DEFAULTS.hospitalCapacity
    ),
    factors: {
      handWashing: 1,
      socialDistancing: 1,
      masks: 1,
    },
  });
  const [covid2, setCovid2] = useState({
    pandemic: new Pandemic(
      MODEL_DEFAULTS.casesOnDay0,
      MODEL_DEFAULTS.infectedAvgExposures,
      MODEL_DEFAULTS.probInfectFromExpose,
      MODEL_DEFAULTS.popSize,
      MODEL_DEFAULTS.hospitalCapacity
    ),
    factors: {
      handWashing: 1,
      socialDistancing: 1,
      masks: 1,
    },
  });

  const days = 0;

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
          <div>
            <Typography
              variant="h6"
              component="h2"
              className={classes.rowTitle}
            >
              Model 1
            </Typography>
            <PreventativeMeasures
              covidState={covid1}
              setCovidState={setCovid1}
            />
          </div>
          <div>
            <Typography
              variant="h6"
              component="h2"
              className={classes.rowTitle}
            >
              Model 2
            </Typography>
            <PreventativeMeasures
              covidState={covid2}
              setCovidState={setCovid2}
            />
          </div>
        </Grid>

        <Grid item xs={8} className={classes.column}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.columnTitle}
          >
            Visualisation and Graphing
          </Typography>
          <div>
            {/* <Typography
              variant="h6"
              component="h2"
              className={classes.columnTitle}
            >
              Model 1
            </Typography> */}
            <div id="pandemicTempDemo">
              <Visualisations pandemicState={covid1.pandemic} />
              {/* <PandemicSlider pandemicState={covid1.pandemic} /> */}
              {/* <PandemicTempDemo
                dailyCases={covid1.pandemic.tempDemo()}
              ></PandemicTempDemo> */}
            </div>
          </div>

          {/* <Grid item className={classes.row}>
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
          </Grid> */}
        </Grid>

        <Grid item xs={2} className={classes.column}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.columnTitle}
          >
            Context and Factualisation
          </Typography>

          <Typography variant="h6" component="h2" className={classes.rowTitle}>
            Model 1
          </Typography>
          <ContextFactualisation covidState={covid1} />

          <Typography variant="h6" component="h2" className={classes.rowTitle}>
            Model 2
          </Typography>
          <ContextFactualisation covidState={covid2} />
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
