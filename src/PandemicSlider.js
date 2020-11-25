import {
    Grid,
    Typography,
  } from "@material-ui/core";
  import Slider from '@material-ui/core/Slider';
  import React, { Component } from 'react';



  class PandemicSlider extends Component {
    constructor(props) {
        super(props)
        this.pandemicState = this.props.pandemicState;
        this.state = {text:" "};
        this.marks = [
          {
            value:0,
            label:"0",
          },
          {
            value:10,
            label:"10",
    
          },
          {
            value:20,
            label:"20",
          },
          {
            value:30,
            label:"30",
          },
          {
            value:40,
            label:"40",
          },
          {
            value:50,
            label:"50",
          },
          {
            value:60,
            label:"60",
          },
          {
            value:70,
            label:"70",
          },
          {
            value:80,
            label:"80",
          },
          {
            value:90,
            label:"90",
          },
        ]
    }
  

    render(){
        return (
            <Grid container
                  direction ='column'
                  justify = 'center'
                  alignItems= 'center'
                    >
                <Typography >{this.state.text}</Typography>
                <Slider
              min={0}
              max={90}
              defaultValue={0}         
              marks={this.marks}
              step={1}
              onChange={(event,value) => {
                const cases = Math.round(this.pandemicState.getCasesByDay(value))
                this.setState({text: "Day " + value + " : " + cases + " cases"})
              }}
            />
            </Grid>
        );
    }
}

export default PandemicSlider
