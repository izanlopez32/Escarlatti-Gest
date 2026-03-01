<template>
  <div>
    <p>
     <b>Incidencias Creadas<br><br>
                <table border="1">
            <tr>
                <th>id</th>
                <th>ID Espacio</th>
                <th>Usuario afectado</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Tecnico Asignado</th>
                <th>Comentarios</th>
                <th>Fecha Resolucion</th>
                <th>ZFECHA</th>
                <th>Acciones</th>
            </tr>
            <!--Usaremos v-for para pasar por todos los valores de nuestra api, donde 
                antes de cada iteracion declararemos todos los valores del valor que 
                tocaba en dicha iteracion -->
            <tr v-for="incidencia in incidencias" :key="incidencia.id">
                <td>{{ incidencia.id }}</td>
            <td>{{incidencia.espacio_id }}</td>
                <td>{{incidencia.usuario_login }}</td>
                <td>{{incidencia.descripcion_problema }}</td>
                <td v-if="incidencia.estado_incidencia_id == '1'">Abierto</td>
                <td v-else-if="incidencia.estado_incidencia_id == '2'">Proceso</td>
                <td v-else-if="incidencia.estado_incidencia_id == '3'">Cerrado</td>
                <td>{{ incidencia.responsable_resolucion_id }}</td>
                <td>{{ incidencia.comentarios_resolucion }}</td>
                <td>{{ incidencia.zfecha?.split("T")[0] }}</td>
                <td>{{ incidencia.zfecha?.split("T")[0] }}</td>

                <td>
            <!--Declaramos x metodo al clickar un boton y le pasamos el usuario entero(en este caso el que está en la iteracion)-->
                    <button @click="actualizar(incidencia.id)">Actualizar</button>
                    <button @click="borrar(incidencia)">Borrar</button>
                </td>
            </tr>
        </table>
    <button @click="vuelta">Volver a mi panel correspondiente</button></b>
    </p>

  </div>
</template>

<script>
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
     setup() {
     const router = useRouter();
    const vuelta = () => router.back();
        const incidencias = ref([]);

        const cargar = async () => {
            const res = await fetch("http://44.207.19.239:3000/incidencias?zusuario=ethan");
            incidencias.value = await res.json();
        };

        onMounted(cargar);

        const actualizar = (incidencia) => {
      router.push({
        name: "ActualizarResolucionIncidencias",
        query: {id: incidencia}
      });
        };

        const borrar = async (incidencia) => {
            await fetch(`http://44.207.19.239:3000/incidencias/${incidencia.id}?zusuario=ethan`, {
                method: "DELETE"
            });
            await cargar();
        };



return { vuelta,incidencias, actualizar, borrar }; 
} 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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