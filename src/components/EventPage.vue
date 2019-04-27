<template>
    <div >
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex >
                    <v-layout row>                     
                        <v-flex  md6>
                            <v-img :src="require(`@/assets/articles/${this.$router.currentRoute.path.split('/')[2]}`.concat('.jpg'))" aspect-ratio="1.7" style="min-width:300px; border: 14px solid #223642"  ></v-img>
                        </v-flex>
                            
                        <v-flex md3>
                            
                            <v-flex >
                                <widget icon="domain" subTitle="Место проведения" :title= 'eventPlace' color="#00b297"/>
                            </v-flex>
                                <v-flex>
                                <widget icon="watch_later" subTitle="Время начала" :title='eventBeginDate' color="#1D2939"/>
                            </v-flex>
                            
                        </v-flex>
                        <v-flex md3 >
                            
                            <v-flex >
                                <widget icon="computer" :title='eventName' subTitle= 'Название' color="#0866C6"/>
                            </v-flex>
                            <v-flex >
                                <widget icon="money_off" :title='eventDescription' subTitle= 'Описание' color="#dc3545"/>
                            </v-flex>
                            
                        </v-flex>
                    </v-layout>
                    <v-layout row >

                        <v-flex >
                            <h2 class="display-2">Участники</h2>

                        </v-flex>
                    </v-layout>

                </v-flex>
                <v-flex>
                    <v-icon>keyboard_arrow_left</v-icon>
                    <p>Не хочу</p>

                </v-flex>
                <v-flex class="flex-settings">
                    <GameCardsStack
                            :cards="visibleCards"
                            @cardAccepted="handleCardAccepted"
                            @cardRejected="handleCardRejected"
                            @cardSkipped="handleCardSkipped"
                            @hideCard="removeCardFromDeck"
                    />
                </v-flex>
                <v-flex>

                    <v-icon>keyboard_arrow_right</v-icon>
                    <p>Хочу пойти</p>
                </v-flex>
            </v-layout>
        </v-container>


    </div>
</template>

<script>
    import GameCardsStack from "../components/CardStack";
    import Widget from "../components/Widget"

    export default {


        components: {
            GameCardsStack,
            Widget
        },

        data() {
            return {
                visibleCards:[],
                eventName:"",
                eventDescription:"",
                eventBeginDate:"",
                eventPlace:""
            }
        },
        created:function () {
            let a = this.$router.currentRoute
            console.log(a.path.split('/')[1])
            this.$http.get("/dimas/api/v1.0/events/".concat(a.path.split('/')[2]), { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" } }).then(
                response=>{
                    this.eventDescription = response.data.event.description
                    this.eventName = response.data.event.name
                    this.eventBeginDate = response.data.event.beginingDate
                    this.eventPlace = response.data.event.place
                }
            )
            let data = {
                "user_from_id":localStorage.getItem("user")
            }
            console.log(data)
            this.$http.post("/dimas/api/v1.0/events/".concat(a.path.split('/')[2]).concat("/students"),data, { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" }}).then(
                response=>{
                    let  users = [
                        {
                            jobTitle: 'Web Developer',
                            name: 'Michael Wang',
                            color: '#ba234b',
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

                    for (var i = 0; i < response.data.users.length; i++){
                        let a = {
                        }
                        a.card = i
                        a.user = users[i]
                        a.user.name = response.data.users[i].name
                        a.user.id = response.data.users[i].id
                        this.visibleCards.push(a)
                    }
                }

            )




               /* for (var i = 0; i < users.length; i++){
                    let a = {
                    }
                    a.card = i
                    a.user = users[i]

                    this.visibleCards.push(a)
        }*/
        },
        computed:{

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

