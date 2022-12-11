import { createRouter, createWebHistory } from "vue-router"
import Home from "./components/front/Home.vue";
import Single from "./components/front/Single.vue";
import Identification from "./components/front/Identification.vue";
import Nouveau from "./components/front/Nouveau.vue";

export const router = createRouter({
    history : createWebHistory(),
    routes : [
        {path : "/" , name : "home" , component: Home},
        {path : "/article/:id" , name : "article" , component: Single},
        {path : "/identification" , name : "identification" , component: Identification},
        {path : "/nouveau" , name : "nouveau" , component: Nouveau}
    ]
})