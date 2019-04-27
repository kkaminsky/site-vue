<template>
    <div >
        <v-parallax :src="require(`@/assets/articles/${this.$router.currentRoute.path.split('/')[2]}`.concat('.jpg'))"></v-parallax>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex >
                    <v-layout row>                     
                        <v-flex md6>
                            <!-- <v-img :src="require(`@/assets/articles/${this.$router.currentRoute.path.split('/')[2]}`.concat('.jpg'))" aspect-ratio="1.7" style="min-width:300px; height:100%;"  ></v-img> -->
                        </v-flex>
                        <v-flex md6 flex align-center justify-center >
                            <v-flex xs12 class="bg-white border-gray pa-0" style="height:100%" >
                            <v-card style="height:100%">
                                <v-card-text class="pt-4">
                                <div>
                                    <h2 class="profile-header text-left mb-2" style="font-size:2rem">{{eventName}}</h2>
                                    <h4 class="profile-subhead text-left">{{eventDescription}}</h4>
                                    <hr class="my-3 hr-profile">
                                    <p class="text-left"><span class="gray-text">Место проведения:</span> {{eventPlaceResponce}}</p> 
                                    <p class="text-left"><span class="gray-text">Время начала:</span> {{eventBeginDate}} </p>
                                    <v-chip  v-for="cat in eventCategories"
                                        label
                                        class="mx-1 mb-2 text-uppercase"
                                        :color="cat.color"
                                        text-color="white"
                                        small
                                        :key="cat.id"
                                    >
                                        {{cat.name}}
                                    </v-chip>
                                    
                                </div>
                                </v-card-text>
                            </v-card>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                    <v-layout row >

                        <v-flex >
                            <h2 class="display-2 mt-5">Участники</h2>
                            <v-btn @click="change"></v-btn>

                        </v-flex>

                    </v-layout>

                </v-flex>
            </v-layout>
                <v-flex v-show="flag">
                    <div>

                        <!--<div class="controls">
                            <button @click="prev" class="button"><i class="prev"></i><span class="text-hidden">prev</span></button>
                            <button @click="next" class="button"><i class="next"></i><span class="text-hidden">next</span></button>
                        </div>-->
                    </div>
                    <!--<GameCardsStack
                            :cards="visibleCards"
                            @cardAccepted="handleCardAccepted"
                            @cardRejected="handleCardRejected"
                            @cardSkipped="handleCardSkipped"
                            @hideCard="removeCardFromDeck"
                    />-->
                    <div class="stack-wrapper">
                        <stack ref="stack" :pages="someList" :stackinit="stackinit"></stack>

                    </div>
                    <div class="controls">
                        <button @click="prev" class="button"><i class="prev"></i><span class="text-hidden">prev</span></button>
                        <button @click="next" class="button"><i class="next"></i><span class="text-hidden">next</span></button>
                    </div>
                </v-flex>
            
            
            <v-container fluid>
                <v-layout wrap>
                    <v-flex v-for="user in compArrSomeLis" md4>
                        <v-card  color="white">
                            <v-avatar size="120px">
                                <img :src="user.img">
                            </v-avatar>
                            <v-card-title>
                                <div class="flex text-sm-center">
                                    <div class="subheading">{{user.name}}</div>
                                    <span class="caption">{{user.info}}</span>
                                </div>
                            </v-card-title>
                            <v-card-actions class="justify-center">
                                <v-btn @click="userLikeOrDisLike(user.id,1)">
                                    <v-icon>call_merge</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-container>


    </div>
</template>

<script>
    import Parallax from '../components/Parallax.vue'
    import GameCardsStack from "../components/CardStack"
    import Widget from "../components/Widget"
    import Stack from "../components/stack"
    import Card from "./Card";
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    export default {


        components: {
            Card,
            GameCardsStack,
            Widget,
            Stack
        },

        data() {
            return {
                flag:false,
                visibleCards:[{
                    jobTitle: 'Web Developer',
                    name: 'Michael Wang',
                    //color: '#ba234b',
                    dark: true,
                    avatar: {
                        src: 'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat4&accessoriesType=Prescription01&hatColor=Black&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Black&graphicType=Selena&eyeType=Squint&eyebrowType=AngryNatural&mouthType=Default&skinColor=DarkBrown',
                        size: '36'
                    }
                }],
                eventName:"",   
                eventDescription:"",
                eventBeginDate:"",
                eventPlace:"",
                eventCategories: [],
                str: "",
                eventPlaceResponce:"",
                someList:[],
                stackinit: {
                    visible: 4
                }
            }
        },
        created:function () {
            this.load()
        },
        computed:{
            compArrSomeLis(){
                return this.someList
            },
          cards(){

              let arr = []
              let a = {
              }
              for (var i = 0; i < this.users.length; i++){
                  console.log(i)
                  a.name = i

                  a.user = this.users[i]
                  console.log(this.users[i])
                  arr.push(a)
              }
              this.mySuperCard = arr
              return this.mySuperCard
          }
        },
        methods: {
            load(){
                let a = this.$router.currentRoute
               // console.log(a.path.split('/')[1])
                this.$http.get("/dimas/api/v1.0/events/".concat(a.path.split('/')[2]), { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" } }).then(
                    response=>{
                        this.eventDescription = response.data.event.description
                        this.eventName = response.data.event.name
                        this.eventBeginDate = response.data.event.beginingDate //place_id
                        this.eventPlace = response.data.event.place_id
                        this.eventCategories = response.data.event.categories
                        this.$http.get("/dimas/api/v1.0/places/" + response.data.event.place_id, { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" } }).then(
                            response=>{
                                this.eventPlaceResponce = response.data.place.name
                            }
                        )
                    }
                )
                
               
                let data = {
                    "user_from_id":localStorage.getItem("user")
                }
                //console.log(data)
                this.$http.post("/dimas/api/v1.0/events/".concat(a.path.split('/')[2]).concat("/students"),data, { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" }}).then(
                    response=>{
                       // console.log(response)
                        let  users = [
                            {
                                jobTitle: 'Web Developer',
                                name: 'Michael Wang',
                                //color: '#ba234b',
                                dark: true,
                                avatar: {
                                    src: 'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat4&accessoriesType=Prescription01&hatColor=Black&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Black&graphicType=Selena&eyeType=Squint&eyebrowType=AngryNatural&mouthType=Default&skinColor=DarkBrown',
                                    size: '36'
                                }
                            },
                            {
                                jobTitle: 'Web Designer',
                                name: 'Jessie J',
                                color: '#e57b09',
                                dark: true,
                                avatar: {
                                    src: 'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat1&accessoriesType=Sunglasses&hatColor=Red&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                                    size: '36'
                                }
                            },
                            {
                                jobTitle: 'Web Developer',
                                name: 'Jim J',
                                color: 'teal',
                                dark: true,
                                avatar: {
                                    src: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Sunglasses&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Happy&eyebrowType=Default&mouthType=Default&skinColor=Light',
                                    size: '36'
                                },
                            },
                            {
                                jobTitle: 'Product Manager',
                                name: 'John Doe',
                                color: '#a51288',
                                dark: true,
                                cardBgImage: '/static/bg/15.jpg',
                                avatar: {
                                    src: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairSides&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=SadConcerned&mouthType=ScreamOpen&skinColor=Brown',
                                    size: '36'
                                },
                            },
                        ]

                        //console.log("233")
                        //this.visibleCards = users.concat(users)
                        this.someList=[]
                        for (var i = 0; i < response.data.users.length; i++){

                            let a = {
                            }
                            //a.html = '<img src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairSides&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=SadConcerned&mouthType=ScreamOpen&skinColor=Brown" style="border-radius: 50%" alt="01">'
                            //a.img="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairSides&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=SadConcerned&mouthType=ScreamOpen&skinColor=Brown"
                            /*a.card = i
                            a.user = users[i]
                            a.user.name = response.data.users[i].name
                            a.user.id = response.data.users[i].id
                            this.visibleCards.push(a)*/
                            a.img = users[response.data.users[i].id%4].avatar.src
                            a.name = response.data.users[i].name
                            a.text = response.data.users[i].info
                            a.id = response.data.users[i].id
                            //console.log(a)
                            this.someList.push(a)
                        }
                    }

                )
            },
            change(){
              this.flag = !this.flag;
              this.$forceUpdate();

            },
            prev () {
                this.$refs.stack.$emit('prev')
            },
            next () {
                this.$refs.stack.$emit('next')
            },
            userLikeOrDisLike(userId,mark){
                let data ={
                    "user_to_id": userId,
                    "event_id": this.$router.currentRoute.path.split('/')[2],
                    "mark":mark
                }
                let vm = this
                this.$http.post("/dimas/api/v1.0/userlikes/".concat(localStorage.getItem("user")),data, { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" }}).then(function () {
                    vm.load()
                    }
                )

            },
            handleCardAccepted(card) {
                console.log(this)
                console.log(card.user.id)
                let data ={
                    "user_to_id": card.user.id,
                    "event_id": this.$router.currentRoute.path.split('/')[2],
                    "mark":1
                }
                this.$http.post("/dimas/api/v1.0/userlikes/".concat(localStorage.getItem("user")),data, { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" }})

            },
            handleCardRejected(card) {
                console.log(card.user.id)
                let data ={
                    "user_to_id": card.user.id,
                    "event_id": this.$router.currentRoute.path.split('/')[2],
                    "mark":0
                }
                this.$http.post("/dimas/api/v1.0/userlikes/".concat(localStorage.getItem("user")),data, { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" }})

            },
            handleCardSkipped() {
                console.log("handleCardSkipped");
            },
            removeCardFromDeck() {
                this.visibleCards.shift();
            }
        }
    };
</script>
<style>
    .stack-wrapper{
        margin: 0 auto;
        position: relative;
        border: #88506f;
        z-index: 1000;
        width: 320px;
        height: 320px;
        padding: 0;
        list-style: none;
        pointer-events: none;
    }
    .controls{
        position: relative;
        width: 200px;
        text-align: center;
        display:flex;/*Flex布局*/
        display: -webkit-flex; /* Safari */
        justify-content:space-around;
        margin: 0 auto;
        margin-top: 50px
    }
    .controls .button {
        border: none;
        background: none;
        position: relative;
        display: inline-block;
        cursor: pointer;
        font-size: 16px;
        width: 50px;
        height: 50px;
        z-index: 100;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        border-radius: 50%;
        background: #c6c5c1;
    }
    .button .next{
        display: inline-block;
        width: 10px;
        height:5px;
        background: rgb(129,212,125);
        line-height: 0;
        font-size:0;
        vertical-align: middle;
        -webkit-transform: rotate(45deg);
        left: -5px;
        top: 2px;
        position: relative;
    }
    .button .next:after{
        content:'/';
        display:block;
        width: 20px;
        height:5px;
        background: rgb(129,212,125);
        -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
    }
    .button .prev{
        display: inline-block;
        width: 20px;
        height:5px;
        background: rgb(230,104,104);
        line-height: 0;
        font-size:0;
        vertical-align: middle;
        -webkit-transform: rotate(45deg);
    }
    .button .prev:after{
        content:'/';
        display:block;
        width: 20px;
        height:5px;
        background: rgb(230,104,104);
        -webkit-transform: rotate(-90deg);
    }
    .controls .text-hidden {
        position: absolute;
        overflow: hidden;
        width: 0;
        height: 0;
        color: transparent;
        display: block;
    }
</style>

