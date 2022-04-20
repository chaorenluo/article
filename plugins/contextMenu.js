import Vue from 'vue'
import contextMenu from 'vue-context-menu';
console.log(process.client)
if(process.client){

  Vue.component('context-menu',contextMenu)
}
