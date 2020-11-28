// https://www.bbc.com/news/health-52473523
// The r number would be 3 if we took no action
// want it below 1 ideally
// covid tends to be between 1.1 and 1.3
// see graphic for how lockdown cuts infection rate


// TODO inflection point
// TODO fix state not updating
// TODO susceptible goes negative
// TODO integrate in the new factors

// TODO uncomment debugging code in Vis
// TODO fix problem where if pandemic is not growing rapidly you can't see anything but susceptible
// TODO make it very obvious to users that lines level off at the top bc of population size
//      maybe line or box around graph ending there
// TODO could legend be inside of graph?
// TODO bar graph definitely has to be as a proportion of population
//      getDeathProportionalToPopulation(dayNum) & getCasesProportionalToPopulation(dayNum)
// TODO I think that each Visualization is producing two graphs which is problematic


// TODO add recovered to days until hospital
// TODO fix bug on death rate for just handwashing?? is this a bug?
// TODO make sure that all 4 lines are correct
/*
S = pop - infected - recovered - dead
R = recent cases - deaths
D = cases * death rate
 */
// TODO switch bar graph
// TODO fix graphics lag when select more than 4 choices

export class Pandemic {
    // TODO remove these or keep them in App?
    FACTORS = {
        HANDWASHING: 0.95,
        SOCIALDISTANCING: 0.85,
        MASKS: 0.9,
        CLOSE_EDUCATION: 0.76,
        PUBLIC_TRANSPORT_REDUCED: 0.9,
        OUTDOOR_SOCIALISING: 0.8,
        AVOID_GROUPS: 0.6,
    };

    constructor(casesOnDay0, infectedAvgExposures, probInfectFromExpose, popSize, hospitalCapacity) {
        this.casesOnDay0 = casesOnDay0;
        // avg num ppl someone infected is exposed to per day
        this.infectedAvgExposures = infectedAvgExposures;
        // probability of each exposure becoming an infection
        this.probInfectFromExpose = probInfectFromExpose;
        this.popSize = popSize;
        this.hospitalCapacity = hospitalCapacity;
        this.avgLengthOfInfection = 14;
        this.hospitalizationRate = 0.075;
        this.avgDeathRate = 0.04; // avg case:death rate in scotland when hospitals aren't overwhelmed
        this.simulationLength = 120 + this.avgLengthOfInfection; // avoid inefficiency by avoiding recalculating things more than once

        this.factors = {
            handWashing: 1,
            socialDistancing: 1,
            masks: 1,
            close_education: 1,
            public_transport_reduced: 1,
            outdoor_socialising: 1,
            avoid_groups: 1,
        };

        this.memoizedData = this.createModelCalculationsSnapshot();
        this.cacheModelCalculations();

        /*this.handWashing = 1;
        this.socialDistancing = 1;
        this.masks = 1;*/
    }

    createModelCalculationsSnapshot() {
        let ts = {
            cases: [],
            total_deaths: [],
        };
        for (let i=0; i <= this.simulationLength; i++){
            ts.cases.push(this.getCasesByDay(i));
        }
        return ts;
    }

    cacheModelCalculations () {
        for (let i=0; i <= this.simulationLength; i++){
            this.memoizedData.total_deaths.push(this.getDeathsByDay(i));
        }
        console.log(this.memoizedData);
    }

    retrieveCachedCalculation(dayNum, key) {
        if (dayNum <= this.simulationLength) {
            return this.memoizedData[key][dayNum];
        }
        else {
            if (key === 'cases') return this.getCasesByDay(dayNum);
            if (key == 'total_deaths') return this.getDeathsByDay(dayNum);
        }
    }

    getExponentialCasesByDay(dayNum) {
        /*
        dayNum = Number of days since day 0 in the model
         */
        /*
        N_d = num of cases on a given day
        N_0 = num of cases on day 0
        N_d = (1 + E * p)^d * N_0
        // TODO Growth Factor = change in N_d / change in N_d-1
        // TODO refactor to include logistic growth curve
        p = 1 - (Nd / P)
        //let p = 1 - (N_d / this.popSize);
         */
        if(dayNum < 0) dayNum = 0;
        //return (((1 + (this.getAdjustedInfectedAvgExposures() * this.getAdjustedProbInfectFromExpose())) ** dayNum) * this.casesOnDay0);
        return ((this.getRValue() ** dayNum) * this.casesOnDay0);
    }

    getCasesProportionalToPopulationByDay(dayNum) {
        /*
        P(t) = (K * P_0 * e^rt) / (K + P_0^(e^(rt-1)
        where
        P_0 = population at time 0
        K = final population/ carrying capacity
        r = inital growth rate
        t = dayNum
        https://www.intmath.com/blog/environment/h1n1-and-the-logistic-equation-3498
         */

        let P_0 = this.casesOnDay0;
        let K = this.popSize;
        let r = this.getRValue() - 1;
        let t = dayNum;

        let numerator = K * P_0 * Math.exp(r*t);
        let denominator = K + (P_0 * (Math.exp(r*t) - 1));
        return numerator / denominator;
    }

    getCasesByDay(dayNum) {
        /*
        dayNum = Number of days since day 0 in the model
         */
        if(dayNum < 0) dayNum = 0;
        /*let L = this.getCasesProportionalToPopulationByDay(dayNum);
        console.log("Day", dayNum,
            " = E:", Math.round(this.getExponentialCasesByDay(dayNum)),
            " L:", Math.round(L),
            " R:", this.getRValue());
        return L;*/
        return Math.round(this.getCasesProportionalToPopulationByDay(dayNum));
    }

    getDeathsByDay(dayNum) {
        let sumDead = 0;
        for(let i=0; i<dayNum - this.avgLengthOfInfection; i++){
            let cases = this.retrieveCachedCalculation(i, 'cases');
            let capacity = this.getHospitalCapacityByDay(i);
            let deathRate = this.getDeathRateByHospitalCapacity(capacity);
            sumDead += cases * deathRate;
            if (sumDead > this.popSize * 0.2) return this.popSize * 0.2;
        }
        return sumDead;
    }

    getDeathRateByHospitalCapacity(capacity) {
        let deathRate = this.avgDeathRate;
        if (capacity > 0.9) {
            if (capacity > 0.95) {
                if (capacity > 1) {
                    deathRate = 0.12;
                } else {
                    deathRate = 0.06;
                }
            } else {
                deathRate = 0.05;
            }
        }
        return deathRate;
    }

    getRecoveredByDay(dayNum) {
        // Unlike other methods, this method gives a total including previous days because immunity lasts
        let sumRecovered = 0;
        for(let i=0; i<dayNum-this.avgLengthOfInfection; i++){
            sumRecovered += this.retrieveCachedCalculation(i, 'cases');
            if (sumRecovered > this.popSize) return this.popSize;
        }
        return sumRecovered;
    }

    getSusceptibleByDay(dayNum) {
        let susceptible = this.popSize - this.retrieveCachedCalculation(dayNum, 'cases') - this.getRecoveredByDay(dayNum);
        if (susceptible < 0) return 0;
        else return susceptible;
    }

    getAdjustedInfectedAvgExposures() {
        return this.infectedAvgExposures * this.factors.socialDistancing * this.factors.close_education
            * this.factors.public_transport_reduced * this.factors.avoid_groups;
    }

    getAdjustedProbInfectFromExpose() {
        return this.probInfectFromExpose * this.factors.handWashing * this.factors.masks * this.factors.outdoor_socialising;
    }

    getRValue() {
        return this.getAdjustedInfectedAvgExposures() * this.getAdjustedProbInfectFromExpose();
    }

    getDaysUntilHospitalCapacity(fullness) {
        // fullness should be decimal between 0 & 1
        let dayNum = 0;
        let cap = this.getHospitalCapacityByDay(dayNum);
        while(cap < fullness) {
            dayNum +=1;
            cap = this.getHospitalCapacityByDay(dayNum);
        }
        return dayNum;
    }

    getHospitalCapacityByDay(dayNum) {
        if (dayNum > this.simulationLength) {
            let recentInfections = 0;
            for(let i=dayNum - this.avgLengthOfInfection; i<dayNum; i++){
                recentInfections += this.getCasesByDay(i) * this.hospitalizationRate;
                if (recentInfections > this.popSize) recentInfections = this.hospitalCapacity;
            }
            let capacity = (recentInfections) / this.hospitalCapacity;
            //console.log(dayNum, " : ", recentInfections, this.getRecoveredByDay(dayNum), this.getDeathRateByHospitalCapacity(capacity), capacity);
            return capacity;
        }
        else {
            let recent = this.memoizedData.cases.slice(dayNum - this.avgLengthOfInfection, dayNum);
            let recentInfections = 0;
            // TODO https://www.tutorialrepublic.com/faq/how-to-find-the-sum-of-an-array-of-numbers-in-javascript.php
            for (let i=0; i < recent.length; i++){
                recentInfections += recent[i] * this.hospitalizationRate;
                if (recentInfections > this.hospitalCapacity) recentInfections = this.hospitalCapacity;
            }
            return recentInfections / this.hospitalCapacity;
        }
    }

    getDeathProportionalToPopulation(dayNum) {
        return this.retrieveCachedCalculation(dayNum, 'total_deaths') / this.popSize;
    }

    getCasesProportionalToPopulation(dayNum) {
        let sumInfected = 0;
        for(let i=0; i<=dayNum; i++){
            sumInfected += this.retrieveCachedCalculation(i, 'cases');
            if (sumInfected > this.popSize) return this.popSize;
        }
        return sumInfected / this.popSize;
    }

    updateFactors(factors) {
        this.factors = factors;
        console.log(this.factors);
    }

    tempDemo() {
        let s = [];
        for(let i=0; i<25; i++){
            //s += "Day " + i + ": " + this.getCasesByDay(i) + " cases\n";
            s.push({dayNum: i, cases: Math.round(this.getCasesByDay(i))})
        }
        return s;
    }

    seriesCasesByDay() {
        let s = [];
        for(let i=0; i<120; i++){
            //s += "Day " + i + ": " + this.getCasesByDay(i) + " cases\n";
            s.push({x: i, y: Math.round(this.retrieveCachedCalculation(i, 'cases'))})
        }
        return s;
    }

    seriesRecoveredByDay() {
        let s = [];
        for(let i=0; i<120; i++){
            //s += "Day " + i + ": " + this.getCasesByDay(i) + " cases\n";
            s.push({x: i, y: Math.round(this.getRecoveredByDay(i))})
        }
        return s;
    }

    seriesSusceptibleByDay() {
        let s = [];
        for(let i=0; i<120; i++){
            //s += "Day " + i + ": " + this.getCasesByDay(i) + " cases\n";
            s.push({x: i, y: Math.round(this.getSusceptibleByDay(i))})
        }
        return s;
    }
    seriesDeathsByDay() {
        let s = [];
        for(let i=0; i<120; i++) {
            //s += "Day " + i + ": " + this.getCasesByDay(i) + " cases\n";
            s.push({x: i, y: Math.round(this.retrieveCachedCalculation(i, 'total_deaths'))})
        }
        return s;
    }
}



