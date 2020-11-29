import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Info from "./Info";

const useStyles = makeStyles({
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
  },
});

const PreventativeMeasures = (props) => {
  const { covidState, setCovidState } = props;
  const classes = useStyles();

  const FACTORS = {
      // avg num ppl someone infected is exposed to per day
      SOCIALDISTANCING: 0.85,
      CLOSE_EDUCATION: 0.76,
      PUBLIC_TRANSPORT_REDUCED: 0.9,
      // probability of each exposure becoming an infection
      HANDWASHING: 0.95,
      MASKS: .8,
      OUTDOOR_SOCIALISING: 0.8,
  };

  const toggleFactor = (factor, covidState, setCovidState) => {
    const newState = covidState;

    if (newState.factors[factor] === 1) {
      newState.factors[factor] = FACTORS[factor.toUpperCase()];
    } else {
      newState.factors[factor] = 1;
    }

    newState.pandemic.updateFactors(newState.factors);
    setCovidState({ pandemic: newState.pandemic, factors: newState.factors });
  };

  return (
    <FormGroup>
      <FormLabel component="legend">Probability</FormLabel>
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Hand Washing</Typography>{" "}
            <Info infoString="Everyone washes their hands regularly." />
          </div>
        }
        onChange={() => {
          toggleFactor("handWashing", covidState, setCovidState);
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
          toggleFactor("socialDistancing", covidState, setCovidState);
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
          toggleFactor("masks", covidState, setCovidState);
        }}
      />

      <FormLabel component="legend">Infection</FormLabel>
      <FormControlLabel
        control={<Checkbox />}
        label={
          <div className={classes.checkboxLabel}>
            <Typography variant="body2">Close Education</Typography>{" "}
            <Info infoString="All primary and secondary education is closed." />
          </div>
        }
        onChange={() => {
          toggleFactor("close_education", covidState, setCovidState);
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
          toggleFactor("public_transport_reduced", covidState, setCovidState);
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
          toggleFactor("outdoor_socialising", covidState, setCovidState);
        }}
      />
    </FormGroup>
  );
};

export default PreventativeMeasures;
