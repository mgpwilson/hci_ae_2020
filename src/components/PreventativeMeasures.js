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
  const { pandemic, setPandemic, factors, setFactors } = props;
  const classes = useStyles();

  const FACTORS = {
    // avg num ppl someone infected is exposed to per day
    SOCIALDISTANCING: 0.85,
    CLOSE_EDUCATION: 0.76,
    PUBLIC_TRANSPORT_REDUCED: 0.9,
    // probability of each exposure becoming an infection
    HANDWASHING: 0.95,
    MASKS: 0.8,
    OUTDOOR_SOCIALISING: 0.8,
  };

  const toggleFactor = (factor) => {
    const newPandemic = pandemic;
    const newFactors = factors;

    if (newFactors[factor] === 1) {
      newFactors[factor] = FACTORS[factor.toUpperCase()];
    } else {
      newFactors[factor] = 1;
    }

    newPandemic.updateFactors(newFactors);
    setPandemic(newPandemic);
    setFactors(newFactors);
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
          toggleFactor("close_education");
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
          toggleFactor("public_transport_reduced");
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
          toggleFactor("outdoor_socialising");
        }}
      />
    </FormGroup>
  );
};

export default PreventativeMeasures;
