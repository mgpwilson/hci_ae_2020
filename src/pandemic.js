// https://www.bbc.com/news/health-52473523
// The r number would be 3 if we took no action
// want it below 1 ideally
// covid tends to be between 1.1 and 1.3
// see graphic for how lockdown cuts infection rate


export class Pandemic {
    // TODO remove these or keep them in App?
    FACTORS = {
        HANDWASHING: 1 - 0.05,
        SOCIAL_DISTANCING: .6,
        MASKS: 1 - 0.1,
    };

    /*constructor(props) {
        super(props);
        this.casesOnDay0 = props.casesOnDay0;
        // avg num ppl someone infected is exposed to per day
        this.infectedAvgExposures = props.infectedAvgExposures;
        // probability of each exposure becoming an infection
        this.probInfectFromExpose = props.probInfectFromExpose;
        this.popSize = props.popSize;
        this.hospitalCapacity = props.hospitalCapacity;
        this.avgLengthOfInfection = 14;

        this.handWashing = 1;
        this.socialDistancing = 1;
        this.masks = 1;
    }*/

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

        this.handWashing = 1;
        this.socialDistancing = 1;
        this.masks = 1;
    }

    getCasesByDay(dayNum) {
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

    getDeathsByDay(dayNum) {
        // TODO handle if daynum is less than 14
        let c = this.getCasesByDay(dayNum - 14) * 0.01;
        console.log(c)
    }

    getRecoveredByDay(dayNum) {
        // Unlike other methods, this method gives a total including previous days because immunity lasts
        if(dayNum < this.avgLengthOfInfection) {
            dayNum = 0
        }
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
        for(let i=0; i<25; i++){
            //s += "Day " + i + ": " + this.getCasesByDay(i) + " cases\n";
            s.push({x: i, y: Math.round(this.getCasesByDay(i))})
        }
        return s;
    }
}



