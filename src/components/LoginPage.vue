<style>
.v-toolbar__content{
    display: flex;
    justify-content: center;
}
</style>

<template>
    <v-container fluid fill-height class="loginOverlay">
        <v-layout flex align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
            <v-toolbar class="pt-2 blue darken-4">
                <v-toolbar-title class="white--text"><h4>Авторизация</h4></v-toolbar-title>
            </v-toolbar>
            <v-card>
                <v-card-text class="pt-4">
                <div>
                    <v-form v-model="valid" ref="form" @submit.prevent="login">
                        <v-text-field
                        label="Введите e-mail"
                        v-model="email"
                        required
                        ></v-text-field>
                        <v-text-field
                        label="Введите пароль"
                        v-model="password"
                        min="8"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (e1 = !e1)"
                        :type="e1 ? 'password' : 'text'"
                        :rules="passwordRules"
                        counter
                        required
                        ></v-text-field>
                        <v-layout justify-space-between>
                            <v-btn @click="login" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Войти</v-btn>
                        </v-layout>
                    </v-form>
                </div>
                </v-card-text>
            </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
          return {
            valid: false,
            e1: false,
            password: '',
            passwordRules: [
              (v) => !!v || 'Password is required',
            ],
            email: ''
          }
        },
        methods: {
          login () {


             let data = {
                "email" : this.email,
                "password" : this.password
             }
             this.$http.post("/dimas/api/v1.0/users/login", data, { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" } }).then(
                 response=>{
                     localStorage.setItem("user",response.data.user.id)
                     this.$router.push('/');
                }
             )
          }
        },
        name: "LoginPage",
    }
</script>

<style scoped>

</style>