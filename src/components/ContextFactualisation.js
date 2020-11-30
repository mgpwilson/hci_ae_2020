import { List, ListItem, Typography } from "@material-ui/core";
import { HospitalCapacityContextualisation } from "../pandemic";

const ContextFactualisation = (props) => {
  const { covidState } = props;

  return (
    <>
      <Typography variant="body2">Under these measures:</Typography>
      <List>
        <ListItem>
          {/*<Typography>
            Hospital beds would be full in{" "}
            {covidState.pandemic.getDaysUntilHospitalCapacity(1)} days.
          </Typography>*/}
          <HospitalCapacityContextualisation daysUntil={covidState.pandemic.getDaysUntilHospitalCapacity(1)}/>
        </ListItem>
      </List>
    </>
  );
};

export default ContextFactualisation;
