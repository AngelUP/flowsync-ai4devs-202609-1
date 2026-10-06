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
Considerando que ya existe la capability **cuentas y acceso** que conlleva el registro, inicio de sesion, sesión y perfil. Genera un archivo con el nombre **aup.md** en la ruta **docs/spec-viva/** con los siguientes puntos:

-Agregar un ## Purpose de una o dos frases que expliquen porque existe la capability.
-Agregar un ## Requeriments.
-Colgando de ## Requeriments crear los ## Requeriment necesarios con lo que el sistema debe hacer. La nomenclatura para escribir esta sección es empezar con "El sistema SHALL ...".
-Bajo cada requisito, agregar al menos un ## Scenario de cuatro almohadillas, con dos viñetas **WHEN** y **THEN**. Para esto se utiliza BDD pero considera que no hay espacio para el GIVEN, este se agrega dentro del WHEN.

Consideraciones para redactar el archivo:

-Todo en español.
-Usar RFC-2119.
-No agregar ADD, MODIFIED ni REMOVED.
-No incluyas nombre de clases, archivos o rutas de código.
-No modificar código.


```

**Qué salió:** Función a la primera, me genero el archivo. Solo que me genero automaticamente el commit e intento el PR al repo de LIDR (el tema de permisos lo detuvo).
