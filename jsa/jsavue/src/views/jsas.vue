<template>
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
                    <p><a v-bind:href="jsa._id">View details</a></p>
                    <hr>
                </div>
            </div>
        </section>
    </div  >
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