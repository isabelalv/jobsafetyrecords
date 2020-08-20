<template>
    <section class="wrapper" >
        <div class="inner" id="recordContent" >
            <div class="content">
                <h3>New JSA Report</h3>

                <form method="post" action="#">
                    <div class="row gtr-uniform" id="activity">
                        <div class="col-12 col-12-xsmall">
                            <h4>Activity</h4>
                            <input type="text" value="" placeholder="Activity Description" v-model="jsa.activity"/>
                        </div>
                    </div>

                    <hr/>

                    <div id="steps">
                        <div class="row gtr-uniform" >
                            <h4 style="margin-bottom: 0;">Steps</h4>
                            <div class="col-12 col-12-xsmall">
                                <p style="margin-bottom: 1%;" ><strong>Step Description</strong></p>
                                <div v-for="(step, index) in jsa.steps" v-bind:key="index" style="margin-bottom: 1%;">
                                    <input type="text" value="" placeholder="Step Description" v-model="jsa.steps[index].description"/>
                                </div>

                                <!-- <table class="alt" style="margin-left: 8%; margin-top: 1%; width:90%">
                                    <tbody>
                                        <tr>
                                            <td><strong>Hazard Description</strong></td>
                                            <td><input type="text" value="" placeholder="Hazard Description" /></td>
                                        </tr>
                                        <tr>
                                            <td>Environment</td>
                                            <td><input type="text" value="" placeholder="Environment" /></td>
                                        </tr>
                                        <tr>
                                            <td>Exposure</td>
                                            <td><input type="text" value="" placeholder="Exposure" /></td>
                                        </tr>
                                        <tr>
                                            <td>Trigger</td>
                                            <td><input type="text" value="" placeholder="Trigger" /></td>
                                        </tr>
                                        <tr>
                                            <td>Consequences</td>
                                            <td><input type="text" value="" placeholder="Consequences" /></td>
                                        </tr>
                                        <tr>
                                            <td>Likelihood</td>
                                            <td>
                                                <div class="col-4 col-12-small">
                                                    <input type="radio" id="notLikely" name="likelihood" value="Not likely" style="display: none;" >
                                                    <label for="notLikely">Not likely</label>
                                                </div>
                                                <div class="col-4 col-12-small">
                                                    <input type="radio" id="somewhatLikely" name="likelihood" value="Somewhat likely" style="display: none;" >
                                                    <label for="somewhatLikely1">Somewhat likely</label>
                                                </div>
                                                <div class="col-4 col-12-small">
                                                    <input type="radio" id="veryLikely" name="likelihood" value="Very likely" style="display: none;" >
                                                    <label for="veryLikely1">Very likely</label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Risk Level</td>
                                            <td>
                                                <div class="col-4 col-12-small">
                                                    <input type="radio" id="almostNoRisk" name="risk" value="Almost no risk" style="display: none;" >
                                                    <label for="almostNoRisk">Almost no risk</label>
                                                </div>
                                                <div class="col-4 col-12-small">
                                                    <input type="radio" id="manageableRisk" name="risk" value="Manageable risk" style="display: none;" >
                                                    <label for="manageableRisk">Manageable risk</label>
                                                </div>
                                                <div class="col-4 col-12-small">
                                                    <input type="radio" id="extremeRisk" name="risk" value="Extreme risk" style="display: none;" >
                                                    <label for="extremeRisk">Extreme risk</label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Controls</td>
                                            <td>
                                                <div>
                                                    <input type="text" value="" placeholder="Control Description" />
                                                </div>
                                                <ul class="actions">
                                                    <li><a class="button">Add Control</a></li>
                                                    <li><a class="button">Remove Control</a></li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> -->

                                <!-- <ul class="actions" style="margin-left: 8%;">
                                    <li><a class="button">Add Hazard</a></li>
                                    <li><a class="button">Remove Hazard</a></li>
                                </ul> -->
                            </div>
                        </div>
                        <div class="col-12 col-12-xsmall">
                                <ul class="actions">
                                    <li><a class="button" v-on:click="addStep">Add Step</a></li>
                                    <li><a class="button" v-on:click="removeStep">Remove Step</a></li>
                                </ul>
                            </div>
                    </div>

                    <hr/>
                    
                    <div class="col-12">
                        <ul class="actions">
                            <li v-on:click="onSubmit"><a class="button">Submit</a></li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import Vue from 'vue';
export default {
    name: 'jsa-form',
    props: {
        jsa: {
            type: Object,
            required: false,
            default: () => {
                return {
                    activity: '',
                    steps: [
                        {
                            description: ''
                        }
                    ]
                };
            }
        }
    },
    data() {
        return {
            errorsPresent: false
        };
    },
    methods: {
        onSubmit: function() {
            if (this.jsa.activity === '') {
                this.errorsPresent = true;
            } else {
                this.$emit('createOrUpdate', this.jsa);
            }
        },
        addStep: function() {
            this.jsa.steps.push(Vue.util.extend({}, {
                description: ''
            }));
        },
        removeStep: function() {
            if(this.jsa.steps.length > 1){
                Vue.delete(this.jsa.steps, this.jsa.steps.length-1);
            }            
        }
    }
};
</script>

<style>
</style>