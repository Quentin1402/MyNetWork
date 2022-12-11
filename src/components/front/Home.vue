<template>
    <h2>Bonjour {{nom}}</h2>
    <Suspense>
        <template #default>
            <HomeGrille />
        </template>
        <template #fallback>
            données en cours de chargement
        </template>
    </Suspense>
</template>

<script setup>
    import {Suspense} from "vue";
    import HomeGrille from "./HomeGrille.vue";
    import {useUserNetwork} from "../../network/userNetwork";
    const userNetwork = useUserNetwork();
    const nom = userNetwork.user.pseudo;
</script>