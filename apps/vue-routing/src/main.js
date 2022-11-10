import { createApp } from 'vue';
import {createRouter , createWebHistory} from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';


const router = createRouter({
    history: createWebHistory(),
    routes :  [
        { path: '/', redirect: '/teams' }, // redirecting routes

        {
            name: 'teams',
            path: '/teams',
            meta: {needAuth:true}, // meta takes any kind of value eg object, and you can access meta where the $route object is used
            components: {default: TeamsList, footer:TeamsFooter},  //our-domain.com/teams => TeamsList
            children: [
              { name: 'team-members', path: ':teamId', component: TeamMembers, props: true } 
              // /Passing Data with Route Params :teamsId and Passing Data with Route Paramsas props and Nested routes
            ]
          },

        { 
          path: '/users',  
          components: {
                default: UsersList, 
                footer: UsersFooter
              },

          //This is Component Level Navigation Guard  function that is called before navigating to another page   
          //It can declared in the component route or inside the component
          beforeEnter(to, from, next){
            console.log('users before enter');
            console.log(to, from);
            next();
          }    
          }, //our-domain.com/users => UsersList,
        { path: '/:notFound(.*)', component: NotFound }
    ],

    linkActiveClass : 'active',

     // This allows you determine the scrollBehavior as you move between tabs
    scrollBehavior( _, _2, savePosition){ // This allows you determine the scrollBehavior as you move between tabs
      // console.log(to, from, savePosition);
      if (savePosition){
        return savePosition;
      }
      return {left: 0 , top: 0}

    }  
});


//This is  Global Navigation Guard  function that is called before navigating to another page
router.beforeEach(function(to, from, next){
  console.log("Global beforeEach");
  console.log(to, from);
  // next(false);
  //next(true); is the same next() by boolean value true is passed by default
  //next('/users'); can even pass in registered routes
  

  //if teams/teamId router allow navigation else navifate to teams/t2
  //  if(to.name === 'team-members'){
  //   next();
  //  }else{
  //     next({name: 'team-members', params:{teamId:'t2'} }); 
  //   }


  if(to.meta.needAuth){// 'to.meta.needAuth' Check if the route you are going to needs authentication
    // Using the meta  field defined in the team-members route.
    // Meta data Can be  used to make Global navigation guard that perform different tasks based on th value in the meta field for each route.
    //This allows customise the global guards, or be used inside the any component or anywhere the $route object is used.
    console.log('Needs auth!');
    next();
  }else{
    next();
  }

  // next();
})

//This is  Global Navigation Guard  function that is called after navigating to another page
router.afterEach(function(to, from){
  // Can use for sending analytics data
  console.log('Global afterEach');
  console.log(to,from);
})




const app = createApp(App)

app.use(router);

app.mount('#app');
