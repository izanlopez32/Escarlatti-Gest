import { createRouter, createWebHistory } from "vue-router";

import CreadorIncidencias from "../components/CreadorIncidencias.vue";
import CrearReservaSalas from "../components/CrearReservaSalas.vue";
import ReservaSalas from "../components/ReservaSalas.vue";
import VisualizarReservas from "../components/VisualizarReservas.vue";
import ResolucionIncidencias from "../components/ResolucionIncidencias.vue";
import RealizarMantenimiento from "../components/RealizarMantenimiento.vue";
import ActualizarResolucionIncidencias from "../components/ActualizarResolucionIncidencias.vue";
import RolesSprint2 from "../components/RolesSprint2.vue";
import Estados_UsuarioSprint2 from "../components/Estados_UsuarioSprint2.vue";
import EtapasSprint2 from "../components/EtapasSprint2.vue";
import TurnosSprint2 from "../components/TurnosSprint2.vue";
import DepartamentosSprint2 from "../components/DepartamentosSprint2.vue";
import EspaciosSprint2 from "../components/EspaciosSprint2.vue";
import HorariosSprint2 from "../components/HorariosSprint2.vue";
import EstadosIncidenciasSprint2 from "../components/EstadosIncidenciasSprint2.vue";
import CrearProfesorSprint2 from "../components/CrearProfesorSprint2.vue";
import CursosSprint2 from "../components/CursosSprint2.vue";
import CrearAlumnoSprint2 from "../components/CrearAlumnoSprint2.vue";
import UsuarioSprint2 from "../components/UsuarioSprint2.vue";
import VerAlumnosCursoSprint2 from "../components/VerAlumnosCursoSprint2.vue";
const routes = [
  {
    path: "/CreadorIncidencias",
    name: "CreadorIncidencias",
    component: CreadorIncidencias
  },
  {
    path: "/VerAlumnosCursoSprint2",
    name: "VerAlumnosCursoSprint2",
    component: VerAlumnosCursoSprint2
  },
  {
    path: "/CrearReservaSalas",
    name: "CrearReservaSalas",
    component: CrearReservaSalas
  },
  {
    path: "/VisualizarReservas",
    name: "VisualizarReservas",
    component: VisualizarReservas
  },
  {
    path: "/ReservaSalas",
    name: "ReservaSalas",
    component: ReservaSalas
  }
  ,
  {
    path: "/ResolucionIncidencias",
    name: "ResolucionIncidencias",
    component: ResolucionIncidencias
  },
  {
    path: "/RealizarMantenimiento",
    name: "RealizarMantenimiento",
    component: RealizarMantenimiento
  },
  {
    path: "/ActualizarResolucionIncidencias",
    name: "ActualizarResolucionIncidencias",
    component: ActualizarResolucionIncidencias
  },
  {
    path: "/RolesSprint2",
    name: "RolesSprint2",
    component: RolesSprint2
  },
  {
    path: "/Estados_UsuarioSprint2",
    name: "Estados_UsuarioSprint2",
    component: Estados_UsuarioSprint2
  },
  {
    path: "/EtapasSprint2",
    name: "EtapasSprint2",
    component: EtapasSprint2
  },
  {
    path: "/TurnosSprint2",
    name: "TurnosSprint2",
    component: TurnosSprint2
  },
  {
path: "/DepartamentosSprint2",
name: "DepartamentosSprint2",
component:DepartamentosSprint2
  },
  {
path:"/EspaciosSprint2",
name:"EspaciosSprint2",
component:EspaciosSprint2
  },

  {
path:"/CrearProfesorSprint2",
name:"CrearProfesorSprint2",
component:CrearProfesorSprint2
  },  {
path:"/CursosSprint2",
name:"CursosSprint2",
component:CursosSprint2
  },  {
path:"/CrearAlumnoSprint2",
name:"CrearAlumnoSprint2",
component:CrearAlumnoSprint2
  },
    {
path:"/UsuarioSprint2",
name:"UsuarioSprint2",
component:UsuarioSprint2
  },
    {
path:"/HorariosSprint2",
name:"HorariosSprint2",
component:HorariosSprint2
  },
    {
path:"/CrearReservaSalas",
name:"CrearReservaSalas",
component:CrearReservaSalas
  },
    {
path:"/EstadosIncidenciasSprint2",
name:"EstadosIncidenciasSprint2",
component:EstadosIncidenciasSprint2
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
