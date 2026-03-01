<template>
    <div class="contenedor">
        <h1>Incidencia #{{ id }}</h1>

        <div class="incidencia" v-if="IncidenciaSeleccionada">
            <div class="campo">
                <span class="etiqueta">ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="valor">{{ IncidenciaSeleccionada.id }}</span>
            </div>
            <div class="campo">
                <span class="etiqueta">ID Espacio</span>
                <span class="valor">{{ IncidenciaSeleccionada.espacio_id }}</span>
            </div>
            <div class="campo">
                <span class="etiqueta">Descripción</span>
                <span class="valor">{{ IncidenciaSeleccionada.descripcion_problema }}</span>
            </div>
            <div class="campo">
                <span class="etiqueta">Fecha registro</span>
                <span class="valor">{{ IncidenciaSeleccionada.zfecha?.split("T")[0] }}</span>
            </div>

            <!-- Campos editables -->
            <div class="campo editable">
                <span class="etiqueta">Estado</span>
                <input v-model="IncidenciaSeleccionada.estado_incidencia_id" class="input-editable" />
            </div>
            <div class="campo editable">
                <span class="etiqueta">Técnico asignado</span>
                <input v-model="IncidenciaSeleccionada.responsable_resolucion_id" class="input-editable" />
            </div>
            <div class="campo editable">
                <span class="etiqueta">Comentarios</span>
                <textarea v-model="IncidenciaSeleccionada.comentarios_resolucion" class="input-editable" rows="3" />
            </div>
            <div class="campo editable">
                <span class="etiqueta">Fecha resolución</span>
                <input v-model="IncidenciaSeleccionada.fecha_resolucion" class="input-editable"
                    placeholder="####-##-##" />
            </div>
        </div>

        <div class="botones">
            <button class="btn-guardar" @click="guardar">Guardar cambios</button>
            <button class="btn-volver" @click="vuelta">Volver a las incidencias</button>
        </div>
        <router-view />
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
    setup() {
        const IncidenciaSeleccionada = ref(null);
        const router = useRouter();
        const route = useRoute();
        const id = route.query.id;
        const vuelta = () => router.back();

        const cargar = async () => {
            const res = await fetch("http://44.207.19.239:3000/incidencias?zusuario=ethan");
            const lista = await res.json();
            IncidenciaSeleccionada.value = lista.find(r => r.id == id);
        };

        const guardar = async () => {
            if (IncidenciaSeleccionada.value.estado_incidencia_id == 3 &&
            // Le metemos una ! aunque parezca contraproducente para que me cuente como true los valores nulos,undefined y "", si no hago
            //esto e intento comparar haciendo == "" o .trim() o no pasa por el if o me da error el trim
                !IncidenciaSeleccionada.value.comentarios_resolucion) {
                alert("No puedes resolver una incidencia sin poner un comentario primero");
                return;
            }
            const res = await fetch(`http://44.207.19.239:3000/incidencias/${id}?zusuario=ethan`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    estado_incidencia_id: IncidenciaSeleccionada.value.estado_incidencia_id,
                    responsable_resolucion_id: IncidenciaSeleccionada.value.responsable_resolucion_id,
                    comentarios_resolucion: IncidenciaSeleccionada.value.comentarios_resolucion,
                    fecha_resolucion: IncidenciaSeleccionada.value.fecha_resolucion,
                    zusuario: "ethan"
                })
            });

            if (res.ok) {
                alert("Incidencia actualizada correctamente");
                router.back();
            } else {
                const error = await res.json();
                alert(error.error || "Error al guardar");
            }
        };

        onMounted(cargar);
        return { id, vuelta, IncidenciaSeleccionada, guardar };
    }
};
</script>
<style scoped>
h1 {
    font-size: 1.2rem;
    color: #1a1a2e;
    margin-bottom: 20px;
    text-align: center;
}

.contenedor {
    max-width: 600px;
    margin: 30px auto;
    font-family: sans-serif;
    background-color: #eaf4ff;
    border-radius: 12px;
    padding: 20px;
}

.incidencia {
    background: transparent;
    border-radius: 12px;
    overflow: hidden;
}

.campo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    border-bottom: 1px solid #dce8f5;
    min-height: 45px;
}

.etiqueta {
    font-weight: bold;
    color: #2c5f8a;
    width: 45%;
    text-align: left;
}

.valor {
    color: #222;
    width: 55%;
    text-align: right;
}

.input-editable {
    width: 55%;
    padding: 6px 10px;
    border: 1px solid #aac4e0;
    border-radius: 6px;
    font-size: 0.95rem;
    background: white;
    text-align: right;
}

textarea.input-editable {
    resize: vertical;
}

.botones {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: center;
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
</style>