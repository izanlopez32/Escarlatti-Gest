/* eslint-disable vue/multi-word-component-names */

<!--¡¡¡¡¡¡¡¡¡¡AVISO A NAVEGANTES!!!!!!!!!!!!
Solo se han comentado App.vue,LoginSprint2.vue,AdminSprint2.vue y CursosSprint2.vue (entre otros, en el ultimo sprint se han hecho muchos componentes secundarios), 
esto debido a que el codigo es muuuy repetitivo y quiero cumplir con la entrega-->
<template>
  <div>
    <!-- Si no hay usuario logueado, mostramos login
        !usuario lo usamos para comprobar si la variable usuario en negativo(false/null) es true, en
        ese caso mostrará el Login.
        @login-ok sirve para escuchar un evento emitido en LoginSprint2 con el mismo nombre -->
    <LoginSprint2 v-if="!usuario" @login-ok="setUsuario" />

    <!-- Si hay usuario, mostramos la pantalla según su rol -->
    <div v-else>
          <!-- Hacemos un if para cada rol que nos interese mostrar -->

      <AdminSprint2 v-if="usuario.rol === 'Administrador'" />
      <ProfesorSprint2 v-if="usuario.rol === 'Profesor'" />
      <AlumnoSprint2 v-if="usuario.rol === 'Alumno'" />
      <TicSprint2 v-if="usuario.rol === 'TIC'" />
    </div>
  </div>
</template>

<script>
//Importamos todos los componentes necesarios

import { ref } from "vue";
import LoginSprint2 from "./components/LoginSprint2.vue";
import AdminSprint2 from "./components/AdminSprint2.vue";
import ProfesorSprint2 from "./components/ProfesorSprint2.vue";
import AlumnoSprint2 from "./components/AlumnoSprint2.vue";
import TicSprint2 from "./components/TicSprint2.vue";

export default {
  //Nombramos los componentes que podemos usar en App.vue
  components: { LoginSprint2, AdminSprint2, ProfesorSprint2, AlumnoSprint2, TicSprint2 },
//Declaramos en el setup tanto usuario como un metodo para setearlo
  setup() {
    //Usamos ref para que la veriable creada sea reactiva, lo usaremos para actualizar la variable
    //automaticamente cuando la toquemos
    const usuario = ref(null);
    //Declaramos así la funcion y no con function para evitar el uso de this. y para
    //hacer nuestro codigo mas compacto y legible, aunque podriamos usarlo perfectamente
    const setUsuario = (u) => {
      usuario.value = u;
    };
    //Usamos return para notificar a vue todo lo que queremos usar en el template o en otros scripts(osea como una exportacion)
    return { usuario, setUsuario };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

div{
    display: flex;
    flex-direction: column;
    align-items: center;
}
body{
background-color: #e8d5f0;}
*{
    margin: 0;
    padding: 0;
}
h1{
    margin-bottom: 15px;
}

</style>

