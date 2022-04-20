import Vue from 'vue'

export default ({ app }, inject) => {
  if(process.client){
    const EventBus = new Vue()
    inject('EventBus', EventBus);
  }
}
