import React, { Component } from 'react';
import { XYPlot, VerticalBarSeries, AreaSeries } from 'react-vis';
import './pandemic'
class Visualisations extends Component {

    constructor(props) {
        super(props)
        this.pandemicState = this.props.pandemicState;
        this.days = 90
    }

    render() {

        return (
            <div>
                <XYPlot height={200} width={400}>
                    <AreaSeries data={this.pandemicState.seriesCasesByDay()} />
                </XYPlot>
            </div>
        );
    }
}
export default Visualisations;

