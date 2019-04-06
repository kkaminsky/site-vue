<template>
    <div>
        <v-navigation-drawer
                persistent
                :mini-variant="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                enable-resize-watcher
                fixed
                app
        >
            <v-list two-line class="pa-0">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <v-icon>account_circle</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{name1}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list>
                    <v-list-tile v-for="item in menuItems" :to="item.route">
                        <v-list-tile-action>
                            <v-icon v-html="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar
                app
                :clipped-left="clipped"
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <v-btn icon @click.stop="clipped = !clipped">
                <v-icon>web</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
    </div>
</template>

<script>


    export default {
        data () {
            return {
                clipped: false,
                drawer: true,
                fixed: false,
                miniVariant: true,
                right: true,
                rightDrawer: false,
                title: 'Логистика 2.0'
            }
        },
        computed: {
            name1() {
                return "ff"
            },
            roles() {
                return "ff"
            },
            menuItems() {
                return [
                    {
                        icon: 'book',
                        title: 'Домашняя страница',
                        route: '/'
                    },
                    {
                        icon: 'description',
                        title: 'События',
                        route: 'events',
                    }

                ]
            },
            name: 'App'
        }}
</script>