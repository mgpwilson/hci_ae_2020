import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Info from "./Info";

const useStyles = makeStyles({
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
  },
});

const PreventativeMeasures = (props) => {
  const { baseContactRate, pandemic, setContactRate } = props;
  const classes = useStyles();

  const factorValues = {
    // avg num ppl someone infected is exposed to per day
    closeEducation: 0.76,
    reducedPublicTransport: 0.9,
    avoidGroups: 0.76,
    travelQuarantine: 0.95,
    workFromHome: 0.75,
    contactTracing: 0.8,
    // probability of each exposure becoming an infection
    handWashing: 0.95,
    masks: 0.8,
    outdoorSocialising: 0.8,
    socialDistancing: 0.8,
    closeIndoorDining: 0.8,
  };

  const [factorState, setFactorState] = useState({
    closeEducation: false,
    reducedPublicTransport: false,
    avoidGroups: false,
    travelQuarantine: false,
    workFromHome: false,
    contractTracing: false,
    handWashing: false,
    masks: false,
    outdoorSocialising: false,
    socialDistancing: false,
    closeIndoorDining: false,
  });

  const toggleFactor = (factor) => {
    setFactorState((prevState) => ({
      ...prevState,
      [factor]: !prevState[factor],
    }));
  };

  useEffect(() => {
    let newContactRate = baseContactRate;
    for (const [factor, value] of Object.entries(factorValues)) {
      newContactRate = factorState[factor]
        ? newContactRate * value
        : newContactRate;
    }
    pandemic.setContactRate(newContactRate);
    setContactRate(newContactRate);
  }, [factorState]);

  // console.log(factorState);

  return (
    <FormGroup>
      <FormLabel component="legend">Infection Risk</FormLabel>
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Hand Washing</Typography>{" "}
            <Info infoString="Everyone washes their hands regularly." />
          </div>
        }
        onChange={() => {
          toggleFactor("handWashing");
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Social Distancing</Typography>{" "}
            <Info infoString="Everyone maintains 2 metre social distancing." />
          </div>
        }
        onChange={() => {
          toggleFactor("socialDistancing");
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Masks</Typography>{" "}
            <Info infoString="Everyone wears a mask and wears it correctly." />
          </div>
        }
        onChange={() => {
          toggleFactor("masks");
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Close Indoor Dining</Typography>{" "}
            <Info infoString="Close restaurants and other indoor dining where customers must take off their masks in an enclosed space." />
          </div>
        }
        onChange={() => {
          toggleFactor("closeIndoorDining");
        }}
      />
      <FormLabel component="legend">Frequency of Exposure</FormLabel>
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Close Education</Typography>{" "}
            <Info infoString="All primary and secondary education is closed." />
          </div>
        }
        onChange={() => {
          toggleFactor("closeEducation");
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Reduced Public Transport</Typography>{" "}
            <Info infoString="Public trasport capacity is restricted." />
          </div>
        }
        onChange={() => {
          toggleFactor("reducedPublicTransport");
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Outdoors Only Socialising</Typography>{" "}
            <Info infoString="Socialising between people is restricted to being outdoors only." />
          </div>
        }
        onChange={() => {
          toggleFactor("outdoorSocialising");
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Avoid Groups</Typography>{" "}
            <Info infoString="Avoid groups larger than 6 people and contact between households." />
          </div>
        }
        onChange={() => {
          toggleFactor("avoidGroups");
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Travel Quarantine</Typography>{" "}
            <Info infoString="Quarantine all travelers arriving from outside the country." />
          </div>
        }
        onChange={() => {
          toggleFactor("travelQuarantine");
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Work From Home</Typography>{" "}
            <Info infoString="Everyone who can work from home, works from home." />
          </div>
        }
        onChange={() => {
          toggleFactor("workFromHome");
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Contact Tracing</Typography>{" "}
            <Info infoString="Contact tracing for all known cases (untested cases will not be traced)." />
          </div>
        }
        onChange={() => {
          toggleFactor("contactTracing");
        }}
      />
    </FormGroup>
  );
};

export default PreventativeMeasures;
