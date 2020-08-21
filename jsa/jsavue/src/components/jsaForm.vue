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
                                                    <td><input type="text" value="" placeholder="Consequences" v-model="jsa.steps[stepIndex].hazards[hazardIndex].consequence"/></td>
                                                </tr>
                                                <tr>
                                                    <td>Likelihood</td>
                                                    <td>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" 
                                                            v-bind:id="'notLikely'+stepIndex+hazardIndex" 
                                                            v-bind:name="'likelihood'+stepIndex+hazardIndex" 
                                                            value="Not likely"
                                                            style="display: none;" 
                                                            v-model="jsa.steps[stepIndex].hazards[hazardIndex].likelihood"/>
                                                            <label v-bind:for="'notLikely'+stepIndex+hazardIndex">Not likely</label>
                                                        </div>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" 
                                                            v-bind:id="'somewhatLikely'+stepIndex+hazardIndex" 
                                                            v-bind:name="'likelihood'+stepIndex+hazardIndex" 
                                                            value="Somewhat likely"  
                                                            style="display: none;" 
                                                            v-model="jsa.steps[stepIndex].hazards[hazardIndex].likelihood" />
                                                            <label v-bind:for="'somewhatLikely'+stepIndex+hazardIndex">Somewhat likely</label>
                                                        </div>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" 
                                                            v-bind:id="'veryLikely'+stepIndex+hazardIndex" 
                                                            v-bind:name="'likelihood'+stepIndex+hazardIndex" 
                                                            value="Very likely" 
                                                            style="display: none;" 
                                                            v-model="jsa.steps[stepIndex].hazards[hazardIndex].likelihood" >
                                                            <label v-bind:for="'veryLikely'+stepIndex+hazardIndex">Very likely</label>
                                                            <p>{{jsa.steps[stepIndex].hazards[hazardIndex].likelihood == 'Not likely'}}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Risk Level</td>
                                                    <td>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" 
                                                            v-bind:id="'almostNoRisk'+stepIndex+hazardIndex" 
                                                            v-bind:name="'risk'+stepIndex+hazardIndex" 
                                                            value="Almost no risk" 
                                                            style="display: none;" 
                                                            v-model="jsa.steps[stepIndex].hazards[hazardIndex].risk_level" >
                                                            <label v-bind:for="'almostNoRisk'+stepIndex+hazardIndex">Almost no risk</label>
                                                        </div>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" 
                                                            v-bind:id="'manageableRisk'+stepIndex+hazardIndex" 
                                                            v-bind:name="'risk'+stepIndex+hazardIndex" 
                                                            value="Manageable risk" 
                                                            style="display: none;" 
                                                            v-model="jsa.steps[stepIndex].hazards[hazardIndex].risk_level" >
                                                            <label v-bind:for="'manageableRisk'+stepIndex+hazardIndex">Manageable risk</label>
                                                        </div>
                                                        <div class="col-4 col-12-small">
                                                            <input type="radio" 
                                                            v-bind:id="'extremeRisk'+stepIndex+hazardIndex" 
                                                            v-bind:name="'risk'+stepIndex+hazardIndex" 
                                                            value="Extreme risk" 
                                                            style="display: none;" 
                                                            v-model="jsa.steps[stepIndex].hazards[hazardIndex].risk_level">
                                                            <label v-bind:for="'extremeRisk'+stepIndex+hazardIndex">Extreme risk</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Controls</td>
                                                    <td>
                                                        <div v-for="(control, controlIndex) in hazard.controls" v-bind:key="controlIndex">
                                                            <input type="text" value="" placeholder="Control Description" v-model="jsa.steps[stepIndex].hazards[hazardIndex].controls[controlIndex]"/>
                                                        </div>
                                                        <ul class="actions">
                                                            <li><a class="button" v-on:click="addControl(stepIndex, hazardIndex)">Add Control</a></li>
                                                            <li><a class="button" v-on:click="removeControl(stepIndex, hazardIndex)">Remove Control</a></li>
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
        var checkboxes = [];

        for (let i = 0; i < this.jsa.steps.length; i++) {
            for (let j = 0; j < this.jsa.steps[i].hazards.length; j++) {
                checkboxes.push({'likelihood'+i+j: this.jsa.steps[i].hazards[j].likelihood})
            }
        }
        return {
            errorsPresent: false,
        };
    },
    methods: {
        onSubmit: function() {
            var valid = this.validateForm();
            if(valid){
                this.$emit('createOrUpdate', this.jsa);
            }
        },
        addStep: function() {
            this.jsa.steps.push(Vue.util.extend({}, {
                description: '',
                hazards: []
            }));
        },
        removeStep: function() {
            if(this.jsa.steps.length > 1){
                Vue.delete(this.jsa.steps, this.jsa.steps.length-1);
            }
            window.scrollTo(0, 0);
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
        },
        addControl: function(stepIndex, hazardIndex){
            this.jsa.steps[stepIndex].hazards[hazardIndex].controls.push('');
        },
        removeControl: function(stepIndex, hazardIndex){
            Vue.delete(this.jsa.steps[stepIndex].hazards, this.jsa.steps[stepIndex].hazards[hazardIndex].controls.length-1);
        },
        validateForm: function(){
            if (this.jsa.activity === '') {
                alert("Activity description is required");
                return false;
            } 
            for (let step = 0; step < this.jsa.steps.length; step++) {
                if (this.jsa.steps[step].description === '') {
                    alert("A step description is required");
                    return false;
                } 
                for (let hazard = 0; hazard < this.jsa.steps[step].hazards.length; hazard++) {
                    if (this.jsa.steps[step].hazards[hazard].title === '') {
                        alert("Hazard description is required");
                        return false;
                    }
                    if (this.jsa.steps[step].hazards[hazard].environment === '') {
                        alert("Hazard environment is required");
                        return false;
                    } 
                    if (this.jsa.steps[step].hazards[hazard].exposure === '') {
                        alert("Hazard exposure is required");
                        return false;
                    } 
                    if (this.jsa.steps[step].hazards[hazard].trigger === '') {
                        alert("Hazard trigger is required");
                        return false;
                    } 
                    if (this.jsa.steps[step].hazards[hazard].consequence === '') {
                        alert("Hazard consequence is required");
                        return false;
                    } 
                    if (this.jsa.steps[step].hazards[hazard].likelihood === '') {
                        alert("Hazard likelihood is required");
                        return false;
                    } 
                    if (this.jsa.steps[step].hazards[hazard].risk_level === '') {
                        alert("Hazard risk is required");
                        return false;
                    }
                }
            }
            return true;
        }
    }
};
</script>

<style>
</style>