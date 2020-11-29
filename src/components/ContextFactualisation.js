import { List, ListItem, Typography } from "@material-ui/core";

const ContextFactualisation = (props) => {
  const { covidState } = props;

  return (
    <>
      <Typography variant="body2">Under these measures:</Typography>
      <List>
        <ListItem>
          <Typography>
            Hospital beds would be full in{" "}
            {covidState.pandemic.getDaysUntilHospitalCapacity(1)} days.
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default ContextFactualisation;
