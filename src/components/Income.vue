<template>
  <div>
      <md-layout>
            <!--Left Column-->
            <md-layout md-column md-flex-xsmall="100" md-flex-small="100" md-flex-medium="33" md-flex-large="25" style="margin-bottom:20px;padding:20px;">

                        <md-input-container>
                            <label>Start Date</label>
                            <md-input type="date" v-model="startDate"></md-input>

                        </md-input-container>
                        <md-input-container>
                            <label>End Date</label>
                            <md-input type="date" v-model="endDate"></md-input>
                        </md-input-container>                        
                        <md-input-container>
                            <label>YTD Income</label>
                            <md-input type="number" v-model="ytd"></md-input>
                        </md-input-container>                        
            </md-layout>

            <!--Right Column-->
            <md-layout md-column md-flex-xsmall="100" md-flex-small="100" md-flex-medium="66" md-flex-large="75" style="margin-bottom:20px;padding:20px;">
            <div>
                There are {{days}} days between {{startString}} and {{endString}}.<br/>Annualised income is <strong>{{annualised | currency('$',0) }}</strong>
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
        startDate:"2016-07-01",
        endDate: moment().format("YYYY-MM-DD"),
        ytd: 30000
    }
  },
  computed: {
      days: function(){
        let startDate = moment(this.startDate);
        let endDate = moment(this.endDate);
        return endDate.diff(startDate, 'days');
      }, 
      startString: function() {
          return moment(this.startDate).format("DD/MM/YY");
      }, 
      endString: function() {
          return moment(this.endDate).format("DD/MM/YY");
      },
      annualised: function() {
          return this.ytd / this.days * 365;
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
