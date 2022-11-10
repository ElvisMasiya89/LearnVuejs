<template>
  <ul>
    <button @click="confirmInput"> Confirm</button>
    <button>Save Changes</button>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],

  data(){
    return {changesSaved: false};
  },

  methods:{
    confirmInput(){
      //do something
      //Programatic routing
      this.$router.push('/teams');
    }
  }, 

 //This is Component Level Navigation Guard  function that is called before navigating to this component is confirmed  
 //It can declared in the component route or inside the component
  beforeRouteEnter(to, from, next){
    console.log('UserList Cmp beforeRouteEnter');
    console.log( to , from);
    next();
  },

//This is Component Level Navigation Guard  function that is called before navigating to another page   
 //It can declared in the component route or inside the component
  beforeRouteLeave(to, from, next){
    console.log('UserList Cmp beforeRouteLeave');
    console.log(to , from);

    if(this.changesSaved){
      next();
    }else{
      //This returns a boolean vale true/false
      const userWantToLeave = confirm('Are you sure you want to leave? Yo got unsaved changes!')
      next(userWantToLeave)
    }
  }

};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>

