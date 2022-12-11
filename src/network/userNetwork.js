import { defineStore } from "pinia"
import { UserApi } from "../services/user"

export const useUserNetwork = defineStore("userNetwork" , {
    state : () => {
        return {
            user : {},
            livraison : {}
        }
    },
    actions : {
        add : async function(identifiant){
            const userApi = new UserApi();

            const verifP = await userApi.existeP(identifiant.pseudo)
            
            if(!verifP) return {message : "le pseudo est déjà utilisé"}
            
            const verif = await userApi.existe(identifiant.email)
            
            if(!verif) return {message : "l'email est déjà utilisé"}

            await userApi.create(identifiant)

            return {message : "ok" } ;
        },
        login : async function(identifiant){
            const userApi = new UserApi();

            const user = await userApi.connexion(identifiant);

            this.user = {
                pseudo : user[0].pseudo ,
                email : user[0].email ,
                isLogged : true 
            } ; 

            return {message : "ok" } ;

        },
        logout: async function () {
            this.user = {
              pseudo: "",
              email: "",
              password: "",
              urlImgProfil: "",
              isLogged: false,
            };
      
            return this.user;
        }
    }

})