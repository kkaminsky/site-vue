<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid grid-list-xl class="pa-0">


                <!--@change="updateMap($event.value)"
        @selected="selectedMethod()"
        v-model=""
        :value="selectedMapOption"
        :group="switchGroup"-->

        <v-layout row wrap>

            <v-flex xs9>
                <v-layout wrap>
                    <v-flex xs12>
                        <slot/>
                    </v-flex>
                    <feed-card
                            v-for="(article, i) in paginatedArticles"
                            :key="article.id"
                            :size="layout[i]"
                            :value="article"/>
                </v-layout>
            </v-flex>
            <v-flex xs3 class="side-right-menu">
                <v-card>
                    <div class="vh-100 bg-white">
                        <v-form>
                            <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="date"
                                persistent
                                lazy
                                full-width
                                width="290px"
                            >
                            <template v-slot:activator="{ on }">
                                <toggle-switch :options="myOptions" @input="changeCateg()"/>

                                <v-flex></v-flex>
                            <v-text-field
                                v-model="date"
                                label="Выберите дату"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal = false">Отмена</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                            </v-date-picker>
                            </v-dialog>
                            <v-text-field 
                            label="Название мероприятия">
                            </v-text-field>
                            <v-select
                            :items="category"
                            v-model="selectCat"
                            label="Категория"
                            attach
                            chips

                            multiple
                            ></v-select>
                            <v-btn @click="login" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Найти</v-btn>
                            <template v-for="item in itemsMenu" >

                                <v-layout
                                    row
                                    v-if="item.id"
                                    align-center
                                    :key="item.id"
                                >
                                    <v-flex xs6>
                                    <v-subheader v-if="item.id">
                                        {{ item.id }}
                                    </v-subheader>
                                    </v-flex>
                                    <v-flex xs6 class="text-xs-center">
                                    <a href="#!" class="body-2 black--text">EDIT</a>
                                    </v-flex>
                                </v-layout>
                                
                                <v-list-tile :key="item.text" :to="item.route" > 
                                    <v-list-tile-action >
                                    <v-icon>{{ item.icon }}</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ item.text }}
                                    </v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>




                        </v-form>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import ToggleSwitch from 'vuejs-toggle-switch'

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    export default {
        name: 'Feed',
        components: {
            FeedCard: () => import('./FeedCard.vue'),

        },
        data: () => ({
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            layout: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            categ: false,
            page: 1,
            events: [],
            filteredEvents:[],
            itemsMenu: [
                { icon: 'playlist_add', text: 'Добавить мероприятие', route: '/event/add' },
                // { icon: 'list', text: 'Список мероприятий', route: '/login' },
                // { icon: 'settings', text: 'Конструктор мероприятий', route: '/register' }
            ],
            category: ['Музыка', 'Хореография', 'Театр'],
            selectCat:[],
            myOptions: {
                layout: {
                    color: 'black',
                    backgroundColor: 'lightgray',
                    selectedColor: 'white',
                    selectedBackgroundColor: 'green',
                    borderColor: 'black',
                    fontFamily: 'Arial',
                    fontWeight: 'normal',
                    fontWeightSelected: 'bold',
                    squareCorners: false,
                    noBorder: false
                },
                size: {
                    fontSize: 1,
                    height: 2,
                    padding: 0,
                    width: 20
                },
                items: {
                    delay: .4,
                    preSelected: 'не краудфандинг',
                    disabled: false,
                    labels: [
                        {name: 'не краудфандинг', color: 'white', backgroundColor: 'blue'},
                        {name: 'краудфандинг', color: 'white', backgroundColor: 'blue'}
                    ]
                }
            },

            //
        }),
        created:function (){
            this.$http.get("/dimas/api/v1.0/events", { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" } }).then(
                response=>{
                    // console.log(response.data.events)
                    this.events = response.data.events
                    this.filteredEvents = response.data.events
                }
            )

            this.$http.get("/dimas/api/v1.0/categories", { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" } }).then(
                response=>{
                    // console.log(response.data.category)
                    this.category = response.data.categories.map(c=>c.name)


                }
                
            )
        },
        computed: {

            categors(){
              return this.category
            },

            pages () {
                return Math.ceil(this.$store.getters.events.length / 11)
            },
            paginatedArticles () {
                let a =this.filteredEvents
                if(this.selectCat.length){
                    a = a.filter(e=>this.selectCat.filter(val=>e.categories.map(c=>c.name).indexOf(val)!==-1).length>0)
                }
                return a
            }
        },
        watch: {
            page () {
                window.scrollTo(0, 0)
            }
        },
        methods:{
            changeCateg(){
                this.categ=!this.categ
                console.log(this.events)
                if(this.categ){
                    let events = this.events
                    this.filteredEvents = events.filter(e=>e.eventType===1)
                }
                else{
                    let events = this.events
                    this.filteredEvents = events.filter(e=>e.eventType===2)
                }
                console.log(this.filteredEvents)





            }
        }
    }
</script>

<style scoped>

</style>