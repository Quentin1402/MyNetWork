<template>
    <div class="row">
        <article v-for="article , index in articles" :key="index">
            <center>
                <div class="card mt-3">
                    <div class="card-header">
                        <table align="center">
                            <tr>
                                <td>
                                    {{ article.pseudo }} a posté le : {{ new Date(article.date).getDate() + "/" + (new Date(article.date).getMonth()+ 1) + "/" + new Date(article.date
                                    ).getFullYear() }} à {{ new Date(article.date).getHours() + ":" + new Date(article.date).getMinutes() + ":" + new Date(article.date).getSeconds() }}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <img class="card-img-top" :src="article.urlImgArticle" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text"> {{ article.contenu }}</p>
                    </div>
                    <div class="card-header card-footer border-primary">
                        <button class="btn btn-primary">
                            {{ article.like }}
                        </button>
                        <button class="btn btn-success">
                            {{ article.commentaires.length }}
                        </button>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">Commentaires:</h3>
                    </div>
                    <div v-for="(comments, index2) in article.commentaires" :key="index2" class="card-body">
                        <header class="d-flex justify-content-between align-items-baseline mt-0">
                        <h5 class="card-title mb-0">
                            {{ comments.pseudo }}
                        </h5>
                        <h5>
                            posté le {{ new Date(comments.dt).getDate() }}/{{
                            (new Date(comments.dt).getMonth() +1)
                            }}/{{ new Date(comments.dt).getFullYear() }} à
                            {{ new Date(comments.dt).getHours() }}h{{
                            new Date(comments.dt).getMinutes()
                            }}
                        </h5>
                        </header>
                        <p>{{ comments.contenu }}</p>
                    </div>
                </div>
            </center>
        </article>
    </div>
</template>

<script setup>
    import ArticlesApi from '../../services/articles';
    import { ref } from "vue" ;
    let articles = ref([]);
    async function getArticles(){
        const api = new ArticlesApi()
        const data = await api.getAll()
        articles.value = data;
        let date = new Date();
        date = new Date(articles.value[0].date);
        console.log(date);
    }
    await getArticles();
</script>