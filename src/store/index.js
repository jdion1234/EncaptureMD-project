import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        tabledata: null
    },
    mutations: {
        retrieveData(state, json) {
            // create array placeholder
            var dataArray = [];

            // add table data to placeholder
            for (var i = 0; i < json.length; i++) {
                dataArray.push({
                    name: json[i].name,
                    username: json[i].username,
                    email: json[i].email,
                    readonly: true,
                    class: "not_editable_class"
                })
            }

            // replace old table data with updated placeholder
            state.tabledata = dataArray;
        },

        editData(state, index) {

            // if the row is currently read-only, make it editable
            if (state.tabledata[index].readonly) {
                state.tabledata[index].class = "editable_class";
                state.tabledata[index].readonly = false;
            } 
            
            // if the row is currently editable, make it read-only
            else {
                state.tabledata[index].class = "not_editable_class";
                state.tabledata[index].readonly = true;
            }
        },

        deleteData(state, row) {
            // get table data and put into placeholder
            var dataArray = state.tabledata;

            // remove row
            dataArray.splice(row, 1);

            // replace old table data with updated placeholder
            state.tabledata = dataArray;
        },

        addRow(state) {

            // get table data and put into placeholder
            var dataArray = state.tabledata;

            // add blank row to placeholder
            dataArray.push({
                name: "",
                username: "",
                email: "",
                readonly: false,
                class: "editable_class"
            })

            // replace old table data with updated placeholder
            state.tabledata = dataArray;
        }
    },
    actions: {},
    getters: {
        getData: state => {
            return state.tabledata; // returns table data
        }
    }

})

export default store;