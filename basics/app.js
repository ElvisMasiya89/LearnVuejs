
const app  = Vue.createApp({
    data(){                              // the data function returns an object with app data
        return{
            courseGoal: 'learn Vuejs',
            vueLink:'https://vuejs.org/',
            courseGoalA:'Learn Vue!',
            courseGoalB :'Master Vue!' 

        };
    },

    methods:{                               //The methods object stores all the method that can be used by Vue
        outputGoal() {
        const randomNumber = Math.random();
        if(randomNumber < 0.5){
            return this.courseGoalA;
        }else{
            return this.courseGoalB; //You can use this to reference the "data" object managed  and made available globally by createApp 
        }
     }
    }    
    
});
app.mount('#user-goal');