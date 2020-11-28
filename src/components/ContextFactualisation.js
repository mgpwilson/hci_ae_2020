import { Typography } from "@material-ui/core";

const ContextFactualisation = (props) => {
  const { covidState } = props;

  return (
    <Typography>
      Hospital beds will be full in{" "}
      {covidState.pandemic.getDaysUntilHospitalCapacity(1)} days.
    </Typography>
  );
};

export default ContextFactualisation;
