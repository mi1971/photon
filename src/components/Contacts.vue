<template>
    <div>
        <md-layout md-row md-gutter="false">

            <!--Left Column-->
            <md-layout md-column md-flex-xsmall="100" md-flex-small="100" md-flex-medium="70" md-flex-large="75" style="margin-bottom:20px;padding:20px">
                    Contacts
            </md-layout>

            <!--Right Column-->
            <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="30" md-flex-large="25">
            <div style="width:100%" class="phone-viewportx">
            <md-list class="md-double-line">

                <md-input-container>
                    <!--<label>With label</label>-->
                    <md-input placeholder="Search..."></md-input>
                </md-input-container>

                <md-list-item>
                <md-avatar>
                    <img src="https://placeimg.com/40/40/people/8" alt="People">
                </md-avatar>                

                <div class="md-list-text-container">
                    <span>Michael Smith</span>
                    <span>0418 776 543</span>
                </div>

                <md-button class="md-icon-button md-list-action">
                    <md-icon>sms</md-icon>
                </md-button>
                </md-list-item>
                
                <md-divider></md-divider>

                <md-list-item>

                <md-avatar>
                    <img src="https://placeimg.com/40/40/people/4" alt="People">
                </md-avatar>  

                <div class="md-list-text-container">
                    <span>Al McManphringsington</span>
                    <span>0451 870 225</span>
                </div>

                <md-divider></md-divider>
                </md-list-item>

                <md-list-item>

                <md-avatar>
                    <img src="https://placeimg.com/40/40/people/2" alt="People">
                </md-avatar>  

                <div class="md-list-text-container">
                    <span>Hamilton Ireland</span>
                    <span>0477 998 234</span>
                </div>
                </md-list-item>

                <md-divider></md-divider>

                <md-list-item>

                <md-avatar>
                    <img src="https://placeimg.com/40/40/people/7" alt="People">
                </md-avatar>  

                <div class="md-list-text-container">
                    <span>June Citizen</span>
                    <span>0477 663 009</span>
                </div>
                </md-list-item>

                <md-divider></md-divider>

                <md-list-item>

                <md-avatar>
                    <img src="https://placeimg.com/40/40/people/5" alt="People">
                </md-avatar>  

                <div class="md-list-text-container">
                    <span>Jonathan Citizen</span>
                    <span>0477 663 009</span>
                </div>
                </md-list-item>


            </md-list>
            </div>                
            </md-layout>

        </md-layout>

    </div>
</template>

<script>
    import NumberHelpers from '../helpers/NumberHelpers.js';
    export default {
        name: 'Contacts',
        data() {
            return {

            }
        },
        computed:{

        },
        methods: {

        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.md-list-item:hover {background-color:#FAFAFA!important}

</style>