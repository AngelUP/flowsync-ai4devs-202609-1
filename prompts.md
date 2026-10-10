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

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Ubica la spec viva 'tasks', sobre el requerimiento 'Lo que cada tarea muestra de su responsable' y lee los escenarios de esa feature y compara con los test existentes.

Crea el archivo 'aup.md' en la ubicación 'docs/verificacion/'. Dentro de este archivo agrega:

- # de escenarios del requerimientos y # de escenarios cubiertos por las pruebas.
- Una tabla de trazabilidad que contenga: cada esceneario (QUE espera y EN QUE situación), el test que lo cubre (indicar el nombre del archivo de prueba), indicar CUBIERTO o NO CUBIERTO, agregar una columna de observaciones (para que puede agregar algún comentario posterior).

Respeta lo siguiente:
- Trabaja solo sobre el requerimiento indicado.
- No generes commit. Se realizará manualmente.
- No modifiques el código. Limitate a la verificación y al archivo requerido.

```

**Qué salió:** Funcionó. Genero el archivo con la cantidad de escenarios total (3) y los cubiertos (Ninguno).

## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Genera los test necesarios por cada escenario y almacenalos en la ubicación 'backend/tests/functional/tasks/' siguiendo el estilo de los test ya creados para 'auth'.

En el archivo de verificación 'aup.md' agregar '(original)' a las secciones 'Resumen' y 'Tabla de trazabilidad'.

Después de generar los tests, ejecutalos. Posteriomente, crea nuevas secciones 'Resumen' y 'Tabla de trazabilidad' donde debes colocar el resultado de un nuevo analisis para verificar si los escenarios quedaron cubiertos.

Respeta lo siguiente:
- No generes commit. Se realizará manualmente.

```

**Qué salió:** Funcionó. Se generó un solo archivo de pruebas llamado 'assignee'. Se observa que existe un escenario que No se cumple, entonces la feature no está al 100%. Adicionalmente, se comenta que se pidió agregar una nueva tabla solo para trazabilidad del ejercicio, se entiende que si se requiere un registro versionado se actualizaría por cada ajuste realizado a los test y su resultado.

También, se comenta que se dejo solo un archivo de prueba puesto que se valida contra lo que se tiene en 'auth' y no se determina que existiera alguna regla de archivo por escenario. Pienso que el archivo 'assignee' correctamente puede contener todos los escenarios. FAVOR DE INDICARME SI ESTOY EN LO CORRECTO O NO.


## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Revisando los test, se detecta que el requerimiento comparte que la tarjeta solo requiere el nombre y las iniciales.

Modifica los casos de prueba del archivo 'assignee.spec.ts' según lo siguiente:

- En los casos 'una tarea suelta no expone el email ni otros datos de la cuenta' y 'la lista no expone el email ni otros datos de la cuenta del responsable', se observa que se verifica que no llegan otros campos adicionales como 'email', 'password', etc. Si en un futuro se agregan nuevos datos de cuenta, se tendría que modificar estos casos de prueba. Modifica estos escenarios para que en vez de comprobar todos los campos que no deberían llegar, se verifique que solo lleguen los 2 campos requeridos (nombre e iniciales) y si llega algún otro dato que el test no pase. 

Respeta lo siguiente:
- Solo modifica el archivo indicado en los casos especificos.
- No generes commit. Se realizará manualmente.

```

**Qué salió:** Funcionó el cambio, pero se omitió permitir el ID del responsable. Por lo que un escenario adicional ahora falla. Se relizará el ajuste.

## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Modifica el archivo 'assignee.spec.ts' según lo siguiente:

- En los casos 'una tarea suelta no expone el email ni otros datos de la cuenta' y 'la lista no expone el email ni otros datos de la cuenta del responsable' adicional al nombre e iniciales del reponsable, permite el 'id' del responsable.

Respeta lo siguiente:
- Solo modifica el archivo indicado en los casos especificos.
- No generes commit. Se realizará manualmente.

```

**Qué salió:** Funcionó el ajuste para permitir el id del responsable. Actualmente, solo existe un escenario que no se cumple porque efectivamente al consultar la lista, se envían datos de la cuenta del responsable como su email y fechas.
