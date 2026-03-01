/* eslint-disable */
<template>
    <div v-if="$route.path == '/'">
        <h1>¿Que función deseas hacer como Alumno/a?</h1>


        <button @click="CreadorIncidencias">Crear una incidencia</button><br><br>
        <button @click="CerrarSesion">Cerrar mi sesión</button><br>

        <br>
    </div>
    <router-view />
</template>

<script>
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();
        const CreadorIncidencias = () => router.push("/CreadorIncidencias");
        const CerrarSesion = () => window.location.href = "http://localhost:8080";


        return { CreadorIncidencias, CerrarSesion };
    }
};
</script>
<style scoped>
h1 {
    margin-bottom: 15px;
    color: #1a1a2e;
    font-size: 24px;
}

div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 80px auto;
    padding: 40px;
    border: none;
    width: 320px;
    border-radius: 16px;
    background-color: #eaf4ff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

button {
    margin-top: 15px;
    margin-left: 5px;
    margin-bottom: 5px;
    padding: 10px 30px;
    background-color: #9b6dbd;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
}

button:hover {
    background-color: #7a4f9a;
}

input {
    margin: 5px 0 5px 0;
    padding: 8px 12px;
    border: 1px solid #aac4e0;
    border-radius: 8px;
    font-size: 15px;
    width: 100%;
}
</style>