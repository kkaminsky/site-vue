<template>
    <!-- <div class="d-flex flex-settings"> -->
    <v-container grid-list-md>
        <v-layout row>
            <v-flex xs6>
                <form>
                    <v-text-field
                    label="E-mail"
                    data-vv-name="email"
                    required
                    ></v-text-field>

                    <v-text-field
                    label="Имя"
                    data-vv-name="name"
                    required
                    ></v-text-field>

                    <v-text-field
                    label="Фамилия"
                    data-vv-name="surname"
                    required
                    ></v-text-field>

                    <v-text-field
                    label="Отчество"
                    data-vv-name="surname"
                    required
                    ></v-text-field>

                    <v-text-field
                    label="Телефон"
                    data-vv-name="surname"
                    required
                    ></v-text-field>

                    <v-textarea
                    label="О себе"
                    data-vv-name="surname"
                    required
                    ></v-textarea>
                    
                    <v-btn @click="submit">Сохранить</v-btn>

                </form>
            </v-flex>
            <v-flex xs6>
                <!-- <v-card>
                    <v-card-text class="pa-0">
                    <pie-chart :data="data" legend="bottom" :colors="['#d11', '#112', '#23f', '#45a']"></pie-chart>
                    </v-card-text>
                </v-card> -->
            </v-flex>
        </v-layout>
        <!-- <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-parallax> -->
    <!-- </div> -->
    </v-container>
</template>

<script>
// import Statistic from '../components/Statistic.vue'
// import PieChart from 'piechart'
    export default {
        // data(){
        //     return{
        //         data: {'Blueberry': 44, 'Strawberry': 23, 'Abc': 11, 'Def': 88}
        //     }
        // },
        name: "CabinetPage",
         methods: {
            submit () {
                //TODO SEND FORM
            }
        }
    }
</script>

<style scoped>

</style>