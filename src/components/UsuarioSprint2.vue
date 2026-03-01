/* eslint-disable */
<template>
    <div>
        <h1>Componente para Usuarios</h1>

        <h3>Crear un Usuario</h3>
        <input v-model="nuevo.login" placeholder="login" />
        <input v-model="nuevo.password_hash" placeholder="password_hash" />
        <input v-model="nuevo.rol_id" placeholder="rol_id" />
        <input v-model="nuevo.ref_identidad_fk" placeholder="ref_identidad_fk" />
        <button @click="crear">Crear</button>
        <button @click="vuelta">Volver</button>


        <table border="1">
            <tr>
                <th>login</th>
                <th>password_hash</th>
                <th>rol_id</th>
                <th>ref_identidad_fk</th>
                <th>estado_id</th>
                <th>ultimo_acceso</th>
                <th>acciones</th>
            </tr>

            <tr v-for="u in usuarios" :key="u.login">
                <td>{{ u.login }}</td>
                <td><input v-model="u.password_hash" /></td>
                <td><input v-model="u.rol_id" /></td>
                <td><input v-model="u.ref_identidad_fk" /></td>
                <td><input v-model="u.estado_id" /></td>
                <td><input v-model="u.ultimo_acceso" /></td>
                <td>
                    <button @click="actualizar(u)">Actualizar</button>
                    <button @click="borrar(u)">Borrar</button>
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
        const usuarios = ref([]);
        const nuevo = ref({
            login: "",
            password_hash: "",
            rol_id: "",
            ref_identidad_fk: "",
            estado_id: "ACT_izan",
            ultimo_acceso: new Date().toISOString(),
            zfecha: new Date().toISOString(),
            zusuario: "ethan"
        });

        const cargar = async () => {
            const res = await fetch("http://44.207.19.239:3000/usuarios?zusuario=ethan");
            usuarios.value = await res.json();
        };

        onMounted(cargar);

        const crear = async () => {
            await fetch("http://44.207.19.239:3000/usuarios?zusuario=ethan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevo.value)
            });
            await cargar();
        };

        const actualizar = async (u) => {
            await fetch(`http://44.207.19.239:3000/usuarios/${u.login}?zusuario=ethan`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(u)
            });
            await cargar();
        };

        const borrar = async (u) => {
            await fetch(`http://44.207.19.239:3000/usuarios/${u.login}?zusuario=ethan`, {
                method: "DELETE"
            });
            await cargar();
        };

        return { usuarios, nuevo, crear, actualizar, borrar,vuelta };
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