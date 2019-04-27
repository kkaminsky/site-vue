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
                <v-toolbar-title class="white--text"><h4>Регистрация</h4></v-toolbar-title>
            </v-toolbar>
            <v-card>
                <v-card-text class="pt-4">
                <div v-if="message" class="alert alert-success" role="alert">
                    {{message}}
                </div>
                <div>
                    <v-form v-model="valid" ref="form" @submit.prevent="register" class="bg-gray">
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

                        <v-text-field
                        label="Повторите пароль"
                        v-model="repassword"
                        min="8"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (e1 = !e1)"
                        :type="e1 ? 'password' : 'text'"
                        :rules="passwordRules"
                        counter
                        required
                        ></v-text-field>

                        <v-layout justify-space-between>
                            <v-btn @click="register" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Зарегистрироваться</v-btn>
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
            message: '',
            passwordRules: [
              (v) => !!v || 'Password is required',
            ],
            email: ''
          }
        },
        methods: {
          register () {
            let self = this;
            let data = {
                "email" : this.email,
                "password" : this.password
            }
            this.$http.post("/dimas/api/v1.0/users", data, { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" } }).then(
                response=>{              
                    self.message = 'Вы успешно зарегистрировались!'
                }
            )
          }
        },
        name: "RegisterPage",
    }
</script>

<style scoped>

</style>