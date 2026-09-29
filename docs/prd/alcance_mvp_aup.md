## Parte A

MVP FlowSync — Alcance

1. Problema
La ronda de "¿en qué estás?" de la daily consume la mitad de los 15 minutos disponibles, y entre daily y daily no hay ninguna visibilidad: la gente se entera tarde de qué está tocando cada quien. Episodio concreto: dos personas trabajaron el mismo módulo la misma semana sin saberlo — dos días perdidos. El dolor lo cobran los pares (el que interrumpe para preguntar, el que descubre tarde el choque), no un manager ni un reporte hacia arriba.

2. Usuarios
Equipos remotos pequeños (3–10 personas), roles planos sin jerarquía de permisos, a menudo distribuidos en varios husos horarios. Caso de estudio (no cliente real): equipo de producto SaaS de 6 personas en 3 husos horarios, hoy con un gestor de tareas pesado y una daily de 15 min por videollamada.

3. Propuesta de valor
Un tablero único donde el estado de cada tarea —no de la persona— se actualiza en dos clics y se ve en tiempo real sin refrescar ni preguntar. Elimina la ronda de "¿en qué estás?" de la daily (la parte de bloqueos se mantiene, eso no lo resuelve este MVP) y deja que cualquiera decida qué tomar sabiendo qué ya está en marcha.

4. Alcance
- Espacio único compartido para todo el equipo.
- Una tarea contiene: título, responsable, estado, fecha de vencimiento.
- Estados de una tarea: pendiente, en curso, terminada.
- Cada persona crea y actualiza únicamente sus propias tarjetas (autoasignación).
- Cambios de estado visibles en tiempo real (sin refrescar).
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

## Parte B

*Los 2 números*

Alcances de la IA (8)
Alcances finales (6)

Nota: Adicionalmente, identifique que no se consideraban los estatus de las tarjetas pero si se considera la parte mover la tarjeta entonces se tuvo que incluir ese alcance para ya definir ese punto y no dejar al agente que inventará durante la ejecución los estados posibles.


*Tres cosas fuera*

-Filtro por estado: No necesario si solo existen 3 estados que se pueden visualizar facilmente en pantalla.
-Historial y tiempo de visibilidad: Que las historias se acumulen en la columna "Terminado" no afecta actualmente al objetivo y agregar tiempo de visibilidad sería anexar complejidad que de momento no es necesaria.
-Varias tareas en curso: Realmente no hay una limitante para este punto entonces como no existe alguna regla de "solo una tarea por usuario" el sistema permite la creación de varias tareas en paralelo. Fue una redundancia en base mis respuestas a las preguntas.

*Exclusión con dudas*

-Historial y tiempo de visibilidad: Se excluyó porque excedía el objetivo pero como se mencionó un problema sería la acumulación de tarjetas. Podria quedar para un siguiente sprint o iteración.