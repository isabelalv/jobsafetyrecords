<template>
    <div  id="recordList">
        <section class="wrapper" v-for="record in recordList">
            <div class="inner">
                <div class="content">
                    <header>
                        <h4>{{record.activity}}</h4>
                    </header>
                    <ol>
                        <li v-for="step in record.steps"><p>{{step.description}}</p></li>
                    </ol>
                    <p><a v-bind:href="'record.html?id=' + record._id">View details</a></p>
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
//   methods: {
//     async onDestroy(id) {
//       const sure = window.confirm('Are you sure?');
//       if (!sure) return;
//       await api.deletetask(id);
//       this.flash('task deleted sucessfully!', 'success');
//       const newtasks = this.tasks.filter(task => task._id !== id);
//       this.tasks = newtasks;
//     }
//   },
  async mounted() {
    this.records = await api.getrecords();
  }
};
</script>