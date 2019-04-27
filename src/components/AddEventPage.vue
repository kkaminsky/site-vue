<template>
    <v-container fluid grid-list-md>
        <v-layout flex align-center justify-center row wrap>
            <v-flex xs10>
                <v-toolbar class="pt-2 blue darken-4">
                    <v-toolbar-title class="white--text"><h4>Создание мероприятия</h4></v-toolbar-title>
                 </v-toolbar>
                 <v-card class="pt-0">
                    <div>
                        <v-form v-model="valid" ref="form" @submit.prevent="login">
                            <v-text-field
                            label="Название"
                            v-model="name"
                            required
                            ></v-text-field>
                            <v-text-field
                            label="Описание"
                            v-model="description"
                            required
                            ></v-text-field>

                            <v-dialog
                                ref="dialogStart"
                                v-model="modalStart"
                                :return-value.sync="dateStart"
                                persistent
                                lazy
                                full-width
                                width="290px"
                            >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="dateStart"
                                label="Выберите дату начала"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="dateStart" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modalStart = false">Отмена</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialogStart.save(dateStart)">OK</v-btn>
                            </v-date-picker>
                            </v-dialog>

                            <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="dateEnd"
                                persistent
                                lazy
                                full-width
                                width="290px"
                            >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="dateEnd"
                                label="Выберите дату окончания"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="dateEnd" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal = false">Отмена</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(dateEnd)">OK</v-btn>
                            </v-date-picker>
                            </v-dialog>

                            <v-select
                            :items="places"
                            label="Место проведения"
                            solo
                            ></v-select>

                            <v-layout justify-space-between>
                                <v-btn @click="send" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Создать</v-btn>
                            </v-layout>
                        </v-form>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
          return {
              modal: '',
              modalStart: '',
              dateEnd: '',
              dateStart: '',
              places: ['Место1', 'Место2', 'Место3']
          }
        },
        created:function (){
            this.$http.get("/dimas/api/v1.0/places", { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" } }).then(
                response=>{
                    // console.log(response.data.places)
                    //this.places = response.data.places
                }
            )
        },
        name: "AddEventPage"
    }
</script>

<style scoped>

</style>