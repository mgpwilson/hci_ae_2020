import { List, ListItem, Typography } from "@material-ui/core";
import { HospitalCapacityContextualisation } from "../pandemic";

const ContextFactualisation = (props) => {
  //const { covidState } = props.covidState;
  const sir = props.sir;
  const days= props.days;

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

    let InfectedRatio = (days) => {
        let r = sir.getTotalInfections(days) / sir.population;
        return (r).toPrecision(3);
    }

    let DeathRatio = (days) => {
        let r = sir.getTotalDeaths(days) / sir.population;
        return (r).toPrecision(3);
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
                  {InfectedRatio(days)}% of Scotland would be infected in the first {days} days.
              </Typography>
          </ListItem>
          <ListItem>
              <Typography>
                  {DeathRatio(days)}% people would die in the first {days} days.
              </Typography>
          </ListItem>
      </List>
    </>
  );
};

export default ContextFactualisation;
