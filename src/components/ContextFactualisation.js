import { List, ListItem, Typography } from "@material-ui/core";
import { HospitalCapacityContextualisation } from "../pandemic";

const ContextFactualisation = (props) => {
  //const { covidState } = props.covidState;
  const sir = props.sir;

    let HospitalCapacityMessage = (overflow) => {
        let message = "";
        if (overflow >= 0) message = "SUCCESS! The NHS will be able to treat everyone who needs treatment";
        else {
            message = "WARNING! Under the measures you have chosen, the NHS will have to turn away " + Math.abs(Math.round(overflow)) + " sick and dying people.";
        }
        return message;
    }

    let VentilatorCapacityMessage = (overflow) => {
        let message = "";
        if (overflow >= 0) message = "SUCCESS! Everyone who needs a ventilator will be able to use one";
        else {
            message = "WARNING! Under the measures you have chosen, " + Math.abs(Math.round(overflow)) + " people who need ventilators to breathe will be unable to use one. This may result in death.";
        }
        return message;
    }

    let CaseRatio = () => {
        let r = Math.round(sir.popSize / sir.getTotalInfections());
        console.log(r);
        return r;
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
              {VentilatorCapacityMessage(sir.getTotalVentilatorCapacityOverFlow())}
          </Typography>
        </ListItem>
          <ListItem>
              <Typography>
                  1 in {CaseRatio} people would be infected in the first 3 months
              </Typography>
          </ListItem>
          <ListItem>
              <Typography>
                  1 in __ people would die
              </Typography>
          </ListItem>
      </List>
    </>
  );
};

export default ContextFactualisation;
