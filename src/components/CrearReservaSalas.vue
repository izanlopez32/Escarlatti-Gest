/* eslint-disable */
<template>
    <div>
        <h1>Componente para reservas</h1>

        <h3>Reservas realizadas</h3>

        <table border="1">
            <tr>
                <th>id</th>
                <th>espacio_id</th>
                <th>horario_id</th>
                <th>usuario_login</th>
                <th>fecha_reserva</th>
                <th>motivo_reserva</th>
                <th>acciones</th>
            </tr>

            <tr v-for="r in reservas" :key="r.id">
                <td>{{ r.id }}</td>
                <td><input v-model="r.espacio_id"/></td>
                <td><input v-model="r.horario_id" /></td>
                <td><input v-model="r.usuario_login" /></td>
                <td><input v-model="r.fecha_reserva" /></td>
                <td><input v-model="r.motivo_reserva" /></td>
                <td>
                    <button @click="actualizar(r)">Actualizar</button>
                    <button @click="borrar(r)">Borrar</button>
                </td>
            </tr>
        </table>
        <button @click="vuelta">Volver</button>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {

        const router = useRouter();
    const vuelta = () => router.back();
        const reservas = ref([]);
        const nuevo = ref({
            espacio_id: "",
            horario_id: "",
            usuario_login: "",
            fecha_reserva: "",
            motivo_reserva: "",
            zfecha: new Date().toISOString(),
            zusuario: "ethan"
        });

        const cargar = async () => {
            const res = await fetch("http://44.207.19.239:3000/reservas?zusuario=ethan");
            reservas.value = await res.json();
        };

        onMounted(cargar);

        const actualizar = async (r) => {
            await fetch(`http://44.207.19.239:3000/reservas/${r.id}?zusuario=ethan`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(r)
            });
            await cargar();
        };

        const borrar = async (r) => {
            await fetch(`http://44.207.19.239:3000/reservas/${r.id}?zusuario=ethan`, {
                method: "DELETE"
            });
            await cargar();
        };

        return { reservas, nuevo, actualizar, borrar, vuelta };
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