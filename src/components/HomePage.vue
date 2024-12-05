<template>
    <HeaderComponent />
    <h1>Olá {{name}}, bem vindo à Página inicial</h1>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="item in restaurant" :key="item.id">
                <td>{{item.name}}</td>
                <td>{{item.contact}}</td>
                <td>{{item.address}}</td>
                <td>
                    <router-link :to="'/update-restaurant/'+item.id" class="btn btn-primary btn-sm">
                        Update
                    </router-link>
                    <button @click="deleteRestaurant(item.id)" class="btn btn-danger btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </button>
                </td>
            </tr>
        </tbody>
        
    </table>
</template>
<script>
import HeaderComponent from './HeaderComponent.vue';
import axios from 'axios';
export default {
    name:'HomePage',
    data(){
        return {
            name: '',
            restaurant:[]
        }
    },
    components: {
        HeaderComponent
    },
    methods: {
        async deleteRestaurant(id){
            console.warn(id);
            let result = await axios.delete('http://localhost:3000/restaurants/'+id);
            if(result.status === 200) 
            {
                this.loadData();
            }
        },
        async loadData(){
            let user = localStorage.getItem('User-Info');

            if (!user) {
            this.$router.push({ name: 'SignUp' });
            return; 
        }

            this.name=JSON.parse(user).name;
            
            if(!user)
            {
                this.$router.push({name:'SignUp'})
            }
            let result = await axios.get('http://localhost:3000/restaurants');
            this.restaurant=result.data;
        }
    },
    async mounted()
        {
            this.loadData();
        }
}
</script>

<style>
.btn{
    margin-left:10px;
}
</style>