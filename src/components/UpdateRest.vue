<template>
    <HeaderComponent />
    <h1>Update Restaurant</h1>
    <form class="add">
        <input type="text" name="Name" placeHolder="Enter Name" v-model="restaurant.name"/>
        <input type="text" name="Address" placeHolder="Enter Address" v-model="restaurant.address"/>
        <input type="text" name="Contact" placeHolder="Enter Contact" v-model="restaurant.contact"/>
        <button type="button" v-on:click="updateRestaurant">Update</button>
    </form>
</template>
<script>
import HeaderComponent from './HeaderComponent.vue';
import axios from 'axios';
export default {
    name:'UpdateRest',
    components: {
        HeaderComponent
    },
    data(){
        return {
            restaurant: {
                name: '',
                address: '',
                contact: ''
            }
        }
    },
    methods:{
        async updateRestaurant(){
            const result = await axios.put("http://localhost:3000/restaurants/"+this.$route.params.id, {
                name: this.restaurant.name,
                address: this.restaurant.address,
                contact: this.restaurant.contact
            })
            if(result.status == 200)
            {
                this.$router.push({name:'HomePage'})
            }
        }
    },
    async mounted()
        {
            let user = localStorage.getItem('User-Info');
            console.log(user)
            
            if(!user)
            {
                this.$router.push({name:'SignUp'})
            }
            
            const result = await axios.get('http://localhost:3000/restaurants/'+this.$route.params.id)
            this.restaurant=result.data;

        }
}
</script>