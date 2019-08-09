<template>
  <el-input v-model="scope" size="small" :readonly="!editable" class="testclass" />
</template>

<script>
export default {
  name: "editableInput",
  props: {
    editable: Boolean,
    scope: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
