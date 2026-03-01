<template>
    <div>
        <p>
            <b>Reservación de salas</b><br><br><br><br>
            <input v-model="nuevo.horario_id" placeholder="Tramo horario" /><br><br>
            <select v-model="nuevo.espacio_id">
                <option value="">Selecciona un espacio</option>
                <option v-for="e in espaciosOperativos" :key="e.id" :value="e.id">{{ e.id }} - {{ e.nombre }}</option>
            </select> <input v-model="nuevo.usuario_login" placeholder="Solicitante" /><br><br>
            <input v-model="nuevo.motivo_reserva" placeholder="Motivo" /><br><br>
            <input v-model="nuevo.fecha_reserva" placeholder="Fecha(####-##-##)" /><br><br>
            <button @click="crear">Crear reserva</button><br>
            <button @click="visualizar">Ver reservas</button><br>
            <button @click="vuelta">Volver a mi panel correspondiente</button>
        </p>

    </div>
</template>

<script>
/* eslint-disable */
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
export default {
    setup() {
        const estados = [{ id: "OP", nombre: "Operativo", permite_reserva: true },
        { id: "MAN", nombre: "Mantenimiento", permite_reserva: false },
        { id: "AVE", nombre: "Averiado", permite_reserva: false },
        { id: "CLAU", nombre: "Clausurado", permite_reserva: false }];
        const reservas = ref([]);
        const espacios = ref([]);
        const espaciosOperativos = ref([]);
        const nuevo = ref({
            horario_id: "",
            espacio_id: "",
            usuario_login: "",
            motivo_reserva: "",
            fecha_reserva: "",
            zfecha: new Date().toISOString(),
            zusuario: "ethan"
        });
        const router = useRouter();
        const vuelta = () => router.back();
        const visualizar = () => router.push("/VisualizarReservas");
        const cargar = async () => {
            const res = await fetch("http://44.207.19.239:3000/reservas?zusuario=ethan");
            reservas.value = await res.json();
            const res2 = await fetch("http://44.207.19.239:3000/espacios?zusuario=ethan");
            espacios.value = await res2.json();
            espaciosOperativos.value = espacios.value.filter(e => e.estado_operativo == "OP");

        };

        onMounted(cargar);


        const crear = async () => {
            //some devuelve true o false dependiendo de si se cumple o no lo que le pedimos
            const existe = reservas.value.some(
                r => r.horario_id == nuevo.value.horario_id &&
                    r.espacio_id == nuevo.value.espacio_id &&
                    r.fecha_reserva.split("T")[0] == nuevo.value.fecha_reserva
            );
            if (existe) {
                alert("Ya existe una reserva con esos datos");
                return;
            }
            const espacio = espacios.value.find(
                e => e.id == nuevo.value.espacio_id);
            //a pesar de que find te devuelva el objeto y no un boolean esta condicional sirve de todas modas ya que atrapa false O UNDEFINED(osea cuando no encuentra nada)
            if (!espacio) {
                alert("La sala solicitada no existe");
                return;
            };
            const estado = estados.find(es => es.id == espacio.estado_operativo);
            if (!estado.permite_reserva || !estado) {
                alert("La sala solicitada no está disponible");
                return;
            }
            if(nuevo.value.motivo_reserva.length < 10){
                alert("El motivo es muy corto, alargalo para crear la reserva");
                return;
            }
            const res = await fetch("http://44.207.19.239:3000/reservas?zusuario=ethan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevo.value)
            });
            const lista = await res.json();

            if (!res.ok) {
                alert(lista.error || "Error al crear la reserva");
                return;
            }
            alert("Reserva creada correctamente");
            router.back();
        };
        return { vuelta, crear, nuevo, visualizar, espaciosOperativos };
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

select {
    margin: 5px 0 15px 0;
    padding: 8px 12px;
    border: 1px solid #aac4e0;
    border-radius: 8px;
    font-size: 15px;
    width: 100%;
}
</style>