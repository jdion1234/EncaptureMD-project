<template>
  <div style="width: 790px;">
    <el-table :data="tableData">
      <el-table-column prop="name" label="Name" width="180">
        <template slot-scope="scope">
          <div :class="scope.row.class">
            <el-input
              placeholder="Name"
              v-model="scope.row.name"
              size="small"
              :readonly="scope.row.readonly"
              v-on:keyup.enter.native="press_enter(scope.$index)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="Username" width="180">
        <template slot-scope="scope">
          <div :class="scope.row.class">
            <el-input
              placeholder="Username"
              v-model="scope.row.username"
              size="small"
              :readonly="scope.row.readonly"
              v-on:keyup.enter.native="press_enter(scope.$index)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Email Address" width="250">
        <template slot-scope="scope">
          <div :class="scope.row.class">
            <el-input
              placeholder="Email"
              v-model="scope.row.email"
              size="small"
              :readonly="scope.row.readonly"
              v-on:keyup.enter.native="press_enter(scope.$index)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Options" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="button_style">
      <el-button size="mini" @click="handleAdd()">Add</el-button>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  beforeCreate() {
    // create reference to vuex store
    var mystore = this.$store;

    // get table data from url to put into vuex store
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(function(response) {
        // update vuex state with table data
        mystore.commit("retrieveData", response.data);
        console.log("Call successful");
      })
      .catch(function(error) {
        // print error
        console.log(error);
      });
  },

  computed: {
    //get table data from vuex store to use in component
    tableData() {
      return this.$store.getters.getData;
    }
  },

  methods: {
    handleEdit: function(index) {
      // call vuex mutator 'editData' to handle editing a row's values
      this.$store.commit("editData", index);
    },
    handleDelete: function(index) {
      // call vuex mutator 'deleteData' to handle deleting a row
      this.$store.commit("deleteData", index);
    },
    press_enter: function(index) {
      // if enter is pressed and row is currently editable, let vuex mutator 'editData' handle making it read-only
      if (!this.$store.getters.getData[index].readonly) {
        this.$store.commit("editData", index);
      }
    },

    handleAdd: function() {
      // call vuex mutator 'addRow' to handle creating a new blank row
      this.$store.commit("addRow");
    }
  }
};
</script>

<style scoped>
.button_style {
  padding-top: 20px;
  padding-left: 10px;
}

.editable_class {
  border-style: solid !important;
  border-width: 1px;
  border-radius: 4px;
  border-color: rgb(34, 5, 199) !important;
}

.not_editable_class {
  border-style: solid !important;
  border-width: 1px;
  border-radius: 4px;
  border-color: rgb(255, 255, 255) !important;
}
</style>
