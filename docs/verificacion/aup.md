## Parte A

# Trazabilidad: «Lo que cada tarea muestra de su responsable»

- **Spec viva:** `openspec/specs/tasks/spec.md`
- **Requerimiento:** Lo que cada tarea muestra de su responsable
- **Tests revisados:** `backend/tests/functional/auth/` (`signup`, `login`, `session`, `initials`). No existe `tests/unit/` y no hay ningún test de la capability `tasks`. El frontend no tiene runner de tests.

## Resumen (original)

| Métrica | Valor |
|---|---|
| Escenarios del requerimiento | 3 |
| Escenarios cubiertos por las pruebas | 0 |
| Escenarios no cubiertos | 3 |
| Cobertura | 0 % |

## Tabla de trazabilidad (original)

| # | Escenario | Qué espera | En qué situación | Test que lo cubre (archivo) | Estado | Observaciones |
|---|---|---|---|---|---|---|
| 1 | Responsable identificable | El `assignee` trae el nombre "Ada Lovelace" y sus iniciales, suficientes para saber quién lleva la tarea | Se obtiene una tarea cuyo responsable se llama "Ada Lovelace" | — | NO CUBIERTO | Ningún test consulta una tarea ni la lista. `auth/initials.spec.ts` comprueba las iniciales de la cuenta (`data.user.initials` en el login), no el `assignee` de una tarea, así que no cuenta como cobertura. |
| 2 | La tarea no filtra datos de cuenta | El `assignee` no incluye el email ni otro dato de acceso | Se obtiene cualquier tarea, suelta o dentro de la lista | — | NO CUBIERTO | Escenario de seguridad sin ninguna comprobación. Habría que cubrir tanto la consulta de una tarea suelta como la lista. |
| 3 | Responsable sin nombre | El nombre llega nulo y las iniciales siguen llegando, sin recurrir al email | El responsable es una cuenta registrada sin nombre | — | NO CUBIERTO | `auth/initials.spec.ts` ("sin nombre, las iniciales salen del email") cubre algo parecido en la cuenta, pero no en el `assignee` de una tarea. |

## Resumen

Tests añadidos en `backend/tests/functional/tasks/assignee.spec.ts` y ejecutados con `node ace test functional --files=assignee`: 5 tests, 4 pasan y 1 falla.

| Métrica | Valor |
|---|---|
| Escenarios del requerimiento | 3 |
| Escenarios cubiertos por las pruebas y que pasan | 2 |
| Escenarios con prueba, pero que fallan (cubiertos, incumplidos) | 1 |
| Escenarios no cubiertos | 0 |

**Hallazgo:** el test de la lista falla porque `TaskTransformer` serializa el `assignee` con `UserTransformer`, que incluye `email`, `createdAt` y `updatedAt`. Es un incumplimiento real del escenario 2, no un defecto del test. Solo `TaskDetailTransformer`, que usa `TaskAssigneeTransformer`, cumple. No se ha tocado el código.

## Tabla de trazabilidad

| # | Escenario | Qué espera | En qué situación | Test que lo cubre (archivo `backend/tests/functional/tasks/assignee.spec.ts`) | Estado | Resultado | Observaciones |
|---|---|---|---|---|---|---|---|
| 1 | Responsable identificable | El `assignee` trae el nombre "Ada Lovelace" y sus iniciales | Se obtiene una tarea cuyo responsable se llama "Ada Lovelace" | `el assignee trae el nombre y las iniciales de quien la lleva` | CUBIERTO | Pasa | Se comprueba sobre la tarea suelta (`GET /tasks/:id`). |
| 2 | La tarea no filtra datos de cuenta | El `assignee` no incluye el email ni otro dato de acceso | Se obtiene cualquier tarea, suelta o dentro de la lista | `una tarea suelta no expone el email ni otros datos de la cuenta` y `la lista no expone el email ni otros datos de la cuenta del responsable` | CUBIERTO | **Falla en la lista** | La tarea suelta cumple. La lista (`GET /tasks`) devuelve `email`, `createdAt` y `updatedAt` del responsable. El test queda rojo hasta corregir `TaskTransformer`. |
| 3 | Responsable sin nombre | El nombre llega nulo y las iniciales siguen llegando | El responsable es una cuenta registrada sin nombre | `sin nombre, el nombre llega nulo y las iniciales siguen llegando` y `sin nombre, la lista también trae nombre nulo e iniciales` | CUBIERTO | Pasa | Se comprueba en tarea suelta y en lista. Las iniciales salen del email. |



## Parte B

1. Pues sin mirar nada del proyecto, se podría pensar que todos deberían estar cubiertos. La realidad es que desde que se ejecutó npm test y observando la ubicación de archivos de prueba sin una carpeta referente a 'tasks' ya se pensó que no había ninguno. R -> Que se creían cubiertos: 3, Cubiertos realmente: 0.

2.  En este caso particular, a los 3 escenarios les faltaban tests. Eso se derterminó facilmente checando la ubicación de los archivos de prueba y corriendo las pruebas actuales que solo hacían referencia a 'auth'. FAVOR DE INDICAR SI MI RESPUESTA SE BASO EN EL OBJETIVO DE LA PREGUNTA, PUEDE QUE NO LA CAPTE CORRECTAMENTE.
3.  En el escenario 2, las pruebas generadas consideraban validar los campos que no debían llegar (cada uno explicitamente) pero como el requerimiento indicaba que solo era necesario el nombre y las iniciales, se realizó un ajuste para determinar cuales eran los unicos campos que se debían validar, de esta forma aunque luego el modelo del backend cambiará y enviará algún otro dato, el test no se necesitaría modificar debido a que solo valida los valores necesarios (id, fullName, initials).