/* eslint-disable */
<template>
    <div>
        <h1>Alumnos Inscritos</h1>
        <!--Hacemos una tabla simple donde le meteremos lineas que obtendremos de nuestra api-->
        <table border="1">
            <tr>
                <th>nia</th>
                <th>nombre</th>
                <th>apellidos</th>
                <th>curso_id</th>
                <th>correo_electronico</th>
                <th>tutor_legal_contacto</th>
                <th>estado_id</th>
            </tr>
            <!--Usaremos v-for para pasar por todos los valores de nuestra api, donde 
                antes de cada iteracion declararemos todos los valores del valor que 
                tocaba en dicha iteracion -->
            <tr v-for="alumno in AlumnosCurso" :key="alumno.nia">
                <td>{{ alumno.nia }}</td>
                <td>{{ alumno.nombre }}</td>
                <td>{{ alumno.apellidos }}</td>
                <td>{{ alumno.curso_id }}</td>
                <td>{{ alumno.correo_electronico }}</td>
                <td>{{ alumno.tutor_legal_contacto }}</td>
                <td>{{ alumno.estado_id }} </td>
            </tr>
        </table>
        <button @click="vuelta">Volver</button>
    </div>
</template>

<script>

import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
    setup() {
        const AlumnosCurso = ref([]);
        const route = useRoute();
        const id = route.query.id;
        const router = useRouter();
    const vuelta = () => router.back();

        //Creamos nuestro metodo para cargar/recargar los datos cada vez que lo llamemos(esto para cuando hagamos un update/eliminacion/creacion)
        const cargar = async () => {
            const res = await fetch("http://44.207.19.239:3000/alumnos?zusuario=ethan");
            const alumnos = await res.json();
            AlumnosCurso.value = alumnos.filter(a => a.curso_id == id);

        };
        //Similar a mounted(), sirve para ejecutar el metodo deseado cuando el componente TERMINE DE CARGAR
        onMounted(cargar);
        //Retornamos todos los datos al template
        return {vuelta, AlumnosCurso, id };
    }
};


</script>
<style scoped>

table {
    border-collapse: collapse;
    margin: 20px;
}

th {
    background-color: #7a4f9a;
    color: white;
    padding: 12px 8px;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

td, td>input {
    background-color: #d6eaf8;
    padding: 10px 8px;
    font-size: 13px;
    text-align: center;
    border-bottom: 1px solid #aac4e0;
}
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto;
    padding: 20px;
    border: none;
    width: 90%;
    max-width: 1100px;
    border-radius: 16px;
    background-color: #eaf4ff;
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}

button {
margin: 15px 15px 5px 0px;
    padding: 10px 30px;
    background-color: #9b6dbd;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    width: 20%;
}
td > button{
    width: 100%;
}
button:hover {
    background-color: #7a4f9a;
}

input {
    margin: 5px 10px 5px 0;
    padding: 4px 6px;
    border: 1px solid #aac4e0;
    border-radius: 8px;
    font-size: 15px;
    width: 50%;
}

</style>