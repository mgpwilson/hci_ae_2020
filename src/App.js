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
import LineGraph from "./components/LineGraph";
import Info from "./components/Info";

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
  },

  graphsContainer: {
    height: `calc(100vh - 48px - ${theme.spacing(4)}px)`,
    padding: theme.spacing(1),
  },
  graphsBoxOuter: {
    height: "50%",
    width: "50%",
    padding: theme.spacing(1),
  },
  sliderContainer: {
    width: "50%",
    paddingLeft: "70px",
    paddingRight: "10px",
  },
}));

const App = () => {
  const classes = useStyles();

  const MODEL_DEFAULTS = {
    casesOnDay0: 1000,
    infectedAvgExposures: 12,
    probInfectFromExpose: 0.2,
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

  const [days, setDays] = useState(41);

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
            COVIDUALISE: A Visualisation Tool For COVID-19 Infection Rates
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
                covidState={covid1}
                setCovidState={setCovid1}
              />
            </Paper>
          </div>

          <div className={classes.sideBarBoxOuter}>
            <Typography align="center" component="h2" variant="subtitle2">
              Model 2
            </Typography>
            <Paper variant="outlined" className={classes.sideBarBoxInner}>
              <PreventativeMeasures
                covidState={covid2}
                setCovidState={setCovid2}
              />
            </Paper>
          </div>
        </Grid>

        {/* Visualation and Graphing */}
        <Grid item xs={8} className={classes.graphsContainer}>
          <div className={classes.centerTitle}>
            <Typography component="h2" variant="subtitle1">
              Visualisation and Graphing
            </Typography>
          </div>

          <LineGraph pandemic={covid1} days={days} />
          <div className={classes.sliderContainer}>
            <Slider
              onChangeCommitted={(e, newVal) => setDays(newVal)}
              defaultValue={41}
              min={21}
              max={121}
              valueLabelDisplay="auto"
              valueLabelFormat={(x) => x - 1}
            />
          </div>
          <LineGraph pandemic={covid2} days={days} />
          {/* <Visualisations pandemicState={covid1.pandemic} /> */}
        </Grid>

        {/* Context and Factualisation */}
        <Grid item xs={2} className={classes.sideBar}>
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
              <ContextFactualisation covidState={covid1} />
            </Paper>
          </div>

          <div className={classes.sideBarBoxOuter}>
            <Typography align="center" component="h2" variant="subtitle2">
              Model 2
            </Typography>
            <Paper variant="outlined" className={classes.sideBarBoxInner}>
              <ContextFactualisation covidState={covid2} />
            </Paper>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
