/* eslint-disable */
<template>
    <div>
        <h1>Componente para horarios</h1>

        <h3>Crea una Etapa</h3>
        <input v-model="nuevo.nombre" placeholder="nombre" />
        <input v-model="nuevo.hora_inicio" placeholder="hora_inicio"/>
        <input v-model="nuevo.hora_fin" placeholder="hora_fin"/>
        <input v-model="nuevo.turno_id" placeholder="turno_id"/>
        <button @click="crear">Crear</button>
        <button @click="vuelta">Volver</button>


        <table border="1">
            <tr>
                <th>id</th>
                <th>nombre</th>
                <th>hora_inicio</th>
                <th>hora_fin</th>
                <th>turno_id</th>
                <th>acciones</th>
            </tr>

            <tr v-for="h in horarios" :key="h.id">
                <td>{{ h.id }}</td>
                <td><input v-model="h.nombre" /></td>
                <td><input v-model="h.hora_inicio" /></td>
                <td><input v-model="h.hora_fin" /></td>
                <td><input v-model="h.turno_id" /></td>
                <td>
                    <button @click="actualizar(h)">Actualizar</button>
                    <button @click="borrar(h)">Borrar</button>
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
        const horarios = ref([]);
        const nuevo = ref({
            nombre: "",
            hora_inicio: "",
            hora_fin: "",
            turno_id: "",
            zfecha: new Date().toISOString(),
            zusuario: "ethan"
        });

        const cargar = async () => {
            const res = await fetch("http://44.207.19.239:3000/horarios?zusuario=ethan");
            horarios.value = await res.json();
        };

        onMounted(cargar);

        const crear = async () => {
            await fetch("http://44.207.19.239:3000/horarios?zusuario=ethan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevo.value)
            });
            await cargar();
            
        };

        const actualizar = async (e) => {
            await fetch(`http://44.207.19.239:3000/horarios/${e.id}?zusuario=ethan`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(e)
            });
            await cargar();
        };

        const borrar = async (e) => {
            await fetch(`http://44.207.19.239:3000/horarios/${e.id}?zusuario=ethan`, {
                method: "DELETE"
            });
            await cargar();
        };

        return { horarios, nuevo, crear, actualizar, borrar, vuelta };
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