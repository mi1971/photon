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
                    <!--<transition xname="fade">-->
                        <div v-if="!this.activeContact">

                            <md-list class="md-double-line">

                                <md-input-container>
                                    <!--<label>With label</label>-->
                                    <md-input placeholder="Search..."></md-input>
                                </md-input-container>

                                <div v-for="contact in contacts" :key="contact.id" @click="showContact(contact)">
                                    <md-list-item>

                                        <md-avatar>
                                            <img :src="contact.imageUrl" alt="People">
                                        </md-avatar>

                                        <div class="md-list-text-container">
                                            <span>{{contact.firstName}} {{contact.lastName}}</span>
                                            <span>{{contact.mobile}}</span>
                                        </div>

                                        <md-divider></md-divider>
                                    </md-list-item>
                                </div>

                            </md-list>
                        </div>
                    <!--</transition>-->

                    <!--<transition xname="fade">-->

                    <div v-if="this.activeContact">

                        <md-tabs md-right>
                        <md-tab md-icon="phone">
                            <md-input-container>
                                <label>First Name</label>
                                <md-input type="text" v-model="activeContact.firstName"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Last Name</label>
                                <md-input type="text" v-model="activeContact.lastName"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Mobile</label>
                                <md-input type="text" v-model="activeContact.mobile"></md-input>
                            </md-input-container>    
                        </md-tab>

                        <md-tab md-icon="favorite">
                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
                       
                        </md-tab>

                        <md-tab md-icon="near_me">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
                        </md-tab>
                        </md-tabs>                        


                        <md-button class="md-raised md-primary" @click.native="hideContact()">Done</md-button>
                    </div>
                    <!--</transition>-->
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
                activeContact:null,
                contacts:[
                    {
                        id:"1",
                        firstName: "Al", 
                        lastName: "McManphringsington", 
                        mobile: "0413 9999 51",
                        imageUrl: "https://placeimg.com/40/40/people/4"
                    },
                    {
                        id:"2",
                        firstName: "Mary", 
                        lastName: "Jepperson", 
                        mobile: "0413 995 777",
                        imageUrl: "https://placeimg.com/40/40/people/2"
                    },                    
                    {   id:"3",
                        firstName: "Mick", 
                        lastName: "Anderson", 
                        mobile: "0413 008 534",
                        imageUrl: "https://placeimg.com/40/40/people/5"
                    },                    
                    {
                        id:"4",
                        firstName: "Fran", 
                        lastName: "Moore", 
                        mobile: "0400 494 177",
                        imageUrl: "https://placeimg.com/40/40/people/6"
                    },                    
                ]

            }
        },
        computed:{

        },
        methods: {
            showContact: function(contact){
                this.activeContact = contact;
            },
            hideContact: function(){
                console.log('done')
                this.activeContact = null;
            }

        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.md-list-item:hover {
    background-color:#FAFAFA;
    cursor:pointer;
}

.md-input-container{
    width:100%
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>