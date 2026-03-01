<template>
  <div>
    <p>
     <b>¿Que tabla deseas modificar?</b><br><br>
     <button @click="roles">Editar tabla Roles</button>
     <button @click="estados_usuario">Editar tabla Estados_usuario</button>
     <button @click="etapas">Editar tabla Etapas</button>
     <button @click="turnos">Editar tabla Turnos</button>
     <button @click="departamentos">Editar tabla Departamentos</button>
     <button @click="espacios">Editar tabla Espacios</button>
     <button @click="horarios">Editar tabla Horarios</button>
     <button @click="estados_incidencias">Editar tabla estados_incidencia</button>
     <button @click="crear_profesor">Editar tabla Profesor</button>
     <button @click="cursos">Editar tabla Cursos</button>
     <button @click="crear_alumno">Editar tabla Alumnos</button>
     <button @click="usuarios">Editar tabla Usuarios</button>
     <button @click="reservas">Editar tabla Reservas</button>
     <button @click="vuelta" class="vuelta">Volver a mi panel correspondiente</button>
    </p>
</div>
<router-view/>
</template>

<script>
import { useRouter } from "vue-router";
export default { 
    setup() { 
    const router = useRouter();
    const vuelta = () => router.back();
    const roles = () => router.push("/RolesSprint2");
    const estados_usuario = () => router.push("/Estados_UsuarioSprint2");
    const etapas = () => router.push("/EtapasSprint2");
    const turnos = () => router.push("/TurnosSprint2");
    const departamentos = () => router.push("/DepartamentosSprint2");
    const espacios = () => router.push("/EspaciosSprint2");
    const horarios = () => router.push("/HorariosSprint2");
    const estados_incidencias = () => router.push("/EstadosIncidenciasSprint2");
    const crear_profesor = () => router.push("/CrearProfesorSprint2");
    const cursos = () => router.push("/CursosSprint2");
    const crear_alumno = () => router.push("/CrearAlumnoSprint2");
    const usuarios = () => router.push("/UsuarioSprint2");
    const reservas = () => router.push("/CrearReservaSalas");



    return { vuelta,roles,estados_usuario,etapas,turnos,departamentos,espacios,horarios,estados_incidencias,crear_profesor,cursos,crear_alumno,usuarios,reservas }; 
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.vuelta{
    background-color: white;
    color: #9b6dbd;
}
.vuelta:hover{
    background-color: rgb(231, 200, 240);
}
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
    width: 75%;
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