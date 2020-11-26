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
// TODO change legend label in Vis

export class Pandemic {
    // TODO remove these or keep them in App?
    FACTORS = {
        HANDWASHING: 1 - 0.05,
        SOCIAL_DISTANCING: .6,
        MASKS: 1 - 0.1,
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

        this.factors = {
            handWashing: 1,
            socialDistancing: 1,
            masks: 1,
        };

        /*this.handWashing = 1;
        this.socialDistancing = 1;
        this.masks = 1;*/
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
        return (((1 + (this.getAdjustedInfectedAvgExposures() * this.getAdjustedProbInfectFromExpose())) ** dayNum) * this.casesOnDay0);
    }

    getCasesProportionalToPopulationByDay(dayNum){
        /*if(dayNum < 0) dayNum = 0;
            return this.casesOnDay0;
        let N_d = this.getCasesProportionalToPopulationByDay(dayNum - 1);
        if (N_d > this.popSize) N_d = this.popSize;
        //let popSusceptibilityCorrectionFactor = 1 - (N_d / this.popSize); // can this go negative? if larger than population possibly
        //let N_D = this.getAdjustedProbInfectFromExpose() * popSusceptibilityCorrectionFactor * N_d;
        let currentPopulationSusceptibility = (1 - (N_d / this.popSize));
        console.log(dayNum, currentPopulationSusceptibility);
        //let N_D = ((1 + (this.getAdjustedInfectedAvgExposures() * this.getAdjustedProbInfectFromExpose()))**dayNum) * this.casesOnDay0;

        let thetaN_D = currentPopulationSusceptibility * this.getExponentialCasesByDay(dayNum - 1);

        return N_d + thetaN_D;*/
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
        let r = 1 + this.getRValue();
        let t = dayNum;

        let numerator = K * P_0 * Math.exp(r*t);
        let denominator = K + (P_0 * (Math.exp(r*t) - 1));
        return numerator / denominator;

        /*let k = this.getRValue() / 10;
        let L = this.popSize;
        let t0 = this.casesOnDay0;

        let num = L;
        let denom = 1 + Math.exp(k * -1 * (dayNum - this.casesOnDay0));

        return num / denom;*/


    }

    getCasesByDay(dayNum) {
        /*
        dayNum = Number of days since day 0 in the model
         */
        if(dayNum < 0) dayNum = 0;
        /*let L = this.getCasesProportionalToPopulationByDay(dayNum);
        console.log("Day", dayNum,
            " = E:", Math.round(this.getExponentialCasesByDay(dayNum)),
            " L:", Math.round(L));
        return L;*/
        return this.getCasesProportionalToPopulationByDay(dayNum);
    }

    getDeathsByDay(dayNum) {
        let c = this.getCasesByDay(dayNum - 14) * 0.04;
        return c;
    }

    getRecoveredByDay(dayNum) {
        // Unlike other methods, this method gives a total including previous days because immunity lasts
        /*if(dayNum < this.avgLengthOfInfection) {
            dayNum = 0
        }*/
        let sum_removed = 0;
        for(let i=0; i<dayNum-this.avgLengthOfInfection; i++){
            sum_removed += this.getCasesByDay(i);
        }
        return sum_removed;
    }

    getSusceptibleByDay(dayNum){
        return this.popSize - this.getCasesByDay(dayNum) - this.getRecoveredByDay(dayNum);
    }

    getAdjustedInfectedAvgExposures(){
        return this.infectedAvgExposures * this.factors.socialDistancing;
    }

    getAdjustedProbInfectFromExpose() {
        return this.probInfectFromExpose * this.factors.handWashing * this.factors.masks;
    }

    getRValue() {
        return this.getAdjustedInfectedAvgExposures() * this.getAdjustedProbInfectFromExpose();
    }

    getDaysUntilHospitalCapacity(fullness){
        // fullness should be decimal between 0 & 1
        let target = this.hospitalCapacity * fullness;
        // TODO redo this in cleverer way when less tired
        let dayNum = 0;
        while(this.getCasesByDay(dayNum) < target) {
            dayNum += 1;
        }
        return dayNum;
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
        for(let i=0; i<40; i++){
            //s += "Day " + i + ": " + this.getCasesByDay(i) + " cases\n";
            s.push({x: i, y: Math.round(this.getCasesByDay(i))})
        }
        return s;
    }

    seriesRecoveredByDay() {
        let s = [];
        for(let i=0; i<40; i++){
            //s += "Day " + i + ": " + this.getCasesByDay(i) + " cases\n";
            s.push({x: i, y: Math.round(this.getRecoveredByDay(i))})
        }
        return s;
    }

    seriesSusceptibleByDay() {
        let s = [];
        for(let i=0; i<40; i++){
            //s += "Day " + i + ": " + this.getCasesByDay(i) + " cases\n";
            s.push({x: i, y: Math.round(this.getSusceptibleByDay(i))})
        }
        return s;
    }
    seriesDeathsByDay() {
        let s = [];
        for(let i=0; i<40; i++){
            //s += "Day " + i + ": " + this.getCasesByDay(i) + " cases\n";
            s.push({x: i, y: Math.round(this.getDeathsByDay(i))})
        }
        return s;
    }
    
}



