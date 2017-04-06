<template>
  <div>
      <md-layout md-gutter="16">
            <!--Left Column-->
            <md-layout md-column md-flex-xsmall="100" md-flex-small="100" md-flex-medium="33" md-flex-large="25" style="margin-bottom:20px">
            <table>
                <tr>
                    <td>
                        <md-input-container>
                            <label>Start Date</label>
                            <md-input type="date" v-model="startDate"></md-input>

                        </md-input-container>
                    </td>
                </tr>
                <tr>
                    <td>
                        <md-input-container>
                            <label>End Date</label>
                            <md-input type="date" v-model="endDate"></md-input>
                        </md-input-container>                        
                    </td>
                </tr>
                <tr>
                    <td>
                        <md-input-container>
                            <label>Years</label>
                            <md-input type="number" v-model="years" :disabled="target == 'Years' ? true : false"></md-input>
                        </md-input-container>                        
                    </td>
                    <td>
                        <md-radio v-model="target" id="calc-target" name="calc-target" md-value="Years" class="md-primary"></md-radio>
                    </td>                    
                    <td>
                        <!--<md-button @click.native="calcYears" class="md-raised md-dense">
                            Calculate
                        </md-button>                        -->
                    </td>
                </tr>
                <tr>
                    <td>
                        <md-input-container>
                            <label>Repayment</label>
                            <md-input type="number" v-model="repayment" :disabled="target == 'Repayment' ? true : false"></md-input>
                        </md-input-container>                        
                    </td>
                    <td>
                        <md-radio v-model="target" id="calc-target" name="calc-target" md-value="Repayment" class="md-primary"></md-radio>
                    </td>                    
                    <td>
                        <!--<md-button @click.native="calcRepayment" class="md-primary md-raised md-dense">
                            Calculate
                        </md-button>                        -->
                    </td>
                </tr>
                <tr>
                    <td>
                        <md-input-container>
                            <label>Future Value</label>
                            <md-input type="number" v-model="future" :disabled="target == 'Future' ? true : false"></md-input>
                        </md-input-container>                        
                    </td>
                    <td>
                        <md-radio v-model="target" id="calc-target" name="calc-target" md-value="Future" class="md-primary"></md-radio>
                    </td>                    
                    <td>
                        <!--<md-button @click.native="calcFuture" class="md-raised md-dense">
                            Calculate
                        </md-button>                        -->
                    </td>
                </tr>
                <tr>
                    <td>
                        <md-input-container colspan="2">
                            <label for="frequency">Pay per</label>
                            <md-select name="frequency" id="frequency" v-model="frequency">
                            <md-option value="1">Month</md-option>
                            <md-option value="2">Fortnight (month/2)</md-option>
                            <md-option value="2.17">Fortnight</md-option>
                            <md-option value="4">Week (month/4)</md-option>
                            <md-option value="4.33">Week</md-option>
                            </md-select>
                        </md-input-container>                       
                    </td>
                </tr>
            </table>
               
               

            



            </md-layout>
        </md-layout>
  </div>
</template>

<script>
import NumberHelpers from '../helpers/NumberHelpers.js';
    

export default {
  name: 'income',
  data () {
    return {
        startDate: new Date('July 1, 2016'),
      amount: 400000,
      rate: 4.0,
      years: 30,
      repayment: 1910,
      future:0,
      frequency:"1",
      target:"Repayment"
    }
  },
  watch: {
    amount: function(val, oldVal) {
      this.recalculate();
    },
    rate: function(val, oldVal) {
      this.recalculate();
    },
    years: function(val, oldVal) {
      this.recalculate();
    },
    repayment: function(val, oldVal) {
      this.recalculate();
    },
    future: function(val, oldVal) {
      this.recalculate();
    },
    frequency: function(val, oldVal) {
      this.recalculate();
    }
  },
  methods: {
    calcRepayment: function () {
        let rate = this.rate/12/100;
        let repayment = NumberHelpers.pmt(rate, this.years * 12, this.amount, 0-this.future)
        repayment = repayment / parseFloat(this.frequency);
        this.repayment = 0-repayment.toFixed(0);
    },
    calcFuture: function () {
        let monthlyPayment = this.repayment * parseFloat(this.frequency);
        let future = NumberHelpers.futureValue(this.rate, this.years, monthlyPayment, this.amount);
        this.future = parseFloat(future).toFixed(0);
    },
    calcYears: function () {
        let monthlyPayment = this.repayment * parseFloat(this.frequency);
        let rate = this.rate/12/100;
        let months = NumberHelpers.nPer(rate, monthlyPayment, 0-this.amount, 0-this.future, 0);
        this.years = (parseFloat(months) / 12).toFixed(1);
    },
    calcAmount: function () {
        let monthlyPayment = this.repayment * parseFloat(this.frequency);
        let rate = this.rate/12/100;
        let amount = 0 - NumberHelpers.pv(rate, this.years*12, monthlyPayment, 0-this.future, 0);
        this.amount = (amount/1000).toFixed(0) * 1000;
    },
    calcRate: function () {
        let monthlyPayment = this.repayment * parseFloat(this.frequency);

        let rate = NumberHelpers.rate(12*this.years, 0-monthlyPayment, this.amount, this.future);

        this.rate = (rate * 12*100).toFixed(2);
    },
    recalculate: function() {
        if(this.target === 'Repayment')
            this.calcRepayment();
        else if(this.target === 'Amount')
            this.calcAmount();
        else if(this.target === 'Rate')
            this.calcRate();
        else if(this.target === 'Years')
            this.calcYears();
        else if(this.target === 'Future')
            this.calcFuture();
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

.md-input-disabled > input{
    color:black!important;
    font-weight:600;
}

/*.md-input-disabled */
.md-input-container::after{
    background-image:none!important;
}





</style>
