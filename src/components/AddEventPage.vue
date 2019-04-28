<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid grid-list-md>

        <h2 style="text-align:left;padding: 0%;">
            Шаг 1
        </h2>
        <v-layout row>
            <v-flex style="text-align:left;"  md6>Название: </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex md6>
                <v-text-field
                        label="Your product or service"

                        hint="For example, flowers or used cars"
                        outline
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex style="text-align:left;"  md6>Описание: </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex md6>
                <v-text-field
                        label="Your product or service"

                        hint="For example, flowers or used cars"
                        outline
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex style="text-align:left;"  md5>Выберите категорию: </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex md6><v-combobox
                    v-model="model"
                    :filter="filter"
                    :hide-no-data="!search"
                    :items="comItem"
                    :search-input.sync="search"
                    hide-selected
                    label="Search for an option"
                    multiple
                    small-chips
                    solo
            >
                <template v-slot:no-data>
                    <v-list-tile>
                        <span class="subheading">Create</span>
                        <v-chip
                                :color="`${comColors[nonce - 1]} lighten-3`"
                                label
                                small
                        >
                            {{ search }}
                        </v-chip>
                    </v-list-tile>
                </template>
                <template v-slot:selection="{ item, parent, selected }">
                    <v-chip
                            v-if="item === Object(item)"
                            :color="`${item.color} lighten-3`"
                            :selected="selected"
                            label
                            small
                    >
        <span class="pr-2">
          {{ item.text }}
        </span>
                        <v-spacer></v-spacer>
                        <v-icon
                                small
                                @click="parent.selectItem(item)"
                        >close</v-icon>
                    </v-chip>
                </template>
                <template v-slot:item="{ index, item }">
                    <v-list-tile-content>
                        <v-text-field
                                v-if="editing === item"
                                v-model="editing.text"
                                autofocus
                                flat
                                background-color="transparent"
                                hide-details
                                solo
                                @keyup.enter="edit(index, item)"
                        ></v-text-field>
                        <v-chip
                                v-else
                                :color="`${item.color} lighten-3`"
                                dark
                                label
                                small
                        >
                            {{ item.text }}
                        </v-chip>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-list-tile-action @click.stop>

                            <v-icon>eject</v-icon>

                    </v-list-tile-action>
                </template>
            </v-combobox></v-flex>


            <!--<v-flex xs10>
                <v-toolbar class="pt-2 blue darken-4">
                    <v-toolbar-title class="white&#45;&#45;text"><h4>Создание мероприятия</h4></v-toolbar-title>
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
                                <v-btn @click="send" :class=" { 'blue darken-4 white&#45;&#45;text' : valid, disabled: !valid }">Создать</v-btn>
                            </v-layout>
                        </v-form>
                    </div>
                </v-card>
            </v-flex>-->
        </v-layout>
        <v-layout row>
            <v-flex style="text-align:left;"  md6>Выберите тип: </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex md6>
                <v-combobox
                        v-model="select"
                        :items="items2"
                        chips
                        class="pa-0 mt-0"

                >
                    <template v-slot:selection="data">
                        <v-chip
                                :key="JSON.stringify(data.item)"
                                :selected="data.selected"
                                :disabled="data.disabled"
                                class="v-chip--select-multi"
                                @click.stop="data.parent.selectedIndex = data.index"
                                @input="data.parent.selectItem(data.item)"
                        >
                            <v-avatar class="accent white--text">
                                {{ data.item.slice(0, 1).toUpperCase() }}
                            </v-avatar>
                            {{ data.item }}
                        </v-chip>
                    </template>
                </v-combobox>
            </v-flex>

        </v-layout>
        <v-layout row>
            <v-flex style="text-align:left;" class="ma-0 pa-0" md6>Дата начала: </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex  md5>
                <v-datetime-picker
                        locale="ru-ru"
                        v-model="eventDateTime1"
                        width="800">
                </v-datetime-picker>
            </v-flex>

        </v-layout>
        <v-layout row>
            <v-flex style="text-align:left;" class="ma-0 pa-0" md6>Дата конца: </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex  md5>
                <v-datetime-picker
                        locale="ru-ru"
                        v-model="eventDateTime2"
                        width="800">
                </v-datetime-picker>
            </v-flex>

        </v-layout>

    </v-container>
</template>

<script>

    export default {
        data: () => ({
            eventDateTime1: new Date(),
            eventDateTime2: new Date(),
            activator: null,
            attach: null,
            colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
            editing: null,
            index: -1,
            select: 'Не краудфандинг',
            items2: [
                'Краудфандинг',
                'Не краудфандинг'

            ],
            items: [
                { header: 'Select an option or create one' }
            ],
            nonce: 1,
            menu: false,
            model: [

            ],
            x: 0,
            search: null,
            y: 0
        }),
        computed:{
            comItem(){
                return this.items
            },
            comColors(){
                return this.colors
            }
        },

        watch: {
            model (val, prev) {
                if (val.length === prev.length) return

                this.model = val.map(v => {
                    if (typeof v === 'string') {
                        v = {
                            text: v,
                            color: this.colors[this.nonce - 1]
                        }

                        this.items.push(v)

                        this.nonce++
                    }

                    return v
                })
            }
        },
        created:function(){
            this.$http.get("/dimas/api/v1.0/categories", { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" } }).then(
                response=>{
                    // console.log(response.data.category)
                    this.items = [{ header: 'Select an option or create one' }]
                    //this.colors = response.data.categories.map(c=>c.color)
                    for(var i=0;i<response.data.categories.length;i++){
                        let a = {}
                        a.color = response.data.categories[i].color
                        a.text = response.data.categories[i].name
                        this.items.push(a)
                    }
                    console.log(this.items)

                    //.concat(response.data.categories.map(c=>c.text=c.name))


                }

            )
        },

        methods: {
            edit (index, item) {
                if (!this.editing) {
                    this.editing = item
                    this.index = index
                } else {
                    this.editing = null
                    this.index = -1
                }
            },
            filter (item, queryText, itemText) {
                if (item.header) return false

                const hasValue = val => val != null ? val : ''

                const text = hasValue(itemText)
                const query = hasValue(queryText)

                return text.toString()
                    .toLowerCase()
                    .indexOf(query.toString().toLowerCase()) > -1
            }
        }
    }
</script>


<style scoped>

</style>