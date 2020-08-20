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
                                <div v-for="(step, stepIndex) in jsa.steps" v-bind:key="stepIndex" style="margin-bottom: 1%;">
                                    <p style="margin-bottom: 1%;" ><strong>Step Description</strong></p>
                                    <input type="text" value="" placeholder="Step Description" v-model="jsa.steps[stepIndex].description"/>

                                    <div v-for="(hazard, hazardIndex) in step.hazards" v-bind:key="hazardIndex">
                                        <table class="alt" style="margin-left: 8%; margin-top: 1%; width:90%">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Hazard Description</strong></td>
                                                    <td><input type="text" value="" placeholder="Hazard Description" v-model="jsa.steps[stepIndex].hazards[hazardIndex].title"/></td>
                                                </tr>
                                                <tr>
                                                    <td>Environment</td>
                                                    <td><input type="text" value="" placeholder="Environment" v-model="jsa.steps[stepIndex].hazards[hazardIndex].environment"/></td>
                                                </tr>
                                                <tr>
                                                    <td>Exposure</td>
                                                    <td><input type="text" value="" placeholder="Exposure" v-model="jsa.steps[stepIndex].hazards[hazardIndex].exposure"/></td>
                                                </tr>
                                                <tr>
                                                    <td>Trigger</td>
                                                    <td><input type="text" value="" placeholder="Trigger" v-model="jsa.steps[stepIndex].hazards[hazardIndex].trigger"/></td>
                                                </tr>
                                                <tr>
                                                    <td>Consequences</td>
                                                    <td><input type="text" value="" placeholder="Consequences" v-model="jsa.steps[stepIndex].hazards[hazardIndex].consequences"/></td>
                                                </tr>
                                                <tr>
                                                    <td>Likelihood</td>
                                                    <td>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" id="notLikely" name="likelihood" value="Not likely" style="display: none;" v-model="jsa.steps[stepIndex].hazards[hazardIndex].likelihood"/>
                                                            <label for="notLikely">Not likely</label>
                                                        </div>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" id="somewhatLikely" name="likelihood" value="Somewhat likely" style="display: none;" v-model="jsa.steps[stepIndex].hazards[hazardIndex].likelihood" />
                                                            <label for="somewhatLikely1">Somewhat likely</label>
                                                        </div>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" id="veryLikely" name="likelihood" value="Very likely" style="display: none;" v-model="jsa.steps[stepIndex].hazards[hazardIndex].likelihood" >
                                                            <label for="veryLikely1">Very likely</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Risk Level</td>
                                                    <td>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" id="almostNoRisk" name="risk" value="Almost no risk" style="display: none;" v-model="jsa.steps[stepIndex].hazards[hazardIndex].risk_level" >
                                                            <label for="almostNoRisk">Almost no risk</label>
                                                        </div>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" id="manageableRisk" name="risk" value="Manageable risk" style="display: none;" v-model="jsa.steps[stepIndex].hazards[hazardIndex].risk_level" >
                                                            <label for="manageableRisk">Manageable risk</label>
                                                        </div>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" id="extremeRisk" name="risk" value="Extreme risk" style="display: none;" v-model="jsa.steps[stepIndex].hazards[hazardIndex].risk_level">
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
                                        </table>
                                    </div>

                                    <ul class="actions" style="margin-left: 8%; margin-top:2%;">
                                        <li><a class="button" v-on:click="addHazard(stepIndex)">Add Hazard</a></li>
                                        <li><a class="button" v-on:click="removeHazard(stepIndex)">Remove Hazard</a></li>
                                    </ul>

                                    <hr/>
                                </div>
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
                            description: '',
                            hazards: []
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
        },
        addHazard: function(stepIndex) {
            this.jsa.steps[stepIndex].hazards.push(Vue.util.extend({}, {
                title: '',
                environment: '',
                exposure: '',
                trigger: '',
                consequence: '',
                likelihood: '',
                risk_level: '',
                controls: ['']
            }));
        },
        removeHazard: function(stepIndex) {
            Vue.delete(this.jsa.steps[stepIndex].hazards, this.jsa.steps[stepIndex].hazards.length-1);
            window.scrollTo(0, 0);
        }
    }
};
</script>

<style>
</style>