<template>
    <HeaderComponent />
    <h1>Add Restaurant</h1>
    <form class="add">
        <input type="text" name="Name" placeHolder="Enter Name" v-model="Restaurant.name"/>
        <input type="text" name="Address" placeHolder="Enter Address" v-model="Restaurant.address"/>
        <input type="text" name="Contact" placeHolder="Enter Contact" v-model="Restaurant.contact"/>
        <button type="button" v-on:click="addRestaurant">Add</button>
    </form>
</template>
<script>
import HeaderComponent from './HeaderComponent.vue';
import axios from 'axios';
export default {
    name:'AddRest',
    components: {
        HeaderComponent
    },
    data(){
        return {
            Restaurant: {
                name: '',
                address: '',
                contact: ''
            }
        }
    },
    methods:{
        async addRestaurant(){
            const result = await axios.post("http://localhost:3000/restaurants", {
                name: this.Restaurant.name,
                address: this.Restaurant.address,
                contact: this.Restaurant.contact
            })
            if(result.status == 201)
            {
                this.$router.push({name:'HomePage'})
            }
            console.warn("result", result)
        }
    },
    mounted()
        {
            let user = localStorage.getItem('User-Info');
            console.log(user)
            
            if(!user)
            {
                this.$router.push({name:'SignUp'})
            }

        }
}
</script>