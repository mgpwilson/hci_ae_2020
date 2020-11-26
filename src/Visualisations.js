import React, { Component } from 'react';
import { XYPlot, LineSeries, VerticalBarSeries, XAxis, YAxis, DiscreteColorLegend, LabelSeries } from 'react-vis';
import './pandemic'
import 'react-vis/dist/style.css';
class Visualisations extends Component {

    constructor(props) {
        super(props)
        this.pandemicState = this.props.pandemicState;
        this.pandemicState2 = this.props.pandemicState2;
        this.days = 20;
    }

    render() {
        var removed = this.pandemicState.seriesRecoveredByDay()
        var cases = this.pandemicState.seriesCasesByDay()
        var susceptible = this.pandemicState.seriesSusceptibleByDay()
        var deaths = this.pandemicState.seriesDeathsByDay()
        const legendItems = ["Recovered", "Infected", "Susceptible"]
        const legendColours = ["red", "blue", "green"]
        console.log(removed);
        console.log(cases)
        console.log(deaths);
        var scale = cases.length;
        var barCases = Object.values(cases)[this.days]
        var barDeaths = Object.values(deaths)[this.days]
        //var barDeaths = Object.values(deaths)[daysSinceSlider]
        var barData = []
        barData.push({x:"cases", y: Object.values(barCases)[1]})
        barData.push({x:"deaths", y: Object.values(barDeaths)[1]})
        console.log(barData)
        return (
            <div style={{alignItems: "center", display:"flex"}}>
                <div style={{width:"auto"}}>
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
                <div style={{width: "auto"}}>
                    <XYPlot height={400} width={200} xType={"ordinal"}>
                        <VerticalBarSeries data={barData}/>
                        <XAxis />
                    </XYPlot>
                </div>
            </div>
        );
    }
}
export default Visualisations;

