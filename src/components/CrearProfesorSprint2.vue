/* eslint-disable */
<template>
    <div>
        <h1>Componente para Profesores</h1>

        <h3>Crear un Profesor</h3>
        <input v-model="nuevo.dni_nie" placeholder="dni_nie" />
        <input v-model="nuevo.nombre" placeholder="nombre" />
        <input v-model="nuevo.apellidos" placeholder="apellidos" />
        <input v-model="nuevo.correo_institucional" placeholder="correo" />
        <input v-model="nuevo.departamento_id" placeholder="departamento_id" />
        <input v-model="nuevo.password_hash" placeholder="password" />
        <button @click="crear">Crear</button>
        <button @click="vuelta">Volver</button>

        <table border="1">
            <tr>
                <th>dni_nie</th>
                <th>nombre</th>
                <th>apellidos</th>
                <th>correo</th>
                <th>departamento</th>
                <th>acciones</th>
            </tr>

            <tr v-for="p in profesores" :key="p.dni_nie">
                <td>{{ p.dni_nie }}</td>
                <td><input v-model="p.nombre" /></td>
                <td><input v-model="p.apellidos" /></td>
                <td><input v-model="p.correo_institucional" /></td>
                <td><input v-model="p.departamento_id" /></td>
                <td>
                    <button @click="actualizar(p)">Actualizar</button>
                    <button @click="borrar(p)">Borrar</button>
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
        const profesores = ref([]);
        const nuevo = ref({
            dni_nie: "",
            nombre: "",
            apellidos: "",
            correo_institucional: "",
            departamento_id: "",
            rol_id: "prof_izan",
            password_hash: "",
            zfecha: new Date().toISOString(),
            zusuario: "ethan"
        });

        const cargar = async () => {
            const res = await fetch("http://44.207.19.239:3000/profesores?zusuario=ethan");
            profesores.value = await res.json();
        };

        onMounted(cargar);

        const crear = async () => {
            const existe = profesores.value.some(
                p => p.dni_nie == nuevo.value.dni_nie ||
                    p.correo_institucional == nuevo.value.correo_institucional
            );
            if (existe) {
                alert("Ya existe un profesor con esos datos");
                return;
            }

            await fetch("http://44.207.19.239:3000/profesores?zusuario=ethan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevo.value)
            });
            await fetch("http://44.207.19.239:3000/usuarios?zusuario=ethan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        login: nuevo.value.nombre,
                        password_hash: nuevo.value.password_hash,
                        rol_id: nuevo.value.rol_id,
                        ref_identidad_fk: nuevo.value.dni_nie,
                        estado_id: "ACT_izan",
                        ultimo_acceso: new Date().toISOString(),
                        zfecha: new Date().toISOString(),
                        zusuario: "ethan"
                    }
                )
            })


            await cargar();
        };

        const actualizar = async (p) => {
            await fetch(`http://44.207.19.239:3000/profesores/${p.dni_nie}?zusuario=ethan`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(p)
            });
            await cargar();
        };

        const borrar = async (p) => {
            do {
                var decision = prompt("Quieres cancelar o mantener las reservas del profesor").toLowerCase();
            } while (decision != "cancelar" && decision != "mantener")
            //si dice cancelar iniciamos el proceso de cancelacion
            if (decision == "cancelar") {
                //hacemos un fetch para sacar todas nuestras reservas
                const res2 = await fetch("http://44.207.19.239:3000/reservas?zusuario=ethan");
                const todasReservas = await res2.json();
                //lo mismo pero con todos los usuarios
                const res3 = await fetch("http://44.207.19.239:3000/usuarios?zusuario=ethan");
                const usuarios = await res3.json();
                //le decimos que el usuario se base en la busqueda de un usuario donde coincida algun usuario dentro de usuarios
                //y el dni que hemos pulsado anteriormente
                const usuario = usuarios.find(r => r.ref_identidad_fk == p.dni_nie)
                //a pesar de que find te devuelva un objeto si no es undefined sirve como boolean positivo(true)
                if (usuario) {
                    //filtramos y obtenemos todas las reservas del profesor en concreto
                    const reservasProfesor = todasReservas.filter(r => r.usuario_login == usuario.login);
                    //hacemos un foreach donde se borre la reserva que se encuentren entre las reservas del profesor
                    for (const reserva of reservasProfesor) {
                        await fetch(`http://44.207.19.239:3000/reservas/${reserva.id}?zusuario=ethan`, {
                            method: "DELETE"
                        });
                    }
                }
            }
            //aqui finalmente borramos al profesor
            await fetch(`http://44.207.19.239:3000/profesores/${p.dni_nie}?zusuario=ethan`, {
                method: "DELETE"
            });
            await cargar();
        };

        return { profesores, nuevo, crear, actualizar, borrar, vuelta };
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

td,
td>input {
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
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

td>button {
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