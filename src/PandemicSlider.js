import {
  Grid,
  Typography,
} from "@material-ui/core";
import Slider from '@material-ui/core/Slider';
import React, { Component } from 'react';


class PandemicSlider extends Component {

  getticks(){
    var marks = []
    for(var i = 0; i <= 120; i += 10){
      marks.push({value: i, label: i.toString()})
    }
    return marks
  }
  constructor(props) {
    super(props)
    this.pandemicState = this.props.pandemicState;
    this.marks = this.getticks();
  }


  render() {
    return (
      <Grid container
        direction='column'
        justify='center'
        alignItems='center'
        style={{
          marginTop: "30px",
          marginLeft: "90px",
          width: "500px"
        }} >
        <Slider
          min={0}
          max={120}
          defaultValue={0}
          marks={this.marks}
          step={1}
          onChange={(event, value) => {
            this.props.handleDays(value)
          }}
        />
      </Grid>
    );
  }
}

export default PandemicSlider
