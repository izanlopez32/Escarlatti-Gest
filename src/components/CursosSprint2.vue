/* eslint-disable */
<template>
    <div>
        <h1>Componente para Cursos</h1>

        <!-- CREAR -->
        <h3>Crear un Curso</h3>
        <!--Enlazamos cada input con una constante en nuestro setup, en este caso a un array dentro de ref(asi no pongo 500 const)-->
        <input v-model="nuevo.id" placeholder="id" />
        <input v-model="nuevo.nombre_curso" placeholder="nombre_curso" />
        <input v-model="nuevo.etapa_id" placeholder="etapa_id" />
        <input v-model="nuevo.grupo" placeholder="grupo" />
        <input v-model="nuevo.turno_id" placeholder="turno_id" />
        <input v-model="nuevo.anio_academico" placeholder="anio_academico" />
        <input v-model="nuevo.tutor_id" placeholder="tutor_dni" />
        <input v-model="nuevo.aula_id" placeholder="aula_id" />
        <!--Al clickar llamaremos al metodo crear para procesar nuestros datos-->
        <button @click="crear">Crear</button>
        <button @click="vuelta">Volver</button>


        <!-- LISTADO -->
        <!--Hacemos una tabla simple donde le meteremos lineas que obtendremos de nuestra api-->
        <table border="1">
            <tr>
                <th>id</th>
                <th>nombre_curso</th>
                <th>etapa</th>
                <th>grupo</th>
                <th>turno</th>
                <th>año académico</th>
                <th>tutor</th>
                <th>aula</th>
                <th>acciones</th>
            </tr>
            <!--Usaremos v-for para pasar por todos los valores de nuestra api, donde 
                antes de cada iteracion declararemos todos los valores del valor que 
                tocaba en dicha iteracion -->
            <tr v-for="c in cursos" :key="c.id">
                <td>{{ c.id }}</td>
                <!--ponemos input en todos menos el id porque me interesa que se puedan actualizar todos menos ese-->
                <td><input v-model="c.nombre_curso" /></td>
                <td><input v-model="c.etapa_id" /></td>
                <td><input v-model="c.grupo" /></td>
                <td><input v-model="c.turno_id" /></td>
                <td><input v-model="c.anio_academico" /></td>
                <td><input v-model="c.tutor_id" /></td>
                <td><input v-model="c.aula_id" /></td>

                <td>
                    <!--Declaramos x metodo al clickar un boton y le pasamos el usuario entero(en este caso el que está en la iteracion)-->
                    <button @click="actualizar(c)">Actualizar</button>
                    <button @click="visualizar(c.id)">Ver alumnos</button>
                    <button @click="borrar(c)">Borrar</button>
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
        const cursos = ref([]);
        const nuevo = ref({
            id: "",
            nombre_curso: "",
            etapa_id: "",
            grupo: "",
            turno_id: "",
            anio_academico: "",
            tutor_id: "",
            aula_id: "",
            zfecha: new Date().toISOString(),
            zusuario: "ethan"
        });
        //Creamos nuestro metodo para cargar/recargar los datos cada vez que lo llamemos(esto para cuando hagamos un update/eliminacion/creacion)
        const cargar = async () => {
            const res = await fetch("http://44.207.19.239:3000/cursos?zusuario=ethan");
            cursos.value = await res.json();
        };
        //Similar a mounted(), sirve para ejecutar el metodo deseado cuando el componente TERMINE DE CARGAR
        onMounted(cargar);

        //Funcion para cuando queramos crear un curso
        const crear = async () => {
            const resCursos = await fetch("http://44.207.19.239:3000/cursos?zusuario=ethan");
            const cursos = await resCursos.json();
            const comprobante = cursos.some(cur => cur.tutor_id == nuevo.value.tutor_id);
            if (comprobante) {
                alert("El profesor asignado como tutor ya es tutor en otro curso! D:");
                return;
            }
            //Poniendo datos tras la , del fetch lo que hacemos es pasarle datos al servidor
            await fetch("http://44.207.19.239:3000/cursos?zusuario=ethan", {
                //Indicamos el metodo deseado
                method: "POST",
                //Indicamos el formato en el que mandaremos los datos
                headers: { "Content-Type": "application/json" },
                //Con esto pasamos los datos a json ya que le acabamos de decir en el headers que recibirá los datos en dicho formato
                body: JSON.stringify(nuevo.value)
            });

            //Tras mandarle los datos al servidor recargamos con cargar() para que se muestre en pantalla
            await cargar();
        };
        const visualizar = async (c) => {
            router.push({
                name: "VerAlumnosCursoSprint2",
                query: { id: c }
            });
        }
        //le pedimos el usuario con c debido a que, para actualizar el valor, necesitamos el id
        const actualizar = async (c) => {
            const resCursos = await fetch("http://44.207.19.239:3000/cursos?zusuario=ethan");
            const cursos = await resCursos.json();
            const comprobante = cursos.some(cur => cur.tutor_id == c.tutor_id);
            if (comprobante) {
                alert("El profesor asignado como tutor ya es tutor en otro curso! D:");
                return;
            }
            await fetch(`http://44.207.19.239:3000/cursos/${c.id}?zusuario=ethan`, {
                //Le indicamos que el metodo será put y volvemos a indicar el tipo de formato que va a recibir nuestra api junto con 
                //dicho contenido pasado al formato deseado
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(c)
            });
            //Volvemos a cargar cargar() para que se actualice
            await cargar();
        };
        //Lo mismo que actualizar pero no indicamos el formato del contenido que le vamos a pasar ya que...no le vamos a pasar nada
        // y le indicaremos que el metodo que queremos es delete.
        const borrar = async (c) => {
            const resUsuarios = await fetch("http://44.207.19.239:3000/alumnos?zusuario=ethan");
            const usuarios = await resUsuarios.json();
            const comprobante = usuarios.some(alum => alum.curso_id == c.id);
            if (comprobante) {
                alert("El curso aun cuenta con alumnos, no puedes borrarlo");
                return;
            }

            await fetch(`http://44.207.19.239:3000/cursos/${c.id}?zusuario=ethan`, {
                method: "DELETE"
            });
            await cargar();
        };
        //Retornamos todos los datos al template
        return { cursos, nuevo, crear, actualizar, borrar, vuelta, visualizar };
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
