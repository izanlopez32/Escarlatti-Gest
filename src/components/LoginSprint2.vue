<!--Esta linea en teoria evita u-->
/* eslint-disable vue/multi-word-component-names */
<template>
  <div>
    <h1>Bienvenido a mi herramienta de ticketing y reserva de espacios!</h1>
    <!--Usaremos @submit.prevent para simular el uso de action en un formulario normal,
    el .prevent evitará que nuestro formulario recargue la página, navegue a otra URL o envie datos por defecto,
    por lo tanto al no recargarse le estaremos diciendo que directamente me ejecute la funcion loginUser-->
    <form @submit.prevent="loginUser">
      <!--Usaremos v-model para enlazar nuestro input con nuestra constante reactiva, es necesario que sea const? no realmente, puede ser tanto let como var, pero como
          no va a cambiar tras darle el valor prefiero dejarselo así-->
      <input v-model="login" placeholder="Nombre" /><br><br>
      <input v-model="password" type="password" placeholder="Contraseña" /><br><br>
      <button>Acceder</button>
    </form>
    <!--Si hay algun error que nos lo muestre em rojito, si se queda en vacio no se activará el if-->
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script>

import { ref } from "vue";

export default {
  //declaramos nuestro evento personalizado el cual hemos usado ya en App.vue con emits, dentro le daremos un nombre
  emits: ["login-ok"],
  //declaramos en setup props por un lado, que sirve para recoger las propiedades que el componente recibe del padre(se que no lo uso, pero si no lo pongo me da error) y
  //{emit} lo usaremos para extraer los eventos que queramos emitir al padre.
  setup(props, { emit }) {
    //Declaramos nuestras variables reactivas, tanto las dos del login como la de los errores
    const login = ref("");
    const password = ref("");
    var fallos = ref(0);
    const error = ref("");
    //Declaramos la funcion que usaremos tras usar el submit de nuestro login, usaremos async dado a que usaremos asincronia dentro de nuestra funcion
    const loginUser = async () => {
      //Empezaremos borrando siempre nuestra variable de error antes de la comprobacion del login
      error.value = "";

      //Esto lo haremos por un lado con fetch, que es una funcion asincriona que nos devuelve siempre una promesa la cual 
      //"extraeremos", poniendo await lo que haremos será esperar a que el codigo termine de realizar su funcion
      //antes de seguir a la siguiente linea y, en el caso de fetch, nos devuelve la respuesta en bruto en vez de devolver una promesa a secas.
      //Usaremos en lista nuestro res con .json para que lea el cuerpo de la respuesta, lo interprete como JSON y devuelva otra promesa, cosa que
      //se "anula" al poner await, por lo que recibiremos el resultado directamente.
      const res = await fetch("http://44.207.19.239:3000/auth/login?zusuario=ethan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: login.value,
          password: password.value,
          zusuario: "ethan"
        })
      });
      const lista = await res.json();
      const resUsuarios = await fetch("http://44.207.19.239:3000/usuarios?zusuario=ethan");
      const usuarios = await resUsuarios.json();
      const usuario = usuarios.find(u => u.login == login.value);
      //Comprobaremos la existencia del usuario primero que ninguna otra cosa para, despues de ello
      //comprobar si su estado concreto es el de baja para atrapar dicho error, si no lo está sigue el programa
      if (usuario)
        if (usuario.estado_id == "BAJ_izan") {
          error.value = "Usuario dado de baja";
          return;
        }
      //Si ha habido algun error se nombra por pantalla
      if (!res.ok) {
        error.value = lista.error;
        //Comprobamos si el user existe, si lo hace no reiniciaremos errores, si no existe si lo haremos.
        //Esta decision en concreto puede ser polemica y va a gustos del programador, yo prefiero que el user tenga mas
        //posibilidades de poner la contraseña cuando se haya equivocado de nombre.
        if (usuario) {
          fallos.value++;

          //una vez llegadas los 3 o mas errores procederemos al put para actualizar el estado del user a bloqueado
          if (fallos.value == 3 && usuario.estado_id != "BLOQ_izan") {
            await fetch(`http://44.207.19.239:3000/usuarios/${usuario.login}?zusuario=ethan`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                login: usuario.login,
                password_hash: usuario.password_hash,
                rol_id: usuario.rol_id,
                ref_identidad_fk: usuario.ref_identidad_fk,
                estado_id: "BLOQ_izan",
                ultimo_acceso: usuario.ultimo_acceso,
                zfecha: usuario.zfecha,
                zusuario: usuario.zusuario
              })
            });
            //lo notificaremos y volveremos a poner los fallos a 0
            error.value = "Usuario bloqueado por demasiados intentos fallidos";
            fallos.value = 0;
          }
        } else {
          //si el user no existe reiniciamos los fallos
          fallos.value = 0;
        }
        return;
      }

      //Emitimos el usuario al padre si hemos logrado llegar al final de la funcion
      emit("login-ok", lista);
    };
    //Le pasamos los datos al template del componente
    return { login, password, error, loginUser };
  }
};
</script>
<!--Usamos scoped para que se aplique a solo este componente, he intentado usarlo de forma general pero por alguna razon queda FATAL, asi que prefiero repetirme para conseguir
    un css "decente"(se que es muy simplón, solo no queria que se quedara feo)-->
<style scoped>
h1 {
  margin-bottom: 15px;
  color: #1a1a2e;
  font-size: 24px;
}

table {
  border-collapse: collapse;
  margin-top: 20px;
}

td,
td>input {
  background-color: lightskyblue;
  padding: 0 5px 0 5px;
}

th {
  background-color: #7a4f9a;
}

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
</style>