import React, { useState } from "react";
import {
  AppBar,
  CssBaseline,
  Grid,
  Paper,
  Slider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Visualisations from "./Visualisations";
import { makeStyles } from "@material-ui/core/styles";
import { Pandemic } from "./pandemic";
import PreventativeMeasures from "./components/PreventativeMeasures";
import ContextFactualisation from "./components/ContextFactualisation";

// TEMP
import Graph from "./components/LineGraph";
import SIR from "./components/SIR";
import BarChart from "./components/BarChart";
// TEMP

const useStyles = makeStyles((theme) => ({
  content: {
    height: "calc(100vh - 48px)",
    width: "calc(100vw - (100vw - 100%))",
    overflowX: "hidden",
    overflowY: "hidden",
  },

  centerTitle: {
    display: "grid",
    placeItems: "center",
  },
  title: {
    display: "flex",
  },

  sideBar: {
    height: "100%",
    padding: theme.spacing(1),
  },
  sideBarBoxOuter: {
    height: `calc(50% - ${theme.spacing(2)}px)`,
    padding: theme.spacing(1),
  },
  sideBarBoxInner: {
    height: `calc(100% - ${theme.spacing(2)}px)`,
    padding: theme.spacing(2),
    overflowY: "scroll",
  },

  graphsContainer: {
    height: `calc(100vh - 48px - ${theme.spacing(4)}px)`,
    padding: theme.spacing(1),
  },
  graphsBoxOuter: {
    height: "100%",
    width: "100%",
    padding: theme.spacing(1),
  },
  sliderContainer: {
    paddingLeft: "70px",
  },

  barChart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const App = () => {
  const classes = useStyles();

  const FACTORS = {
    // avg num ppl someone infected is exposed to per day
    CLOSE_EDUCATION: 0.76,
    PUBLIC_TRANSPORT_REDUCED: 0.9,
    AVOID_GROUPS: 0.76,
    // probability of each exposure becoming an infection
    HANDWASHING: 0.95,
    MASKS: 0.8,
    OUTDOOR_SOCIALISING: 0.8,
    SOCIALDISTANCING: 0.8,
  };

  // FACTORS I COULD ADD:
  /*
  - Working from home
  - Avoiding groups of 6+ ppl
  - Visiting public places less
  */

  const MODEL_DEFAULTS = {
    casesOnDay0: 1000,
    infectedAvgExposures: 15,
    probInfectFromExpose: 0.15,
    popSize: 5463300, // actual population
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
      close_education: 1,
      public_transport_reduced: 1,
      outdoor_socialising: 1,
      avoid_groups: 1,
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
      close_education: 1,
      public_transport_reduced: 1,
      outdoor_socialising: 1,
      avoid_groups: 1,
    },
  });

  // TEMP
  const [days, setDays] = useState(41);

  const baseContactRate = 0.5;
  const [contactRate1, setContactRate1] = useState(baseContactRate);
  const pandemic1 = new SIR(contactRate1);

  const [contactRate2, setContactRate2] = useState(baseContactRate);
  const pandemic2 = new SIR(contactRate2);

  return (
    <>
      <CssBaseline />
      <AppBar elevation={0} position="static">
        <Toolbar variant="dense">
          <Typography
            component="h1"
            variant="h6"
            style={{ flexGrow: 1 }}
            align="center"
          >
            COVIDUALISE: A Visualisation Tool For COVID-19 Infection Rates in
            Scotland
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container component="main" className={classes.content}>
        {/* Preventative Measures */}
        <Grid item xs={2} className={classes.sideBar}>
          <div className={classes.centerTitle}>
            <Typography component="h2" variant="subtitle1">
              Preventative Measures
            </Typography>
          </div>

          <div className={classes.sideBarBoxOuter}>
            <Typography align="center" component="h2" variant="subtitle2">
              Model 1
            </Typography>
            <Paper variant="outlined" className={classes.sideBarBoxInner}>
              <PreventativeMeasures
                baseContactRate={baseContactRate}
                pandemic={pandemic1}
                setContactRate={setContactRate1}
              />
            </Paper>
          </div>

          <div className={classes.sideBarBoxOuter}>
            <Typography align="center" component="h2" variant="subtitle2">
              Model 2
            </Typography>
            <Paper variant="outlined" className={classes.sideBarBoxInner}>
              <PreventativeMeasures
                baseContactRate={baseContactRate}
                pandemic={pandemic2}
                setContactRate={setContactRate2}
              />
            </Paper>
          </div>
        </Grid>

        {/* Visualation and Graphing */}
        <Grid item xs={7} className={classes.graphsContainer}>
          <div className={classes.centerTitle}>
            <Typography component="h2" variant="subtitle1">
              Visualisation and Graphing
            </Typography>
          </div>

          <Grid container>
            <Grid item xs={6} className={classes.graphsBoxOuter}>
              {/* TEMP */}
              <Graph pandemic={pandemic1.simulation} days={days} />
              <div className={classes.sliderContainer}>
                <Slider
                  onChangeCommitted={(e, newVal) => setDays(newVal)}
                  defaultValue={41}
                  min={20}
                  max={120}
                  valueLabelDisplay="auto"
                />
              </div>
              <Graph pandemic={pandemic2.simulation} days={days} />
            </Grid>
            <Grid item xs={6} className={classes.barChart}>
              <Typography>Cases and deaths at day {days}</Typography>
              <BarChart
                pandemic1={pandemic1}
                pandemic2={pandemic2}
                days={days}
              />
            </Grid>

            {/* <Visualisations
              pandemicState={covid1.pandemic}
              pandemicState2={covid2.pandemic}
            /> */}
          </Grid>
        </Grid>

        {/* Context and Factualisation */}
        <Grid item xs={3} className={classes.sideBar}>
          <div className={classes.centerTitle}>
            <Typography component="h2" variant="subtitle1">
              Context and Factualisation
            </Typography>
          </div>

          <div className={classes.sideBarBoxOuter}>
            <Typography align="center" component="h2" variant="subtitle2">
              Model 1
            </Typography>
            <Paper variant="outlined" className={classes.sideBarBoxInner}>
              <ContextFactualisation covidState={covid1} sir={pandemic1} days={days}/>
            </Paper>
          </div>

          <div className={classes.sideBarBoxOuter}>
            <Typography align="center" component="h2" variant="subtitle2">
              Model 2
            </Typography>
            <Paper variant="outlined" className={classes.sideBarBoxInner}>
              <ContextFactualisation covidState={covid2} sir={pandemic2} days={days}/>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
