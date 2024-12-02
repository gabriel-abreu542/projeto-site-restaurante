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
        <div v-if="errorMessage" class="errorMsg">{{ errorMessage }}</div>
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
            password:'',
            errorMessage: ""
        }
    },
    methods:{
        async signUp() 
        {
            this.errorMessage = "";

            if (!this.email || !this.password) {
                this.errorMessage = "Preencha todos os campos!";
                return;
            }

            if (!this.validateEmail()){
                this.errorMessage = "Email em formato inválido!";
                return;
            }
            if (!this.validatePassword()) {
                this.errorMessage = "Senha deve possuir ao menos um dígito, uma letra e no mínimo 8 caracteres.";
                return;
            }

            let user = {
                name:this.name,
                email:this.email, 
                password:this.password
            }

            let result = await axios.post("http://localhost:3000/users", user);

            if(result.status==201)
            {
                localStorage.setItem('User-Info', JSON.stringify(result.data));
                this.$router.push({name:'HomePage'})
                    
            }
        },
        validateEmail(){
            this.errorMessage = "";

            let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if(!emailRegex.test(this.email)){
                return false;
            }
            return true;
        },
        validatePassword(){
            this.errorMessage = "";

            let passwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            if(!passwRegex.test(this.password)){
                return false;
            }
            return true;
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
