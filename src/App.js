import React, { useState } from "react";
import {
  AppBar,
  CssBaseline,
  Grid,
  Paper,
  Slider,
  Toolbar,
  Typography,
  Popover,
  Box,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { makeStyles } from "@material-ui/core/styles";

import PreventativeMeasures from "./components/PreventativeMeasures";
import ContextFactualisation from "./components/ContextFactualisation";
import Graph from "./components/LineGraph";
import SIR from "./components/SIR";
import BarChart from "./components/BarChart";

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
    marginTop: "2em",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    paddingLeft: "70px",
    paddingRight: "20px",
    paddingBottom: "10px",
    width: "100%",
  },
  slider: {
    paddingTop: "20px",
  },
  barChart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  lineGraph: {
    paddingTop: "0px",
  },
  popover: {
    pointerEvents: "none",
  },
}));

const App = () => {
  const classes = useStyles();

  // TEMP
  const [days, setDays] = useState(41);

  const baseContactRate = 0.5;
  const [contactRate1, setContactRate1] = useState(baseContactRate);
  const pandemic1 = new SIR(contactRate1);

  const [contactRate2, setContactRate2] = useState(baseContactRate);
  const pandemic2 = new SIR(contactRate2);

  const sliderMarks = [
    {
      value: 30,
      label: "30 days",
    },
    {
      value: 60,
      label: "60 days",
    },
    {
      value: 90,
      label: "90 days",
    },
    {
      value: 120,
      label: "120 days",
    },
  ];

  function sliderValuetext(value) {
    return `${value} days`;
  }

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
              <b>Step 1: Settings</b>
            </Typography>
            <Typography component="h6" variant="body2">
              Customise the behaviour of two simulated populations
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
              <b>Step 2: Compare Pandemic Growth</b>
            </Typography>
            <Typography component="h6" variant="subtitle1">
              The visualisations below show how an identical pandemic spreads
              differently depending on the behaviour of the two populations
            </Typography>
          </div>

          <Grid container>
            <Grid item xs={6} className={classes.graphsBoxOuter}>
              <Graph
                pandemic={pandemic1.simulation}
                days={days}
                className={classes.lineGraph}
              />
              <Graph pandemic={pandemic2.simulation} days={days} />
            </Grid>
            <Grid item xs={6} className={classes.barChart}>
              <div className={classes.sliderContainer}>
                <Typography id="discrete-slider-always" gutterBottom>
                  Adjust Simulation Length
                </Typography>
                <Slider
                  onChangeCommitted={(e, newVal) => setDays(newVal)}
                  defaultValue={41}
                  getAriaValueText={sliderValuetext}
                  aria-labelledby="discrete-slider-custom"
                  min={20}
                  max={120}
                  marks={sliderMarks}
                  valueLabelDisplay="auto"
                  className={classes.slider}
                />
              </div>

              <Typography
                className={classes.centerTitle}
                style={{ marginLeft: "1.5em" }}
              >
                Total people affected at day {days}
              </Typography>
              <BarChart
                pandemic1={pandemic1}
                pandemic2={pandemic2}
                days={days}
                name={"Total people"}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Context and Factualisation */}
        <Grid item xs={3} className={classes.sideBar}>
          <div className={classes.centerTitle}>
            <Typography component="h2" variant="subtitle1">
              <b>Step 3: Context & Policy</b>
            </Typography>
            <Typography component="body1">
              <GameplayPopover />
            </Typography>
          </div>

          <div className={classes.sideBarBoxOuter}>
            <Typography align="center" component="h2" variant="subtitle2">
              Model 1
            </Typography>
            <Paper variant="outlined" className={classes.sideBarBoxInner}>
              <ContextFactualisation sir={pandemic1} days={days} />
            </Paper>
          </div>

          <div className={classes.sideBarBoxOuter}>
            <Typography align="center" component="h2" variant="subtitle2">
              Model 2
            </Typography>
            <Paper variant="outlined" className={classes.sideBarBoxInner}>
              <ContextFactualisation sir={pandemic2} days={days} />
            </Paper>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export const MouseOverPopover = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const hoverContents = props.hoverContents;
  const popoverContents = props.popoverContents;

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="body1"
      >
        {hoverContents}
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        width="75%"
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          style: { width: "50%" },
        }}
      >
        <Paper p={2} elevation={3} className={classes.popoverBox}>
          <Box p={2} className={classes.popoverBox}>
            {popoverContents}
          </Box>
        </Paper>
      </Popover>
    </div>
  );
};

const GameplayPopover = () => {
  const hoverContents = () => {
    return (
      <Typography variant="body1">
        Learn more about pandemic management by thinking like a leader{" "}
        <HelpIcon style={{ marginBottom: "-0.2em", paddingBottom: "-0.2em" }} />
      </Typography>
    );
  };

  const popoverContents = () => {
    return (
      <div>
        <Typography variant="h5">
          <MailOutlineIcon
            style={{ marginBottom: "-0.1em", paddingBottom: "-0.1em" }}
          />{" "}
          From: Nicola Sturgeon
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Nicola Sturgeon needs your help!
        </Typography>
        <Typography variant="body1" gutterBottom>
          The Scottish Parliament is entrusting you to pick Scotland's COVID
          policies for the next 120 days.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Use the simulation settings tool on the far left to pick from the
          available policies and compare their effectiveness. Your MPs will use
          the Game Feedback sections to message you feedback on your choices.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Keep Scotland safe!
        </Typography>
        <Typography variant="h5" gutterBottom style={{ marginTop: "1em" }}>
          Your Goal:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Your goal is to protect NHS Scotland until a vaccine is released.
        </Typography>
        <Typography variant="body1" gutterBottom>
          If daily infections outpace NHS Scotland's maximum capacity hospitals
          will start running out of beds and ventilators.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Hint: The aim of this simulation is to 'flatten the curve'. Choose
          stronger measures to avoid unnecessary deaths.
        </Typography>
        <Typography variant="body2" gutterBottom>
          <em>
            (The NHS Scotland maximum capacity is indicated on the graphs by a
            dashed purple line.)
          </em>
        </Typography>
      </div>
    );
  };

  return (
    <MouseOverPopover
      hoverContents={hoverContents()}
      popoverContents={popoverContents()}
    />
  );
};

export default App;
