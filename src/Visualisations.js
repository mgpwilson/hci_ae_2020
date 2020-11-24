import React, { Component } from 'react';
import { XYPlot, LineSeries, VerticalBarSeries, XAxis, YAxis, DiscreteColorLegend } from 'react-vis';
import './pandemic'
import 'react-vis/dist/style.css';
class Visualisations extends Component {

    constructor(props) {
        super(props)
        this.pandemicState = this.props.pandemicState;
        this.pandemicState2 = this.props.pandemicState2;
        this.days = this.props.days;
    }

    render() {
        var removed = this.pandemicState.seriesRemovedByDay()
        var cases = this.pandemicState.seriesCasesByDay()
        var susceptible = this.pandemicState.seriesSusceptibleByDay()
        const legendItems = ["Removed", "Cases", "Susceptible"]
        const legendColours = ["red", "blue", "green"]
        console.log(removed);
        console.log(cases)
        var scale = cases.length;
        return (
            <div>
                <h3>SIR Graph: Covid Simulation 1</h3>
                <XYPlot name={"SIR GRAPH 1"} height={200} width={400} xDomain={[0, scale]} stackBy={'x'} style={{
                    display: "block",
                    margin: "inherit",
                    width: "400px"
                }}>
                    <LineSeries data={removed} strokeWidth={1} color={"red"} />
                    <LineSeries data={cases} strokeWidth={1} color={"blue"} />
                    <LineSeries data={susceptible} strokeWidth={1} color={"green"} />
                    <DiscreteColorLegend items={legendItems} colors={legendColours} orientation={"horizontal"} />
                    <XAxis />
                </XYPlot>
                <h3 style={{ marginTop: "80px" }}>SIR Graph: Covid Simulation 2</h3>
                <XYPlot name={"SIR GRAPH 2"} height={200} width={400} xDomain={[0, scale]} stackBy={'x'}>
                    <LineSeries data={removed} strokeWidth={1} color={"red"} />
                    <LineSeries data={cases} strokeWidth={1} color={"blue"} />
                    <LineSeries data={susceptible} strokeWidth={1} color={"green"} />
                    <DiscreteColorLegend items={legendItems} colors={legendColours} orientation={"horizontal"} />
                    <XAxis />
                </XYPlot>
            </div>
        );
    }
}
export default Visualisations;

