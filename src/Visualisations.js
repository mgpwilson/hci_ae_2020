import React, { Component } from 'react';
import { XYPlot, LineSeries, VerticalBarSeries, XAxis, YAxis, DiscreteColorLegend, LabelSeries } from 'react-vis';
import './pandemic'
import 'react-vis/dist/style.css';
import PandemicSlider from './PandemicSlider';
class Visualisations extends Component {

    constructor(props) {
        super(props)
        this.pandemicState = this.props.pandemicState;
        this.pandemicState2 = this.props.pandemicState2;
        this.state = {
            days: 0
        }
    }

    setDays = (val) => {
        this.setState({
            days: val
        })
    }

    render() {
        //Set Up Graphing Data
        var graph1Data = {
            "removed": this.pandemicState.seriesRecoveredByDay(),
            "cases": this.pandemicState.seriesCasesByDay(),
            "susceptible": this.pandemicState.seriesSusceptibleByDay(),
            "deaths": this.pandemicState.seriesDeathsByDay(),
        }
        var graph2Data = {
            "removed": this.pandemicState2.seriesRecoveredByDay(),
            "cases": this.pandemicState2.seriesCasesByDay(),
            "susceptible": this.pandemicState2.seriesSusceptibleByDay(),
            "deaths": this.pandemicState2.seriesDeathsByDay(),
        }

        var days = this.state.days;
        var proportionalCases1 = this.pandemicState.getCasesProportionalToPopulation(days)
        var proportionalCases2 = this.pandemicState2.getCasesProportionalToPopulation(days)

        var proportionalDeaths1 = this.pandemicState.getDeathProportionalToPopulation(days)
        var proportionalDeaths2 = this.pandemicState2.getDeathProportionalToPopulation(days)

        var barData = []

        barData.push({ x: "1: Cases", y: proportionalCases1 })
        barData.push({ x: "1: Deaths", y: proportionalDeaths1 })
        barData.push({ x: "2: Cases", y: proportionalCases2 })
        barData.push({ x: "2: Deaths", y: proportionalDeaths2 })

        var lineDataAtPointX_1 = {
            "Cases": this.pandemicState.getCasesByDay(days),
            "Deaths": this.pandemicState.getDeathsByDay(days),
            "Recovered": this.pandemicState.getRecoveredByDay(days),
            "Susceptible": this.pandemicState.getSusceptibleByDay(days),
        }

        var lineDataAtPointX_2 = {
            "Cases": this.pandemicState2.getCasesByDay(days),
            "Deaths": this.pandemicState2.getDeathsByDay(days),
            "Recovered": this.pandemicState2.getRecoveredByDay(days),
            "Susceptible": this.pandemicState2.getSusceptibleByDay(days),
        }

        const legendItems = ["Recovered", "Infected", "Susceptible", "Dead"]
        const legendColours = ["green", "red", "blue", "purple"]

        return (
            <div style={{ alignItems: "center", display: "flex" }}>
                <div style={{ width: "auto" }}>
                    <h3>SIR Graph: Covid Simulation 1</h3>
                    <XYPlot type={"log"} name={"SIR GRAPH 1"} height={200} width={400} stackBy={'x'} style={{
                        display: "block",
                        margin: "inherit",
                        width: "400px"
                    }}>
                        <LineSeries data={Object.values(graph1Data)[0]} strokeWidth={1} color={"green"} />
                        <LineSeries data={Object.values(graph1Data)[1]} strokeWidth={1} color={"red"} />
                        <LineSeries data={Object.values(graph1Data)[2]} strokeWidth={1} color={"blue"} />
                        <LineSeries data={Object.values(graph1Data)[3]} strokeWidth={1} color={"purple"} />
                        <DiscreteColorLegend items={legendItems} colors={legendColours} orientation={"horizontal"} />
                        <YAxis />
                        <XAxis />
                    </XYPlot>
                    <PandemicSlider handleDays={this.setDays} />
                    <h3 style={{ marginTop: "80px" }}>SIR Graph: Covid Simulation 2</h3>
                    <XYPlot name={"SIR GRAPH 2"} height={200} width={400} stackBy={'x'}>
                        <LineSeries data={Object.values(graph2Data)[0]} strokeWidth={1} color={"green"} />
                        <LineSeries data={Object.values(graph2Data)[1]} strokeWidth={1} color={"red"} />
                        <LineSeries data={Object.values(graph2Data)[2]} strokeWidth={1} color={"blue"} />
                        <LineSeries data={Object.values(graph2Data)[3]} strokeWidth={1} color={"purple"} />
                        <DiscreteColorLegend items={legendItems} colors={legendColours} orientation={"horizontal"} />
                        <YAxis />
                        <XAxis />
                    </XYPlot>
                </div>
                <div style={{ width: "auto" }}>
                    <XYPlot height={400} width={200} xType={"ordinal"}>
                        <VerticalBarSeries data={barData} />
                        <XAxis />
                    </XYPlot>
                </div>
                <div>
                <h3>Model 1 at Day:  {days} </h3>
                    {Object.keys(lineDataAtPointX_1).map(function (key) {
                        return <p>{key}: {lineDataAtPointX_1[key]}</p>;
                    })}
                </div>
                <div>
                <h3>Model 2 at Day: {days} </h3>
                    {Object.keys(lineDataAtPointX_2).map(function (key) {
                        return <p>{key}: {lineDataAtPointX_2[key]}</p>;
                    })}
                </div>
            </div>
        );
    }
}
export default Visualisations;

