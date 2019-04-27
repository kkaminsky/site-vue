<template>
    <v-container grid-list-xl class="pa-0 profile-container">
        <v-layout row wrap>
            <v-flex xs3 class="bg-white border-gray">
                <v-flex>
                    <v-img :src="require(`@/assets/articles/1.jpg`)" aspect-ratio="1.7" class="img-profile"></v-img>
                    <v-btn :class=" { 'blue darken-4 mt-4 white--text' : valid, disabled: !valid }">Редактировать</v-btn>
                </v-flex>
            </v-flex>
            <v-flex xs9>
                <v-layout flex align-center justify-center>
                    <v-flex xs12 class="bg-white border-gray">
                    <v-card>
                        <v-card-text class="pt-4">
                        <div>
                            <h2 class="profile-header text-left">{{user.surname}}  {{user.name}}</h2>
                            <h4 class="profile-subhead text-left">{{user.info}}</h4>
                            <hr class="my-2 hr-profile">
                            <h4 class="profile-subhead gray-text text-left">Ваши категории:</h4>
                            <template v-for="categ in user.categories">
                                <v-layout
                                    row
                                    v-if="categ.id"
                                    align-center
                                    :key="categ.id"
                                    class="ml-1"
                                >
                                <span>{{ categ.name }}</span>
                                </v-layout>
                            </template>
                            
                        </div>
                        </v-card-text>
                    </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { constants } from 'crypto';
    export default {
        name: "Cabinet",
        data() {
            return {
                user: [],
                valid: false,
            }
        },
        created:function (){
            this.$http.get("/dimas/api/v1.0/users/" + localStorage.getItem("user"), { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" } }).then(
                response=>{
                    console.log(response.data.user)
                    this.user = response.data.user
                }
            )
        }
    }
    
</script>

<style scoped>

</style>