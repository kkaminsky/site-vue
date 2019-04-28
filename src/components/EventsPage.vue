<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid grid-list-xl class="pa-0">
        <v-layout row wrap>
            <v-flex xs9 class="main-events-pa">
                <v-layout wrap>
                    <v-flex xs12 class="mt-4 ml-3">
                        <h2 class="main-events-header text-left">Интересное для Вас: </h2>
                        <!-- -->
                        <hr class="my-2 hr-profile">
                        <!-- <slot/> -->
                    </v-flex>
                    <feed-card
                        v-for="(article, i) in paginatedArticles"
                        :key="article.id"
                        :size="layout[i]"
                        :value="article"/>
                </v-layout>
            </v-flex>
            <v-flex xs3 class="side-right-menu white-color">
                <v-card class="pt-0 w-25">
                    <div class="vh-100 bg-white">
                        <v-form>
                            <h2 class="main-events-header text-left mt-2">Найдите свое: </h2>
                            <hr class="my-2 hr-profile">
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
                                <toggle-switch :options="myOptions" @input="changeCateg()" class="flex-start"/> 

                                <v-flex></v-flex>
                            <v-text-field
                                v-model="date"
                                label="Выберите дату"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker :first-day-of-week="1"
                                           locale="ru-ru" v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal = false">Отмена</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                            </v-date-picker>
                            </v-dialog>
                            <!-- <v-text-field 
                            label="Название мероприятия">
                            </v-text-field> -->
                            <v-select
                            :items="category"
                            v-model="selectCat"
                            label="Категория"
                            attach
                            chips

                            multiple
                            ></v-select>

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
                                <div class="flex-start">
                                     <v-btn
                                     class="ma-0" 
                                    :key="item.text"
                                    :to="item.route"
                                    color="success">
                                        <v-icon left dark>add</v-icon>
                                        {{item.text}}
                                    </v-btn>
                                </div>
                               
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
            layout: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
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
                    preSelected: 'ОБЫЧНЫЕ',
                    disabled: false,
                    labels: [
                        {name: 'ОБЫЧНЫЕ', color: 'white', backgroundColor: '#151724'},
                        {name: 'КРАУДФАНДИНГ', color: 'white', backgroundColor: '#151724'}
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