<template>
  <div>
    <h1>Edit JSA record</h1>
    <jsa-form @createOrUpdate="createOrUpdate" :jsa=this.jsa></jsa-form>
  </div>
</template>

<script>
import jsaForm from '../components/JSAForm.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'edit',
  components: {
    'jsa-form': jsaForm
  },
  data: function() {
    return {
      jsa: {}
    };
  },
  methods: {
    createOrUpdate: async function(jsa) {
      const res = await api.updaterecord(jsa);
      this.flash('record updated sucessfully!', 'success');
      this.$router.push('/jsas/' + res._id);
    }
  },
  async mounted() {
    this.jsa = await api.getrecord(this.$route.params.id);
  }
};
</script>