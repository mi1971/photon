<template>
    <div>


        <md-layout md-gutter="16">
            <!--Left Column-->
            <md-layout md-column md-flex-xsmall="100" md-flex-small="100" md-flex-medium="33" md-flex-large="25" style="margin-bottom:20px;padding:20px">


                <!--<h2>Previous Loan</h2>-->

                <table style="width:100%">
                    <tr>
                        <td>
                            <md-input-container>
                                <label>Previous Amount</label>
                                <md-input type="number" v-model="previousAmount"></md-input>
                            </md-input-container>
                        </td>
                        <td style="padding-top:15px;width:15px">
                            @
                        </td>
                        <td style="width:50px">
                            <md-input-container>
                                <label>Rate %</label>
                                <md-input type="number" v-model="previousRate"></md-input>
                            </md-input-container>
                        </td>

                    </tr>
                </table>
                
                <!--<h2>New Loan</h2>-->

                <table style="width:100%">
                    <tr>
                        <td>
                            <md-input-container>
                                <label>New Amount</label>
                                <md-input type="number" v-model="newAmount"></md-input>
                            </md-input-container>
                        </td>
                        <td style="padding-top:15px;width:15px">
                            @
                        </td>
                        <td style="width:50px">
                            <md-input-container>
                                <label>Rate %</label>
                                <md-input type="number" v-model="newRate"></md-input>
                            </md-input-container>
                        </td>
                    </tr>
                </table>

                <!--<h2>Parameters</h2>-->
                <!--<md-divider></md-divider>    -->
                <md-input-container>
                    <label>Compare Over</label>
                    <md-input type="number" v-model="compareYears"></md-input>
                    <span class="suffix">years</span>
                </md-input-container>
                             
                <md-input-container>
                    <label>Total Term</label>
                    <md-input type="number" v-model="termYears"></md-input>
                    <span class="suffix">years</span>
                </md-input-container>
    
                



            </md-layout>

            <!--Right Column-->
            <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="66" md-flex-large="75" style="padding:20px;">

                <md-whiteframe md-elevation="5" style="width:100%">

                <md-table>
                <!--<md-table-header>

                </md-table-header>-->

                <md-table-body>
                    <md-table-row>
                    <md-table-cell><strong class="grey">Comparison {{compareYears}}yrs</strong></md-table-cell>
                    <md-table-cell><strong class="grey">{{previousAmount | currency('',0)}} @ {{previousRate}}%</strong></md-table-cell>
                    <md-table-cell><strong class="grey">{{newAmount | currency('',0)}} @ {{newRate}}%</strong></md-table-cell>
                    </md-table-row>

                    <md-table-row>
                    <md-table-cell>Payment</md-table-cell>
                    <md-table-cell>{{previousMonthly | currency('',0)}}</md-table-cell>
                    <md-table-cell>{{newMonthly | currency('',0)}} (save {{(previousMonthly - newMonthly) | currency('',0)}})</md-table-cell>
                    </md-table-row>

                    <md-table-row>
                    <md-table-cell>Balance</md-table-cell>
                    <md-table-cell>{{previousFutureValue | currency('',0)}}</md-table-cell>
                    <md-table-cell>{{newFutureValue | currency('',0)}}</md-table-cell>
                    </md-table-row>

                    <md-table-row>
                    <md-table-cell colspan="3">
                        Balance after {{compareYears}} years of paying {{previousMonthly | currency('',0)}}pm saves 
                        <strong>{{(previousFutureValue - newFutureValue) | currency('',0)}}</strong>
                    </md-table-cell>
                    </md-table-row>

                </md-table-body>
                </md-table>
                </md-whiteframe>

            </md-layout>

        </md-layout>

    </div>
</template>

<script>
    import NumberHelpers from '../helpers/NumberHelpers.js';
    export default {
        name: 'Compare',
        data() {
            return {
                previousAmount: 400000,
                previousRate: 4.3,

                newAmount: 400000,
                newRate: 4.0,

                compareYears: 5,
                termYears: 30
            }
        },
        computed:{
            previousMonthly: function(){
                return NumberHelpers.monthlyPayments(this.previousAmount, this.previousRate, this.termYears);
            },
            previousWeekly: function(){
                return this.previousMonthly / 4.333;
            },
            newMonthly: function(){
                return NumberHelpers.monthlyPayments(this.newAmount, this.newRate, this.termYears);
            },
            newWeekly: function(){
                return this.newMonthly / 4.333;
            },
            previousFutureValue: function(){
                return NumberHelpers.futureValue(this.previousRate, this.compareYears, this.previousMonthly, this.previousAmount)
            },
            newFutureValue: function(){
                return NumberHelpers.futureValue(this.newRate, this.compareYears, this.previousMonthly, this.newAmount)
            }
        },
        methods: {
            addLoan: function () {

            }
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
    
    div {
        border-style: solid;
        border-width: 0px;
        border-color: #e6e6e6;
    }
    
    .md-input-container {
        margin: 4px 0 8px;
    }
   .md-input-container > .suffix {
        padding-top:7px;
        margin-left:5px;
        color:grey;
    }

    .md-table-head-text{
        white-space: normal;
    }

    .grey{
        color:grey;
        font-size: .95em;
    }
</style>