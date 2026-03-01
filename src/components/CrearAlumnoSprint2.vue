/* eslint-disable */
<template>
    <div>
        <h1>Componente para alumnos</h1>

        <h3>Crear un Alumno</h3>
        <input v-model="nuevo.nia" placeholder="nia" />
        <input v-model="nuevo.nombre" placeholder="nombre" />
        <input v-model="nuevo.apellidos" placeholder="apellidos" />
        <input v-model="nuevo.curso_id" placeholder="curso_id" />
        <input v-model="nuevo.correo_electronico" placeholder="correo" />
        <input v-model="nuevo.tutor_legal_contacto" placeholder="tutor_legal_contacto" />
        <input v-model="nuevo.estado_id" placeholder="estado_id" />
        <button @click="crear">Crear</button>
        <button @click="vuelta">Volver</button>


        <table border="1">
            <tr>
                <th>nia</th>
                <th>nombre</th>
                <th>apellidos</th>
                <th>curso_id</th>
                <th>correo</th>
                <th>tutor legal</th>
                <th>estado_id</th>
                <th>acciones</th>
            </tr>

            <tr v-for="a in alumnos" :key="a.nia">
                <td>{{ a.nia }}</td>
                <td><input v-model="a.nombre" /></td>
                <td><input v-model="a.apellidos" /></td>
                <td><input v-model="a.correo_electronico" /></td>
                <td><input v-model="a.curso_id" /></td>
                <td><input v-model="a.tutor_legal_contacto" /></td>
                <td><input v-model="a.estado_id" /></td>
                <td>
                    <button @click="actualizar(a)">Actualizar</button>
                    <button @click="borrar(a)">Borrar</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {

        const router = useRouter();
    const vuelta = () => router.back();
        const alumnos = ref([]);
        const nuevo = ref({
            nia: "",
            nombre: "",
            apellidos: "",
            correo_electronico: "",
            curso_id: "",
            tutor_legal_contacto: "",
            estado_id: "",
            zfecha: new Date().toISOString(),
            zusuario: "ethan"
        });

        const cargar = async () => {
            const res = await fetch("http://44.207.19.239:3000/alumnos?zusuario=ethan");
            alumnos.value = await res.json();
        };

        onMounted(cargar);

        const crear = async () => {
            await fetch("http://44.207.19.239:3000/alumnos?zusuario=ethan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevo.value)
            });
            await cargar();
        };

        const actualizar = async (p) => {
            await fetch(`http://44.207.19.239:3000/alumnos/${p.nia}?zusuario=ethan`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(p)
            });
            await cargar();
        };

        const borrar = async (p) => {
            await fetch(`http://44.207.19.239:3000/alumnos/${p.nia}?zusuario=ethan`, {
                method: "DELETE"
            });
            await cargar();
        };

        return { alumnos, nuevo, crear, actualizar, borrar, vuelta };
    }
};
</script>
<style scoped>

table {
    border-collapse: collapse;
    margin-top: 20px;
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