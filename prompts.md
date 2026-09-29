# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Quiero determinar el alcance del proyecto FlowSync. Con base a ello, realiza un analisis del proyecto y devuelve las capacidades que ya están construidas y cual es el modelo de datos actual.

No debes implementar nada, solo requiero un resumen de máximo 5 lineas sobre lo solicitado. No requiero propuestas ni recomendaciones.


```

**Qué salió:** Funcionó, me devolvió lo que ya está implementado en el proyecto.

FlowSync solo tiene implementado el módulo de autenticación/cuenta: signup, login/logout y perfil (4 endpoints bajo /api/v1), sin ningún módulo de tareas/equipos todavía. El modelo de datos actual consta de una única entidad de negocio, users (con withAuthFinder para credenciales), más la tabla técnica auth_access_tokens para los tokens de acceso — no existen otras migraciones ni relaciones. El frontend refleja exactamente ese alcance: páginas de login, registro y perfil, protegidas/públicas vía guards de react-router, sin ninguna pantalla de gestión de tareas. En resumen, el proyecto está en el estado de "andamiaje de auth" (signup → login → perfil protegido) y aún no ha arrancado la funcionalidad central de gestión de tareas en equipo que da nombre a FlowSync.


## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```

Considerando que la idea central del MVP es:

"Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué esta trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira."

Realiza 5 preguntas que más reducirán la incertidumbre sobre el problema, los usuarios y el alcance. Realiza estás 5 preguntas en una misma ronda. De igual forma, no bajes a temas tecnicos como el modelo de datos o los endpoints.

También, considera la siguiente ficha de hechos:

- Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar.
- Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.
- Qué reunión desaparece (respuesta honesta, no la vendas de más): la daily NO desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de los 15 minutos. La parte de bloqueos sigue, y este MVP no la resuelve.
- Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real.
- Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
- "Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.
- Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.
- Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
- Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.
- De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de terceros.
- Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.
- Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.
- Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario.
- "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.
- Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.
- Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
- Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo.
- Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó.
- Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una capability terminada a tres a medias.

Si tienes alguna duda que la ficha de hechos no cubra, decide por ti misma pero marcalo como supuesto para su posterior analisis.

De igual forma, considera lo que esta fuera del MVP.

- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.

```

**Qué salió:** Realizó las 5 preguntas. Primero fueron 3 y luego 2 (en el orden de abajo).

Granularidad: ¿Qué tan grande es una "tarea" típica en este equipo? Esto define si el tablero realmente puede prevenir choques o solo los detecta tarde.

R: Una tarea podría ser de horas o incluso días, depende del contexto y complejidad.

Asignación: ¿Quién puede crear una tarea y ponerle responsable: solo uno mismo, o cualquiera puede crear/asignar tareas a otros?

R: Se puede crear una tarjeta para uno mismo pero igual se puede crear y asignarse a otro compañero.

Hábito consulta: El episodio de las dos personas tocando el mismo módulo se descubrió días después. ¿Qué hábito esperamos que la gente adopte para consultarlo antes de empezar algo, y así sí evitarlo a tiempo?

R: Que los usuarios como parte del flujo de trabajo se acostumbren a ver las tarjetas en ejecución y las tarjetas pendientes, identificando cuales si pueden trabajar y cuales ya no.

Tareas hechas: ¿Qué pasa con una tarea cuando se marca como terminada: desaparece de la vista principal, o se queda visible como historial reciente?

R: Se debe mantener como historial por 3 días y luego se oculta.

Multitarea: ¿Se espera que una persona tenga una sola tarea "en curso" a la vez, o es normal que tenga varias en paralelo?

R: Se pueden tener varias tareas en paralelo.

1. Granularidad: variable (horas a días, según contexto) — no hay convención fija de tamaño.
2. Asignación: cualquiera puede crear una tarjeta para sí mismo o para asignársela a otro compañero.
3. Hábito de consulta: se asume que revisar tarjetas en ejecución/pendientes antes de tomar trabajo es parte natural del flujo, no un paso adicional forzado.
4. Tareas terminadas: se mantienen visibles como historial 3 días y luego se ocultan automáticamente.
5. Multitarea: varias tareas en paralelo por persona son normales y esperadas.

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
En base a la información actual (otorgada y recabada) genera un alcance para el MVP divido en 5 bloques: problema, usuarios, propuesta de valor, alcance y no-alcance.

Justifica tus decisiones de exclusión.

```

**Qué salió:** Me devolvio el alcance solicitado en los 5 bloques.

MVP FlowSync — Alcance

1. Problema
La ronda de "¿en qué estás?" de la daily consume la mitad de los 15 minutos disponibles, y entre daily y daily no hay ninguna visibilidad: la gente se entera tarde de qué está tocando cada quien. Episodio concreto: dos personas trabajaron el mismo módulo la misma semana sin saberlo — dos días perdidos. El dolor lo cobran los pares (el que interrumpe para preguntar, el que descubre tarde el choque), no un manager ni un reporte hacia arriba.

2. Usuarios
Equipos remotos pequeños (3–10 personas), roles planos sin jerarquía de permisos, a menudo distribuidos en varios husos horarios. Caso de estudio (no cliente real): equipo de producto SaaS de 6 personas en 3 husos horarios, hoy con un gestor de tareas pesado y una daily de 15 min por videollamada.

3. Propuesta de valor
Un tablero único donde el estado de cada tarea —no de la persona— se actualiza en dos clics y se ve en tiempo real sin refrescar ni preguntar. Elimina la ronda de "¿en qué estás?" de la daily (la parte de bloqueos se mantiene, eso no lo resuelve este MVP) y deja que cualquiera decida qué tomar sabiendo qué ya está en marcha.

4. Alcance
- Espacio único compartido para todo el equipo, sin entidad "equipo" ni multi-equipo.
- Tarea = título, responsable, estado, fecha de vencimiento.
- Cualquiera crea una tarjeta para sí mismo o para asignarla a otro compañero.
- Varias tareas en curso por persona en paralelo.
- Cambios de estado visibles en tiempo real (sin refrescar).
- Consumo de la lista por filtro de estado.
- Tareas terminadas: visibles como historial 3 días, luego se ocultan automáticamente.
- Autenticación básica (signup/login) para saber quién edita cada tarjeta.

5. No-alcance (y por qué)
- Notificaciones push — el diseño pide "resumen que espera, no aviso que interrumpe"; construirlas traicionaría la premisa central de no interrumpir.
- Integración con Slack / derivar estado de Git-PR-CI-calendario — el estado se teclea a mano en segundos; automatizarlo exige OAuth e integraciones de terceros que son, literalmente, otro producto.
- Roles/permisos avanzados — el equipo objetivo tiene roles planos; construir jerarquía de permisos añade la fricción de configuración que el MVP busca evitar ("menos rollo que Jira").
- Analítica/reporting — nadie reporta hacia arriba en este flujo (lo confirma la ficha: "a un manager le daría igual"); no hay quién consuma esos datos, así que construirlos es desperdicio.
- Comentarios en tareas — abriría la puerta a discusión/colaboración simultánea, y "tiempo real" se definió explícitamente como no chat, no colaboración simultánea.
- Sprints, estimaciones, épicas, backlog priorizado — el dolor identificado es de visibilidad, no de planificación; un equipo que necesite esto no es el usuario que este MVP sirve.
- Indicadores de presencia ("quién está conectado") — el estado es de la tarea, no de la persona; esto es vigilancia y se rechaza a propósito, no por omisión.
- Múltiples equipos / gente en más de un equipo — el MVP asume un único espacio compartido; se anota como supuesto a validar después, no se construye ahora.

## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Dado tu alcance propuesto quiero realizar los siguientes cambios:

Elimine:
- Cualquiera crea una tarjeta para sí mismo o para asignarla a otro compañero.
- Consumo de la lista por filtro de estado.
- Tareas terminadas: visibles como historial 3 días, luego se ocultan automáticamente.
- Varias tareas en curso por persona en paralelo.

Mi nuevo alcance es:

4. Alcance
- Espacio único compartido para todo el equipo.
- Una tarea contiene: título, responsable, estado, fecha de vencimiento.
- Estados de una tarea: pendiente, en curso, terminada.
- Cambios de estado visibles en tiempo real (sin refrescar).
- Autenticación básica (signup/login) para saber quién edita cada tarjeta.

Mi objetivo es que el MVP cumpla solo con lo necesario para satisfacer las necesidades de los equipos que es conocer sobre que está trabajando cada integrante. Verifica si mis decisiones aún permiten cumpir con el objetivo o si se requiere alguno de los alcances eliminados justifica porque es necesario.

```

**Qué salió:** Me confirmó que realmente no habia una afectación por mis cambios pero me sugirió que se indicará que cada quien creará y editará sus propias tarjetas. Me parece asertado en base a la primicia de que la importancia de la pizarra recae en evitar conflictos o duplicidad de trabajo entre compañeros, entonces la responsabilidad es de cada integrante.

Nota: Igual identifique que algunos de los alcances excedidos fueron a raíz de mis respuestas (Error mío).