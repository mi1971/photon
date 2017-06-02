<template>
    <div>
        <md-layout md-row>

            <!--Left Column-->
            <md-layout md-column md-flex-xsmall="100" md-flex-small="100" md-flex-medium="50" md-flex-large="25" style="margin-bottom:20px;padding:20px">
                HELLO
            </md-layout>

            <!--Right Column-->
            <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="50" md-flex-large="75" style="padding:20px;">
                    <v-tabs 
                        id="mobile-tabs-1" 
                        grow 
                        scroll-bars 
                        v-bind:model="active"
                        >
                        <v-tab-item 
                            v-for="i in 3" :key="i"
                            v-bind:href="'#mobile-tabs-1-' + i" 
                            ripple
                            slot="activators"
                        >
                            Item {{ i }}
                        </v-tab-item>
                        <v-tab-content 
                            v-for="i in 3" :key="i"
                            v-bind:id="'mobile-tabs-1-' + i" 
                            slot="content"
                        >
                            <v-card>
                            <v-card-text>{{ content }}</v-card-text>
                            </v-card>
                        </v-tab-content>
                     </v-tabs>
            </md-layout>

        </md-layout>

    </div>
</template>

<script>
    import NumberHelpers from '../helpers/NumberHelpers.js';
    export default {
        name: 'Template',
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

</style>