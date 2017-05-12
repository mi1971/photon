<template>
    <div>
        <md-layout>
            <!--Left Column-->
            <md-layout md-column md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100" md-flex-large="30" style="margin-bottom:20px;padding:10px;">

                <table style="width:100%">
                    <tr>
                        <td colspan="3"><strong>YTD INCOME</strong></td>
                    </tr>
                    <tr>
                        <td>
                            <md-input-container>
                                <label>Commenced Work</label>
                                <md-input type="date" v-model="jobStart"></md-input>
                            </md-input-container>
                        </td>
                        <td>
                            <div style="width:40px">to</div>
                        </td>
                        <td>
                            <md-input-container>
                                <label>Last Pay Date</label>
                                <md-input type="date" v-model="endPay"></md-input>
                            </md-input-container>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <md-input-container>
                                <label>YTD Income</label>
                                <md-input type="number" v-model="ytd"></md-input>
                            </md-input-container>
                        </td>
                        <td></td>
                        <td>
                            <md-input-container>
                                <label for="employmentType">Employment Type</label>
                                <md-select name="employmentType" id="employmentType" v-model="employmentType">
                                    <md-option value="c">Casual</md-option>
                                    <md-option value="p">Part Time</md-option>
                                    <md-option value="f">Full Time</md-option>
                                </md-select>
                            </md-input-container>
                        </td>
                    </tr>
                    <tr v-if="this.employmentType != 'c'">
                        <td colspan="3"><strong>BASE INCOME</strong></td>
                    </tr>
                    <tr v-if="this.employmentType != 'c'">
                        <td>
                            <md-input-container>
                                <label>Base Earnings</label>
                                <md-input type="number" v-model="base"></md-input>
                            </md-input-container>
                        </td>
                        <td> per </td>
                        <td>
                            <md-input-container>
                                <label for="payPeriod">Pay Period</label>
                                <md-select name="payPeriod" id="payPeriod" v-model="payPeriod">
                                    <md-option value="52">Week</md-option>
                                    <md-option value="26">Fortnight</md-option>
                                    <md-option value="12">Month</md-option>
                                    <md-option value="1">Year</md-option>
                                </md-select>
                            </md-input-container>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3"><strong>LAST YEAR</strong></td>

                    </tr>
                    <tr>
                        <td>
                            <md-input-container>
                                <label>Last Year Income</label>
                                <md-input type="number" v-model="last"></md-input>
                            </md-input-container>
                        </td>
                        <td>

                        </td>
                        <td>
                            <md-input-container>
                                <label for="lender">Lender</label>
                                <md-select name="lender" id="lender" v-model="lender">
                                    <md-option v-for="lenderName in lenders" :value="lenderName" :key="lender">{{lenderName}}</md-option>
                                </md-select>
                            </md-input-container>
                        </td>
                    </tr>
                    <!--<tr>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>
                            <md-checkbox v-model="lmi" class="md-primary">LMI Loan</md-checkbox>
                        </td>
                    </tr>-->
                </table>








            </md-layout>

            <!--Right Column-->
            <md-layout md-column md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100" md-flex-large="70" style="margin-bottom:20px;padding:20px;">

                <div v-for="item in output" class="output-item">
                    <md-icon :class="getIcon(item.icon).color" class="md-size-2x pull-left">{{getIcon(item.icon).name}}</md-icon>
                    <div style="margin-left:55px">
                        <div><strong>{{item.heading}}</strong></div>
                        <div class="grey">{{item.message}}</div>
                    </div>
                </div>
                <div>

                <div v-if="baseFinal" class="dash-box"><span class="heading">BASE INCOME</span>{{baseFinal | number}}</div>
                <md-icon v-if="overtimeFinal" class="md-size-2x light-grey" style="margin-bottom:25px;margin-right:5px;">add_circle</md-icon>
                <div v-if="overtimeFinal" class="dash-box" style="background-color:orange"><span class="heading">OT/ALLOWANCES</span>{{overtimeFinal | number}}</div>
                <div class="grey" style="margin-top:10px">{{outputMessage}} {{overtimeMessage}}</div>
                </div>

            </md-layout>
        </md-layout>
    </div>
</template>

<script>
import NumberHelpers from '../helpers/NumberHelpers.js';
import LenderHelpers from '../helpers/LenderHelpers.js';
import moment from 'moment';

export default {
name: 'income',

data() {
    return {
        jobStart: "2015-07-01",
        endPay: moment().format("YYYY-MM-DD"),
        sofy: "2016-07-01",
        ytd: 30000,
        base: 0,
        payPeriod: "52",
        employmentType: "f",
        last: 0,
        lastMonths: 12,
        lenders: LenderHelpers.lenders(),
        lender: '',
        lmi: false,
        outputMessage: '',
        overtimeMessage: ''
    }
},

computed: {
    baseAnnualised: function () {
        return this.base * this.payPeriod;
    },
    baseFinal: function () {
        this.outputMessage = '';
        let result = 0;
        if(this.employmentType == 'c')
            if(['Westpac'].includes(this.lender)){
                this.outputMessage = this.lender + " takes the lower of annualised vs last years total income for casual"
                result = Math.min(this.currentAnnualised, this.last)
            } else if(['ANZ', 'CBA'].includes(this.lender)) {
                this.outputMessage = this.lender + " takes this years annualised income for casual"
                result = this.currentAnnualised
            } else {
                this.outputMessage = this.lender + " takes the lower of this years vs last years annualised income for casual"
                result = Math.min(this.currentAnnualised, this.prevAnnualised)
            }
        else {
            if (this.baseAnnualised)
                this.outputMessage = "Base is annualised."
            result = this.baseAnnualised
        }

        return result;
    },
    currentStart: function () {
        if (this.jobStart > this.sofy)
            return this.jobStart;
        else
            return this.sofy;
    },
    prevStart: function () {
        if (this.jobStart > this.sofy)
            return this.sofy;
        else
            return this.jobStart;
    },
    currentDays: function () {
        let currentStart = moment(this.currentStart);
        let endPay = moment(this.endPay);
        return endPay.diff(currentStart, 'days');
    },
    prevDays: function () {
        let prevStart = moment(this.prevStart);
        let prevEnd = moment(this.sofy);
        return prevEnd.diff(prevStart, 'days')
    },
    currentAnnualised: function () {
        let multiplier = 1
        if (this.employmentType == "c")
            multiplier = this.casualWeeksPerAnnum / 52
        return this.ytd / this.currentDays * 365 * multiplier
    },
    prevAnnualised: function () {
        return this.last / this.prevDays * 365
    },
    currentOvertime:function(){
        if (this.currentAnnualised == 0 || this.baseAnnualised == 0 || this.baseAnnualised > this.currentAnnualised)
            return 0;
        return this.currentAnnualised - this.baseAnnualised
    },
    prevOvertime:function(){
        if (this.prevAnnualised == 0 || this.baseAnnualised == 0 || this.baseAnnualised > this.prevAnnualised)
            return 0;
        return this.prevAnnualised - this.baseAnnualised;
    },
    overtimeFinal:function(){
        let result = 0
        let msg = '';
        if (this.employmentType == 'c')
            result = 0
        else if (['ANZ', 'CBA'].includes(this.lender)) {
            msg = " Overtime is based on this year annualised less base."
            result = this.currentOvertime
        } else {
            msg = " Overtime is based on the lower of last year vs this year."
            result = Math.min(this.currentOvertime, this.prevOvertime)
        }
        if(result)
            this.overtimeMessage = msg

        return result;
    },
    jobMonths: function () {
        let start = moment(this.jobStart);
        return (moment().diff(start, 'days') / 30).toFixed(1);
    },
    minimumEmploymentTerm: function () {
        if (this.employmentType == "c") {
            if (['ANZ', 'CBA', 'NAB'].includes(this.lender))
                return 3
            else if (['CUA', 'ING', 'Suncorp'].includes(this.lender))
                return 6
            else
                return 12


        } else {
            if (['ANZ', 'CBA'].includes(this.lender))
                return 1
            else
                return 6

        }
    },
    casualWeeksPerAnnum: function () {
        if (['Westpac'].includes(this.lender))
            return 46
        else if (['ANZ', 'CBA'].includes(this.lender))
            return 52
        else
            return 48
    },
    output: function () {
        this.jobStart,
            this.endPay,
            this.ytd,
            this.base,
            this.payPeriod,
            this.employmentType,
            this.last,
            this.lastMonths,
            this.lender

        let output = [];

        //Annualised Income...

        let outputItem = {};
        outputItem.heading = `YTD Annualised ${NumberHelpers.formatCommas(this.currentAnnualised)}`
        if (this.employmentType == 'c')
            outputItem.message = `Based on ${this.lender} policy using ${NumberHelpers.formatCommas(this.ytd)} over ${this.casualWeeksPerAnnum} weeks.`
        else
            outputItem.message = `Based on ${NumberHelpers.formatCommas(this.ytd)} over ${this.currentDays} days.`
        outputItem.icon = "Success"
        output.push(outputItem)

        //Base Income...

        outputItem = {}
        outputItem.heading = "Base Income " + NumberHelpers.formatCommas(this.baseAnnualised)
        let shortfall = this.baseAnnualised - this.currentAnnualised;
        if(this.baseAnnualised == 0){
            outputItem.heading = "Base Income"
            outputItem.icon = "Unknown"
            outputItem.message = "Base income not provided"
        }
        else if (shortfall > 0) {
            outputItem.icon = "Error"
            outputItem.message = `YTD Annualises to less than base income by ${NumberHelpers.formatCommas(shortfall)}.`
            if (shortfall < 3000)
                outputItem.message += " This may be explained by a pay raise?"
            else{
                outputItem.message += " This is significant and requires explanation."
            }
        }
        else {
            outputItem.icon = "Success"
            outputItem.message = `YTD Annualises to more than base income by ${NumberHelpers.formatCommas(Math.abs(shortfall))}.`
        }

        if(this.employmentType != 'c')
            output.push(outputItem)

        //Last Year income...

        outputItem = {}
        let diff = Math.abs(this.currentAnnualised - this.prevAnnualised);
        outputItem.heading = "Last Year Annualised " + NumberHelpers.formatCommas(this.prevAnnualised)
        outputItem.message = "Based on " + NumberHelpers.formatCommas(this.last) + " over " + this.prevDays + " days."
        if(!this.prevAnnualised) {
            outputItem.heading = "Last Year Income"
            outputItem.icon = "Unknown"
            outputItem.message = "Previous year not provided."
        } else if (this.last && diff / this.currentAnnualised * 100 > 10) {
            outputItem.icon = "Error"
            outputItem.message += " There is more than 10% variance from last year to this year. Requires explanation.";
        } else {
            outputItem.icon = "Success"
            outputItem.message += " Income is consistent with last year."
        }
        output.push(outputItem)

        //Overtime...

        outputItem = {}
        outputItem.heading = "Overtime Calculation"
        if(this.baseAnnualised == 0) {
            outputItem.icon = "Unknown"
            outputItem.message = "Overtime can't be calculated without base income."
        } else {
            outputItem.icon = "Success"
            outputItem.message = "This years overtime/allowances is " + NumberHelpers.formatCommas(this.currentOvertime) + ". Last year was estimated at " + NumberHelpers.formatCommas(this.prevOvertime)
        }
        if(this.employmentType != 'c')
            output.push(outputItem)

        //Minimum Employment Term...

        outputItem = {};

        let minimumEmploymentTerm = this.minimumEmploymentTerm
        outputItem.message = `The ${this.lender} minimum length of employment is ${minimumEmploymentTerm} months. This deal is ${this.jobMonths} months.`
        outputItem.heading = "Length of Employment"

        if (minimumEmploymentTerm > this.jobMonths)
            outputItem.icon = "Error"
        else
            outputItem.icon = "Success"
        output.push(outputItem);        

        return output
    }
},
methods: {
    getIcon: function (iconType) {
        if (iconType == "Error")
            return { name: "error", color: "red" }
        if (iconType == "Success")
            return { name: "check_circle", color: "green" }
        if (iconType == "Unknown")
            return { name: "check_circle", color: "light-grey" }
    }
},
created() {

}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
    /*.md-input-container{
    width:120px;
}*/
    
    .md-input-disabled>input {
        color: black!important;
        font-weight: 600;
    }
    /*.md-input-disabled */
    
    .md-input-container::after {
        background-image: none!important;
    }
    
    .label-warning {
        background-color: #DF0101;
        color: white;
        margin-right: 1px;
        padding: 1px 4px 1px 4px;
        font-size: 0.8em;
        font-weight: bold;
        border-radius: 10%;
    }
    
    .output-item {
        padding-top: 3px;
        padding-bottom: 3px;
    }

    .dash-box{
        margin-top: 20px;
        margin-right:5px;
        display: inline-block;
        height:80px;
        width:fit-content;
        background-color:darkorangE;
        color:white;
        text-align: center;
        border-radius: 0px;
        padding:4px 15px 4px 15px;
        font-size:24pt;
        font-weight: bold;
    }
    .dash-box > .heading{
        text-align: left;
        font-size:8pt;
        font-weight: bold;
        display: block;
        margin-bottom: 10px;
    }
</style>