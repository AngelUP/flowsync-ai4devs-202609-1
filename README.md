# FlowSync

Proyecto de práctica del curso: gestión de tareas en equipo. API en AdonisJS (`backend/`) +
frontend en React + Vite (`frontend/`).

Este es el sistema sobre el que trabajas en el Módulo 4. Léelo entero antes de empezar: además
de cómo levantarlo, aquí está **el ejercicio y cómo se entrega**.

## Arrancarlo

El repo trae un `Makefile` en la raíz con los atajos de desarrollo. Con dos comandos tienes todo
en marcha:

```bash
make setup   # solo la primera vez: instala backend y frontend, crea los .env y migra
make start   # levanta backend (:3333) y frontend (:5173) a la vez
```

`make start` arranca los dos servidores juntos; `Ctrl-C` los para. `make help` lista todos los
targets.

- Backend en `http://localhost:3333`.
- Frontend en `http://localhost:5173`. Apunta al backend por defecto; para cambiarlo, ajusta
  `VITE_API_URL` en `frontend/.env`.

La suite se lanza desde `backend/`:

```bash
(cd backend && npm test)
```

Debe terminar **en verde**. Si algo sale en rojo aquí, es tu entorno: resuélvelo antes del
directo.

> ¿Prefieres arrancar a mano, sin `make`? Los pasos por servidor (`npm install`, `.env`,
> migraciones, `npm run dev`) están en el asíncrono del curso.

## Dónde está lo que vas a necesitar

- `openspec/specs/` es la **spec viva**. Cada carpeta de ahí dentro es una **capability**: una
  parcela de comportamiento del sistema, escrita como **debe comportarse** y no como está
  programada. Dentro de cada una hay **requisitos**, y colgando de cada requisito, los
  **scenarios**: los ejemplos concretos, con su par de *cuándo* y *entonces*, contra los que esa
  regla se comprueba.
- `backend/tests/` es la suite. Ahí viven los tests que ya existen, y ahí van los que escribas.
- `CLAUDE.md` (y `AGENTS.md`, que apunta al mismo archivo) son las reglas que tu agente lee
  siempre.

---

# El ejercicio

**Se hace antes del directo.** Son unos 45 minutos y hay que ponerles un reloj.

## Cómo funciona este módulo

Tres momentos, y conviene que los sepas antes de empezar:

1. **Lo intentas tú**, aquí, sobre este proyecto. Entregas lo que te salga, con lo que tenga.
2. **Lo ves resuelto en el directo.** El mentor hace este mismo trabajo sobre este mismo
   proyecto. Si no te salió, ahí ves que se puede y cómo.
3. **Lo replicas después**, con los prompts del mentor, que te llegan por escrito.

Por eso la entrega a medias no es un problema: **el paso 1 no se puntúa por completarlo**. Y por
eso conviene mirar el directo sin teclear, porque lo vas a repetir con calma luego.

> ⚠️ **En el paso 3 no esperes salidas idénticas.** El agente no es determinista: con el mismo
> prompt y el mismo código cambian los nombres de las variables, la redacción y hasta cuántas
> filas te devuelve una tabla. Lo que se repite es **la forma**, no el texto.

## Parte A: la matriz y los tests que faltan, con reloj

Con un agente, y sobre el requisito **«Lo que cada tarea muestra de su responsable»** de
`openspec/specs/tasks/spec.md`, produce dos cosas y déjalas escritas en archivos versionados, no
en el chat. Es el mismo requisito sobre el que trabaja el mentor en el directo: tú lo intentas
antes, con tus propios prompts.

**Solo ese requisito.** No la capability entera, aunque quepa y aunque el agente se ofrezca a
cubrirla.

### A.1 · La matriz de trazabilidad

Va en `docs/verificacion/<tus-iniciales>.md`. Es una carpeta nueva: la crea tu archivo.

**El formato no es negociable**: una fila por scenario, con estas cuatro casillas, y **dos
números arriba del todo** (cuántos scenarios tiene ese requisito y cuántos resultaron estar
cubiertos).

1. **El scenario, en una línea.** Qué se espera y en qué situación.
2. **Qué prueba lo cubre, nombrada tal cual aparece en la suite.** Sin el nombre concreto, la
   casilla se queda vacía: *"seguro que algo lo cubre"* no es una fila.
3. **Cubierto · No cubierto · No lo sé.** Los tres estados existen, y el tercero no es un fallo
   tuyo: es el resultado más informativo de los tres.
4. **Si pusiste "no lo sé", qué te faltó para decidirlo.** Media línea.

> ⚠️ **Un nombre de test no es una prueba de cobertura.** Un test puede llamarse igual que el
> scenario y comprobar otra cosa, o comprobar la mitad. Para marcar *cubierto* hay que abrir el
> test y leer lo que afirma.

### A.2 · Los tests que faltan

De las filas que quedaron en **No cubierto**, escribe los tests que faltan: **uno por scenario**,
en `backend/tests/functional/tasks/`, siguiendo el estilo de los de `backend/tests/functional/auth/`. **No toques
nada fuera de `backend/tests/`.**

Después, ejecútalos.

> ⚠️ **Pase lo que pase, no arregles el código, y no aflojes el test para que pase.** Si algo se
> pone rojo, se queda rojo y se entrega rojo: hoy toca saber qué está mal, no taparlo. Quien
> verifica no arregla, porque quien arregla deja de ver.

> ⚠️ **Cuando suene el reloj, para. Aunque esté a medias.** Una matriz con cuatro filas rellenas
> y el resto en blanco **es información**: dice hasta dónde llegaste. Una fila completada de
> memoria diez minutos después es ruido con formato, y encima es indistinguible de la buena.

## Parte B: las tres líneas

Debajo de la matriz, en el mismo archivo. **Esta parte no se puede fallar**, y es la que hay que
traer sí o sí.

1. **Cuántos scenarios creías cubiertos antes de mirar, y cuántos lo estaban.** El primer número
   se escribe **antes** de lanzar el primer prompt, a ojo y sin abrir nada. Los dos tal cual
   salieron.
2. **El scenario del que no supiste si era un hueco de test o un hueco de spec**, y en una frase,
   por qué.
3. **Algo que el scenario no decidía por ti y tuviste que decidir al escribir el test.** Un valor
   concreto, un límite, qué pasa cuando el dato viene vacío.

---

# Cómo se entrega

**Es un pull request desde tu fork.** Cinco pasos.

### 1. Forkea este repositorio

Con el botón **Fork** de arriba. Sobre un clon directo no tienes permiso de escritura, y aquí vas
a crear una rama y commitear.

```bash
git clone git@github.com:<tu-usuario>/flowsync-ai4devs.git
cd flowsync-ai4devs
git remote add upstream git@github.com:LIDR-academy/flowsync-ai4devs.git
git fetch upstream
git checkout -b s4/start upstream/s4/start
```

> 📌 Si te sale `Permission denied (publickey)`, es SSH y no el fork. La guía oficial está en
> `docs.github.com/es/authentication/connecting-to-github-with-ssh`.

### 2. Crea tu rama

```bash
git checkout -b trazabilidad-<tus-iniciales>
```

### 3. Haz el ejercicio

La matriz y las tres líneas van en `docs/verificacion/<tus-iniciales>.md`. Los tests, en
`backend/tests/functional/tasks/`.

### 4. Rellena `prompts.md`

Está en la raíz, con la plantilla puesta. **Es obligatorio y es la mitad de lo que se revisa**: lo
que se mira no es solo tu resultado, es cómo lo pediste. Un prompt por bloque, con el modelo y la
herramienta que usaste.

### 5. Abre el pull request

Contra este repositorio. Con tu rama empujada, GitHub te ofrece el botón arriba.

```bash
git add docs/verificacion backend/tests prompts.md
git commit -m "trazabilidad: responsable de la tarea + prompts"
git push -u origin trazabilidad-<tus-iniciales>
```

## El plazo

**Antes del directo.** Lo que llegue a tiempo recibe feedback de tu TA antes de la sesión, que es
el momento en que te sirve. Lo que llegue después **se marca como recibido pero no se revisa**: el
feedback existe para que llegues al directo sabiendo dónde fallaste, y después de la sesión ya no
puede hacer eso.

## Antes de conectarte, comprueba

- [ ] Estás en tu **fork**, en tu rama, y `git push` funciona.
- [ ] El proyecto levanta y la suite corre.
- [ ] Existe tu archivo en `docs/verificacion/`, con la matriz y las tres líneas.
- [ ] Los tests que escribiste están commiteados tal como quedaron.
- [ ] `prompts.md` está relleno, con modelo y herramienta en cada bloque.
- [ ] El pull request está abierto.
