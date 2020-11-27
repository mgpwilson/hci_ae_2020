import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";

const PreventativeMeasures = (props) => {
  const { covidState, setCovidState } = props;

  const FACTORS = {
    HANDWASHING: 1 - 0.05,
    SOCIALDISTANCING: 0.6,
    MASKS: 1 - 0.1,
    CLOSE_EDUCATION: 0.76,
    PUBLIC_TRANSPORT_REDUCED: 0.9,
    OUTDOOR_SOCIALISING: 0.8,
  };

  const toggleFactor = (factor, covidState, setCovidState) => {
    let newState = covidState;

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
      <FormControlLabel
        control={<Checkbox />}
        label="Hand Washing"
        onChange={(event) => {
          toggleFactor("handWashing", covidState, setCovidState);
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Social Distancing"
        onChange={() => {
          toggleFactor("socialDistancing", covidState, setCovidState);
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Masks"
        onChange={() => {
          toggleFactor("masks", covidState, setCovidState);
        }}
      />
    </FormGroup>
  );
};

export default PreventativeMeasures;
