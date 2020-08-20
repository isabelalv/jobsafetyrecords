<template>
  <div>
    <jsa-form @createOrUpdate="createOrUpdate"></jsa-form>
  </div>
</template>

<script>
import jsaForm from '../components/JSAForm.vue';
import { api } from '../helpers/helpers';
export default {
  name: 'new-jsa',
  components: {
    'jsa-form': jsaForm
  },
  methods: {
    createOrUpdate: async function(record) {
      const res = await api.createrecord(record);
      this.flash('record created', 'success');
      this.$router.push(`/jsas/${res._id}`);
    }
  }
};
</script>