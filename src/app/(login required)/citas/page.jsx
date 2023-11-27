'use client'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import esLocale from "@fullcalendar/core/locales/es"; // Importa el idioma español

import Link from "next/link";

export default function Citas() {
  return (
    <>
      <h1 className="flex items-center justify-center text-3xl font-bold mt-10 mb-10">
        Calendario de citas
      </h1>
      <div className="mt-auto text-center">
        <Link href="citas/crearCita/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
            Crear Cita
          </button>
        </Link>
      </div>
      <FullCalendar
        timeZone="local"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrap5Plugin,
          ]}
          initialView="timeGridWeek"
          headerToolbar={{
            start: "today prev,next", // will normally be on the left. if RTL, will be on the right
            center: "title",
            end: "dayGridMonth, timeGridWeek, timeGridDay", // will normally be on the right. if RTL, will be on the left
          }}
          locales={[esLocale]} // Configura los idiomas disponibles
          locale="es" // Establece el idioma a español
        
        
      />
    </>
  );
}
