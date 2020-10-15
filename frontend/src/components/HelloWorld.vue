<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ echo }}</h1>
    <h2>{{ title }}</h2>
    <h4>{{ counter }}</h4>
    <button @click="decCounter()">-</button>
    <button @click="incCounter()">+</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  echo = "Hello, world!"
  title = "when3meet"
  counter = 0
  
  incCounter() {
    this.counter++;
  }

  decCounter() {
    this.counter--;
  }
}
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
