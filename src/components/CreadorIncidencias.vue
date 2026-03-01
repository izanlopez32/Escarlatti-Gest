<template>
    <div>
            <b>Bienvenido al creador de incidencias</b><br><br>
            <input v-model="espacio_id" placeholder="Espacio_id" /><br><br>
            <input v-model="usuario_login"  placeholder="usuario_login" /><br><br>
            <input v-model="descripcion_problema" placeholder="descripcion_problema" /><br><br>
            <button @click="CrearIncidencia">Crear Incidencia</button><br>
            <button @click="vuelta">Volver a mi panel correspondiente</button>

    </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
    setup() {
        const espacio_id = ref("");
        const usuario_login = ref("");
        const descripcion_problema = ref("");
        const router = useRouter();
        const vuelta = () => router.back();
        const CrearIncidencia = async () => {

            const res = await fetch("http://44.207.19.239:3000/incidencias?zusuario=ethan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    espacio_id: espacio_id.value,
                    usuario_login: usuario_login.value,
                    descripcion_problema: descripcion_problema.value,
                    estado_incidencia_id: "1",
                    responsable_resolucion_id: null,
                    comentarios_resolucion: null,
                    fecha_resolucion: null,
                    zfecha: new Date().toISOString(),
                    zusuario: "ethan"
                })
            });
            const lista = await res.json();

            if (!res.ok) {
                alert(lista.error || "Error al crear la incidencia");
                return;
            }
            alert("Incidencia creada correctamente");
            router.back();
        };
        return { espacio_id, usuario_login, descripcion_problema, CrearIncidencia, vuelta };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
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