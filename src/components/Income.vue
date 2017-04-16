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
                            <label>Start Date</label>
                            <md-input type="date" v-model="jobStart"></md-input>
                        </md-input-container>
                    </td>
                    <td><div style="width:40px">to</div></td>
                    <td>
                        <md-input-container>
                            <label>End Date</label>
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
                <tr>
                    <td colspan="3"><strong>BASE INCOME</strong></td>
                </tr>
                <tr>
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
                    <td></td>
                    <td>
                                    <!--<md-input-container>
                            <label>Months</label>
                            <md-input type="number" v-model="lastMonths"></md-input>
                        </md-input-container>-->
                    </td>
                </tr>
            </table>

        






            </md-layout>

            <!--Right Column-->
            <md-layout md-column md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100" md-flex-large="70" style="margin-bottom:20px;padding:20px;">
                <div>
                    There are {{currentDays}} days between {{sofy | ddmmyy}} and {{endPay | ddmmyy}}.<br/>Annualised income is <strong>{{currentAnnualised | currency('$',0) }}</strong>
                </div>

                <div v-if="base">
                    <br> Base income is <strong>{{base * payPeriod | currency('$',0)}}</strong>
                    <br> Overtime/Allowances will be <strong>{{currentAnnualised - (base * payPeriod) | currency('$',0) }}</strong>
                </div>

                <div v-if="last">
                    <br> Last year worked {{prevDays}} days, annualising to <strong>{{prevAnnualised | currency('',0)}}</strong>
                </div>
                <div>
                    <br>Started job {{jobMonths}} months ago.
                </div>
                

            </md-layout>
        </md-layout>     
  </div>
</template>

<script>
import NumberHelpers from '../helpers/NumberHelpers.js';
import moment from 'moment';
    

export default {
  name: 'income',
  data () {
    return {
        jobStart:"2015-07-01",
        endPay: moment().format("YYYY-MM-DD"),
        sofy: "2016-07-01",
        ytd: 30000, 
        base: 0,
        payPeriod: "52",
        employmentType: "f",
        last:0,
        lastMonths:12
    }
  },
  computed: {
      currentStart: function(){
        if(this.jobStart > this.sofy)
            return this.jobStart;
        else
            return this.sofy;    
      },
      prevStart: function(){
        if(this.jobStart > this.sofy)
            return this.sofy;
        else
            return this.jobStart;    
      },
      currentDays: function(){
        let currentStart = moment(this.currentStart);
        let endPay = moment(this.endPay);
        return endPay.diff(currentStart, 'days');
      }, 
      prevDays: function(){
        let prevStart = moment(this.prevStart);
        let prevEnd = moment(this.sofy);
        return prevEnd.diff(prevStart, 'days');
      },       
      currentAnnualised: function() {
          return this.ytd / this.currentDays * 365;
      },
      prevAnnualised: function() {
          return this.last / this.prevDays * 365;
      },
      jobMonths: function(){
        let start = moment(this.jobStart);
        return (moment().diff(start, 'days') / 30).toFixed(1);
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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

.md-input-disabled > input{
    color:black!important;
    font-weight:600;
}

/*.md-input-disabled */
.md-input-container::after{
    background-image:none!important;
}





</style>
