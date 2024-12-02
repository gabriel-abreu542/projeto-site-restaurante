<template>
    <img class="logo" src="../assets/logo_restaurante.png" />
    <h1>Login</h1>
    <div class="login">
        <input type="text" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Senha" />
        <button v-on:click="login">Entrar</button>
        <p>
            <router-link to="/sign-up">Sign Up</router-link>
        </p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'LoginPage',
    data()
    {
        return {
            email: '',
            password: ''
        }
    },
    methods:{
        async login()
        {
            let result = await axios.get(
                `http://localhost:3000/users?email=${this.email}&password=${this.password}`
            )
            console.warn(result)
            if(result.status==200 && result.data.length > 0)
            {
                localStorage.setItem('User-Info', JSON.stringify(result.data[0]));
                this.$router.push({name:'HomePage'})
            }
        },
        mounted()
        {
            let user = localStorage.getItem('User-Info');            
            if(user)
            {
                this.$router.push({name:'HomePage'})
            }

        }
    }
}
</script>