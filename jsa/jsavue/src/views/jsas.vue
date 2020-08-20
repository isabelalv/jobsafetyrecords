<template>
  <div>
    <section class="wrapper" >
      <div class="inner">
        <div class="content">
          <ul class="actions">
            <router-link :to="`/jsas/new`"><li><p class="button">New Record</p></li></router-link>
          </ul>
        </div>
      </div>
    </section>
    <div  id="recordList">
        <section class="wrapper" v-for="jsa in jsas" v-bind:key="jsa._id">
            <div class="inner">
                <div class="content">
                    <header>
                        <h4>{{jsa.activity}}</h4>
                    </header>
                    <ol>
                        <li v-for="step in jsa.steps" v-bind:key="step"><p>{{step.description}}</p></li>
                    </ol>
                    <p><router-link :to="`/jsas/${jsa._id}`">View Details</router-link></p>
                    <hr>
                </div>
            </div>
        </section>
    </div  >
  </div>
</template>

<script>
import { api } from '../helpers/helpers';
export default {
  name: 'jsas',
  data() {
    return {
      jsas: []
    };
  },
  async mounted() {
    this.jsas = await api.getrecords();
  }
};
</script>