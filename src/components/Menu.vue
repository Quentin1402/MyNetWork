<template>
    <div class="bg-dark">
        <nav class="navbar navbar-expand navbar-dark container">
            <RouterLink :to="{name : 'home'}" class="navbar-brand">MyNetWork</RouterLink>
            <div v-if="show">
                <RouterLink :to="{name:'identification'}" class="navbar-brand">Connexion</RouterLink>
                <RouterLink :to="{name:'nouveau'}" class="navbar-brand">Nouveau compte</RouterLink>
            </div>
            <div v-else>
                <li class="nav-item">
                    <RouterLink :to="{name:'identification'}" class="navbar-brand">Deconnexion</RouterLink>
                </li>
            </div>
        </nav>
    </div>
</template>

<script setup>
    import { RouterLink } from "vue-router"
    import {useUserNetwork} from "../network/userNetwork"
    import {ref, onMounted, watch} from "vue"
    let show = ref(true);
    const userNetwork = useUserNetwork();
    watch(() => {
        if(userNetwork.user && userNetwork.user.isLogged){
            show.value = false;
        } else {
            show.value = true;
        }
    });
    onMounted(() => {
        if (userNetwork.user && userNetwork.user.isLogged) {
            show.value = false;
        }
    });

    async function logout() {
        await userNetwork.logout();
    }
</script>