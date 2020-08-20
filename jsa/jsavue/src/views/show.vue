<template>
    <section class="wrapper" >
        <div class="inner" id="recordContent" >
            <div class="content">
                <header>
                    <h2>{{ record.activity }}</h2>
                </header>
                <div v-for="(step,index) in record.steps" v-bind:key="step">
                    <h4 >{{index+1}}. {{step.description}}</h4>
                    <div v-for="hazard in step.hazards" v-bind:key="hazard">
                        <table class="alt">
                            <tbody>
                                <tr>
                                    <td><strong>Hazard Description</strong></td>
                                    <td><strong>{{hazard.title}}</strong></td>
                                </tr>
                                <tr>
                                    <td>Environment</td>
                                    <td>{{hazard.environment}}</td>
                                </tr>
                                <tr>
                                    <td>Exposure</td>
                                    <td>{{hazard.exposure}}</td>
                                </tr>
                                <tr>
                                    <td>Trigger</td>
                                    <td>{{hazard.trigger}}</td>
                                </tr>
                                <tr>
                                    <td>Consequences</td>
                                    <td>{{hazard.consequence}}</td>
                                </tr>
                                <tr>
                                    <td>Likelihood</td>
                                    <td>{{hazard.likelihood[0]}}</td>
                                </tr>
                                <tr>
                                    <td>Risk Level</td>
                                    <td>{{hazard.risk_level[0]}}</td>
                                </tr>
                                <tr>
                                    <td>Controls</td>
                                    <td>
                                        <ul>
                                            <li v-for="control in hazard.controls" v-bind:key="control">
                                                {{control}}
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr>
                </div>
                <div class="col-12">
                    <ul class="actions" >
                        <li v-on:click="onDestroy(record._id)"><a class="button">Delete Record</a></li>
                    </ul>
                    <hr/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { api } from '../helpers/helpers';
export default {
  name: 'show',
  data() {
    return {
      record: ''
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm('Are you sure?');
      if (!sure) return;
      await api.deleterecord(id);
      this.flash('record deleted sucessfully!', 'success');
      this.$router.push('/');
    }
  },
  async mounted() {
    this.record = await api.getrecord(this.$route.params.id);
  }
};
</script>

<style>
</style>