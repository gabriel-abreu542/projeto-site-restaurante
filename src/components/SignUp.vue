<template>
    <img class="logo" src="../assets/logo_restaurante.png" />
    <h1>Sign Up</h1>
    <div class="cadastro">
        <input type="text" v-model="name" placeholder="Nome" />
        <input type="text" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Senha" />
        <button v-on:click="signUp">Sign Up</button>
        <p>
            <router-link to="/login">Login</router-link>
        </p>
    </div>

</template>
<script>
import axios from 'axios';
export default {
    name: 'SignUp',
    data()
    {
        return{
            name:'',
            email:'',
            password:''
        }
    },
    methods:{
        async signUp() 
        {
            let user = {
                name:this.name,
                email:this.email, 
                password:this.password
            }
            if (user.name == '' || user.email == '' || user.password == ''){    //implementar aviso na página html
                console.warn("Campos Vazios")
            }
            else{
                let result = await axios.post("http://localhost:3000/users", user);

                console.warn(result)
                if(result.status==201)
                {
                    localStorage.setItem('User-Info', JSON.stringify(result.data));
                    this.$router.push({name:'HomePage'})
                        
                }
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

<style>

</style>
