import { List, ListItem, Typography } from "@material-ui/core";
import { HospitalCapacityContextualisation } from "../pandemic";

const ContextFactualisation = (props) => {
  //const { covidState } = props.covidState;
  const sir = props.sir;

  const HospitalCapacityMessage = (overflow) => {
      let message = "";
      if (overflow >= 0) message = "SUCCESS! The NHS will be able to treat everyone who needs treatment";
      else {
          message = "WARNING! Under the measures you have chosen, the NHS will have to turn away " + Math.abs(Math.round(overflow)) + " sick and dying people.";
      }
      return message;
  }

  return (
    <>
      <Typography variant="body2">Under these measures:</Typography>
      <List>{/*
        <ListItem>
          <Typography>
            Hospital beds would be full in{" "}
            {covidState.pandemic.getDaysUntilHospitalCapacity(1)} days.
          </Typography>
          <HospitalCapacityContextualisation daysUntil={covidState.pandemic.getDaysUntilHospitalCapacity(1)}/>

        </ListItem>*/}
        <ListItem>
          <Typography>
              <em>The aim of this simulation is to 'flatten the curve' to keep the cases below the hospital bed capacity, choose stronger measures to avoid unnecessary deaths</em>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              {HospitalCapacityMessage(sir.getTotalHospitalCapacityOverFlow())}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              ICU beds would be full in ? days
          </Typography>
        </ListItem>
          <ListItem>
              <Typography>
                  ICU beds would be full in ? days
              </Typography>
          </ListItem>
          <ListItem>
              <Typography>
                  ICU beds would be full in ? days
              </Typography>
          </ListItem>
      </List>
    </>
  );
};

export default ContextFactualisation;
