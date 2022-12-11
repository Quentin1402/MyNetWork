<template>
    <h1>Créer un nouveau compte</h1>
    <div class="row">
        <div class="col">
            <form @submit.prevent="submit">
                <div class="mb-3">
                    <label for="pseudo">pseudo</label>
                    <input type="text" @focus="show = false" class="form-control" id="pseudo" v-model="pseudo" placeholder="pseudo">
                </div>
                <div class="mb-3">
                    <label for="email">email</label>
                    <input type="email" @focus="show = false" class="form-control" id="email" v-model="email" placeholder="votre@email.fr">
                </div>
                <div class="mb-3">
                    <label for="password">password</label>
                    <input type="password" @focus="show = false" class="form-control" id="password" v-model="password" placeholder="password">
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-primary">
                </div>
                <div class="alert alert-danger" v-if="show">
                    <div v-for="message in messages">{{ message }}</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import {ref} from "vue";
    import {useUserNetwork} from "../../network/userNetwork"
    import Joi from "joi";
    import {useRouter} from "vue-router"
    const pseudo = ref("")
    const email = ref("")
    const password = ref("")
    let show = ref(false)
    let messages = ref({})
    let router = useRouter()
    async function submit (){
        const validationIdentifiant = Joi.object({
            pseudo:Joi.string().trim().min(3).max(255).required(),
            email : Joi.string().email({ tlds: { allow: false } }).required(),
            password:Joi.string().trim().min(6).max(255).required()
        })
        const identifiants = {
            pseudo : pseudo.value,
            email : email.value,
            password : password.value
        }
        const { error } = validationIdentifiant.validate(identifiants , {abortEarly : false})
        if(error) {
            show.value = true ;
            const details = []
            for(let er of error.details){
                details.push(er.message)
            }
            messages.value = details;
            return ;
        }
        let userNetwork = useUserNetwork()
        const reponse = await userNetwork.add(identifiants)
        if(reponse.message && reponse.message === "ok"){
            alert("Compte créé avec succès")
            router.push("/identification")
        } else {
            alert(reponse.message);
        }
        console.log(reponse);
    }
</script>