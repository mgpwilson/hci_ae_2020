import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
    withStyles
} from "@material-ui/core";
import Visualisations from './Visualisations'
import { makeStyles } from "@material-ui/core/styles";
import {Pandemic, PandemicModel, PandemicStatefulDemo} from "./pandemic";
import * as React from "react";
import PandemicSlider from "./PandemicSlider";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    padding: theme.spacing(3),
  },
  content: {
    padding: theme.spacing(3),
  },
  column: {
    textAlign: "center",
  },
  columnTitle: {
    paddingBottom: theme.spacing(3),
  },
  image: {
    maxWidth: "75%",
  },
}));

// can't use useStyles in class components, feel free to take this out
const styles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    padding: theme.spacing(3),
  },
  content: {
    padding: theme.spacing(3),
  },
  column: {
    textAlign: "center",
  },
  columnTitle: {
    paddingBottom: theme.spacing(3),
  },
  image: {
    maxWidth: "75%",
  },
}));


class App extends React.Component {
  constructor(props) {
    super(props);
    this.classes = styles;

    // TODO these parameters should be adjustable by user somehow in the future
    this.covid = new Pandemic(1000, 10, .11, 1000000, 500000);
    this.covid1 = new Pandemic(1000, 10, .11, 1000000, 500000);
    this.state = {
      covid1: {
        pandemic: this.covid,
        factors: {
          handWashing: 1,
          socialDistancing: 1,
          masks: 1
        },
      },
      covid2: {
        pandemic: this.covid1,
        factors: {
          handWashing: 1,
          socialDistancing: 1,
          masks: 1
        }
      }
    }
    this.FACTORS = {
      HANDWASHING: 1 - 0.05,
      SOCIALDISTANCING: .6,
      MASKS: 1 - 0.1,
    };
    this.MODEL_DEFAULTS = {
      casesOnDay0: 1000,
      infectedAvgExposures: 10,
      probInfectFromExpose: .11,
      popSize: 1000000,
      hospitalCapacity: 500000,
      avgLengthOfInfection: 14,
    };

    this.days = 0;
  }

  toggleFactor(factor, pandemic){
    let newVal = {... this.state[pandemic]};
    if(newVal.factors[factor] === 1){
      newVal.factors[factor] = this.FACTORS[factor.toUpperCase()];
    } else {
      newVal.factors[factor] = 1
    }
    this.setState({[pandemic] : newVal});
    this.state[pandemic].pandemic.updateFactors(this.state[pandemic].factors);
  }

  render() {
    const { classes } = this.props;
    return (
        <>
          <Typography variant="h5" component="h1" className={this.classes.title}>
            COVIDUALISE: A Visualisation Tool For COVID-19 Infection Rates
          </Typography>

          <Grid container component="main" className={this.classes.content}>
            <Grid item xs={2} className={this.classes.column}>
              <Typography
                  variant="h6"
                  component="h2"
                  className={this.classes.rowTitle}
              >
                Preventative Measures
              </Typography>
              <Grid item className={this.classes.row}>
                <Typography
                    variant="h6"
                    component="h2"
                    className={this.classes.rowTitle}
                >
                  Model 1
                </Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Hand Washing" onChange={(event) => {
                    this.toggleFactor('handWashing', 'covid1');
                  }}/>
                  <FormControlLabel control={<Checkbox />} label="Social Distancing" onChange={() => {
                    this.toggleFactor('socialDistancing', 'covid1');
                  }}/>
                  <FormControlLabel control={<Checkbox />} label="Masks" onChange={() => {
                    this.toggleFactor('masks', 'covid1');

                  }}/>
                  <FormControlLabel control={<Checkbox />} label="Foo" />
                  <FormControlLabel control={<Checkbox />} label="Bar" />
                  <FormControlLabel control={<Checkbox />} label="One" />
                  <FormControlLabel control={<Checkbox />} label="Two" />
                  <FormControlLabel control={<Checkbox />} label="Three" />
                  <FormControlLabel control={<Checkbox />} label="Four" />
                </FormGroup>
                {/*<Button title='Recalculate' variant='contained' color='primary'>
                Recalculate
              </Button>*/}
              </Grid>
              <Grid item className={this.classes.row}>
                <Typography
                    variant="h6"
                    component="h2"
                    className={this.classes.rowTitle}
                >
                  Model 2
                </Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Hand Washing" onChange={(event) => {
                    this.toggleFactor('handWashing', 'covid2');
                  }}/>
                  <FormControlLabel control={<Checkbox />} label="Social Distancing" onChange={() => {
                    this.toggleFactor('socialDistancing', 'covid2');
                  }}/>
                  <FormControlLabel control={<Checkbox />} label="Masks" onChange={() => {
                    this.toggleFactor('masks', 'covid2');

                  }}/>
                  <FormControlLabel control={<Checkbox />} label="Foo" />
                  <FormControlLabel control={<Checkbox />} label="Bar" />
                  <FormControlLabel control={<Checkbox />} label="One" />
                  <FormControlLabel control={<Checkbox />} label="Two" />
                  <FormControlLabel control={<Checkbox />} label="Three" />
                  <FormControlLabel control={<Checkbox />} label="Four" />
                </FormGroup>
                {/*<Button title='Recalculate' variant='contained' color='primary'>
                Recalculate
              </Button>*/}
              </Grid>
            </Grid>

            <Grid item xs={8} className={this.classes.column}>
              <Typography
                  variant="h6"
                  component="h2"
                  className={this.classes.columnTitle}
              >
                Visualisation and Graphing
              </Typography>
              {/*<img
                src="https://i.redd.it/ylu4wlgozgt51.jpg"
                alt=""
                className={classes.image}
              />*/}

              <Grid item className={this.classes.row}>
                <Typography
                    variant="h6"
                    component="h2"
                    className={this.classes.columnTitle}
                >
                  Model 1
                </Typography>
                <div id='pandemicTempDemo'>
                  <Visualisations pandemicState={this.state.covid1.pandemic}/>
                  <PandemicSlider pandemicState={this.state.covid1.pandemic}/>
                  <PandemicTempDemo dailyCases={this.state.covid1.pandemic.tempDemo()}></PandemicTempDemo>
                </div>
              </Grid>

              <Grid item className={this.classes.row}>
                <Typography
                    variant="h6"
                    component="h2"
                    className={this.classes.columnTitle}
                >
                  Model 2
                </Typography>
                <div id='pandemicTempDemo'>
                  <Visualisations pandemicState={this.state.covid2.pandemic}/>
                </div>
              </Grid>
            </Grid>

            <Grid item xs={2} className={this.classes.column}>
              <Typography
                  variant="h6"
                  component="h2"
                  className={this.classes.columnTitle}
              >
                Context and Factualisation
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet et delectus accommodare his consul
                copiosae legendos at vix ad putent delectus delicata usu. Vidit
                dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum
                an. Per facer affert ut. Mei iisque mentitum
              </Typography>
            </Grid>
          </Grid>
        </>
    );
  }


}


const OldApp = () => {
  const classes = useStyles();

  // TODO these parameters should be adjustable by user somehow in the future
  var covid = new Pandemic(1000, 10, .11, 1000000, 500000);
  var covid1 = new Pandemic(1000, 10, .11, 1000000, 500000);
  var days = 0;

  return (
    <>
      <Typography variant="h5" component="h1" className={classes.title}>
        COVIDUALISE: A Visualisation Tool For COVID-19 Infection Rates
      </Typography>

      <Grid container component="main" className={classes.content}>
        <Grid item xs={2} className={classes.column}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.columnTitle}
          >
            Preventative Measures
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Hand Washing" onChange={(event) => {
              covid.toggleHandWashing();
              console.log(covid.handWashing);
            }}/>
            <FormControlLabel control={<Checkbox />} label="Social Distancing" onChange={() => {
              covid.toggleSocialDistancing();
              console.log(covid.socialDistancing);
            }}/>
            <FormControlLabel control={<Checkbox />} label="Masks" onChange={() => {
              covid.toggleMasks();
              console.log(covid.masks);

            }}/>
            <FormControlLabel control={<Checkbox />} label="Foo" />
            <FormControlLabel control={<Checkbox />} label="Bar" />
            <FormControlLabel control={<Checkbox />} label="One" />
            <FormControlLabel control={<Checkbox />} label="Two" />
            <FormControlLabel control={<Checkbox />} label="Three" />
            <FormControlLabel control={<Checkbox />} label="Four" />
          </FormGroup>
          <Button title='Recalculate' variant='contained' color='primary'>
            Recalculate
          </Button>
        </Grid>

        <Grid item xs={8} className={classes.column}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.columnTitle}
          >
            Visualisation and Graphing
          </Typography>
          {/*<img
            src="https://i.redd.it/ylu4wlgozgt51.jpg"
            alt=""
            className={classes.image}
          />*/}
          <div id='pandemicTempDemo'>
            <Visualisations pandemicState={covid}/>
            <PandemicTempDemo dailyCases={covid.tempDemo()}></PandemicTempDemo>
          </div>
        </Grid>

        <Grid item xs={2} className={classes.column}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.columnTitle}
          >
            Context and Factualisation
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet et delectus accommodare his consul
            copiosae legendos at vix ad putent delectus delicata usu. Vidit
            dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum
            an. Per facer affert ut. Mei iisque mentitum
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

const PandemicTempDemo = (props) => {
  const dailyCases = props.dailyCases;
  const listItems = dailyCases.map((day) =>
    <li key={day.dayNum.toString()}>Day {day.dayNum.toString()}: {day.cases.toString()} cases</li>
  );
  return (
      <ul style={{'listStyleType': 'none', 'paddingLeft': 30, 'textAlign': 'left'}}>{listItems}</ul>
  );
}

/*App.propTypes = {
  classes: PropTypes.object.isRequired,
};*/

export default App;
