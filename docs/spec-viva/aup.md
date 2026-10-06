# Cuentas y acceso

## Purpose

Permitir que las personas usuarias de FlowSync creen una cuenta, se identifiquen y mantengan una sesión segura, de modo que solo accedan a su propia información y a las funciones del producto. Esta capability es la base de identidad sobre la que se apoyan el resto de capabilities.

## Requeriments

### Requeriment: Registro de cuenta

El sistema SHALL permitir que una persona visitante cree una cuenta proporcionando su correo electrónico, una contraseña y la confirmación de dicha contraseña, y opcionalmente su nombre completo.

#### Scenario: Registro con datos válidos

- **WHEN** una persona visitante envía un correo electrónico que no está registrado, una contraseña válida y una confirmación idéntica a la contraseña
- **THEN** el sistema SHALL crear la cuenta y SHALL devolver los datos públicos de la persona junto con un token de acceso para iniciar sesión de inmediato

#### Scenario: Registro con correo ya registrado

- **WHEN** una persona visitante envía un correo electrónico que ya pertenece a otra cuenta
- **THEN** el sistema SHALL rechazar el registro e SHALL indicar que el correo ya está en uso, sin crear ninguna cuenta nueva

### Requeriment: Validación de los datos de registro

El sistema SHALL validar los datos de registro antes de crear la cuenta y SHALL informar de los errores asociados a cada campo.

#### Scenario: Contraseña fuera de los límites permitidos

- **WHEN** una persona visitante envía una contraseña con menos de 8 caracteres o con más de 32 caracteres
- **THEN** el sistema SHALL rechazar el registro e SHALL indicar el error en el campo de la contraseña

#### Scenario: Confirmación de contraseña distinta

- **WHEN** una persona visitante envía una confirmación de contraseña que no coincide con la contraseña
- **THEN** el sistema SHALL rechazar el registro e SHALL indicar el error en el campo de confirmación

#### Scenario: Correo con formato inválido

- **WHEN** una persona visitante envía un correo electrónico con formato inválido o de más de 254 caracteres
- **THEN** el sistema SHALL rechazar el registro e SHALL indicar el error en el campo del correo

### Requeriment: Inicio de sesión

El sistema SHALL permitir que una persona con cuenta inicie sesión mediante su correo electrónico y su contraseña, y SHALL entregarle un token de acceso para identificarse en solicitudes posteriores.

#### Scenario: Inicio de sesión con credenciales correctas

- **WHEN** una persona registrada envía su correo electrónico y su contraseña correctos
- **THEN** el sistema SHALL devolver un token de acceso válido junto con los datos públicos de la persona

#### Scenario: Inicio de sesión con credenciales incorrectas

- **WHEN** una persona envía un correo electrónico no registrado o una contraseña que no corresponde a la cuenta
- **THEN** el sistema SHALL rechazar el inicio de sesión con un mensaje de credenciales inválidas, sin revelar cuál de los dos datos es incorrecto

### Requeriment: Protección de la información de la contraseña

El sistema SHALL NOT almacenar ni devolver en ningún momento la contraseña en texto plano, y SHALL NOT incluir datos sensibles de la cuenta en las respuestas que expongan la información de la persona.

#### Scenario: Respuesta con datos de la persona

- **WHEN** el sistema devuelve los datos de una persona en el registro, el inicio de sesión o la consulta de perfil
- **THEN** la respuesta SHALL contener únicamente datos públicos de la cuenta y SHALL NOT contener la contraseña ni ningún derivado de ella

### Requeriment: Consulta del perfil

El sistema SHALL permitir que una persona con sesión activa consulte los datos de su propio perfil.

#### Scenario: Consulta con sesión activa

- **WHEN** una persona con un token de acceso válido solicita su perfil
- **THEN** el sistema SHALL devolver los datos públicos de la cuenta a la que pertenece el token

#### Scenario: Consulta sin sesión

- **WHEN** una solicitud de perfil llega sin token de acceso o con un token inválido, expirado o revocado
- **THEN** el sistema SHALL rechazar la solicitud indicando que la persona no está autenticada, sin devolver ningún dato de perfil

### Requeriment: Cierre de sesión

El sistema SHALL permitir que una persona con sesión activa cierre su sesión e invalide el token de acceso utilizado.

#### Scenario: Cierre de sesión con token válido

- **WHEN** una persona con un token de acceso válido solicita cerrar sesión
- **THEN** el sistema SHALL invalidar ese token y SHALL confirmar el cierre de sesión

#### Scenario: Uso de un token tras cerrar sesión

- **WHEN** una persona ya cerró su sesión y envía una solicitud con el token que fue invalidado
- **THEN** el sistema SHALL rechazar la solicitud como no autenticada

### Requeriment: Protección de funciones privadas

El sistema SHALL exigir una sesión activa para acceder a las funciones que no sean de registro o inicio de sesión.

#### Scenario: Acceso a una función privada sin autenticación

- **WHEN** una persona sin sesión activa intenta acceder a una función reservada a personas autenticadas
- **THEN** el sistema SHALL denegar el acceso y SHALL NOT ejecutar la función solicitada

### Requeriment: Continuidad de la sesión en la interfaz

El sistema SHOULD conservar la sesión de la persona entre visitas a la aplicación y MUST verificar su vigencia contra el servidor antes de darla por válida.

#### Scenario: Retorno con sesión vigente

- **WHEN** una persona que inició sesión anteriormente vuelve a abrir la aplicación y su token sigue siendo válido
- **THEN** el sistema SHALL restablecer su sesión y SHALL mostrarle las pantallas privadas sin pedirle de nuevo sus credenciales

#### Scenario: Retorno con sesión no vigente

- **WHEN** una persona vuelve a abrir la aplicación y su token conservado ya no es válido
- **THEN** el sistema SHALL descartar la sesión conservada y SHALL dirigir a la persona a la pantalla de inicio de sesión

### Requeriment: Acceso según el estado de la sesión en la interfaz

El sistema SHALL dirigir a la persona a la pantalla que corresponda a su estado de autenticación.

#### Scenario: Persona sin sesión intenta abrir una pantalla privada

- **WHEN** una persona sin sesión activa intenta abrir una pantalla reservada a personas autenticadas
- **THEN** el sistema SHALL redirigirla a la pantalla de inicio de sesión

#### Scenario: Persona con sesión intenta abrir inicio de sesión o registro

- **WHEN** una persona con sesión activa intenta abrir la pantalla de inicio de sesión o la de registro
- **THEN** el sistema SHALL redirigirla a la pantalla principal de la aplicación

### Requeriment: Mensajes de error comprensibles

El sistema SHALL presentar los errores de registro, inicio de sesión y autenticación en español y, cuando el error corresponda a un campo concreto, SHALL asociarlo a ese campo.

#### Scenario: Error de validación en un formulario

- **WHEN** una persona envía un formulario de registro o de inicio de sesión con datos que no superan la validación
- **THEN** el sistema SHALL mostrar mensajes en español junto a cada campo afectado y SHALL conservar los datos que la persona ya había escrito



## Parte B

1. Escribió 10 y yo revise 5.
2. 
- Pude ver que me genero un requerimiento **Mensajes de error comprensibles** pero veo que este bien ya pudiera estar inmerso en el requerimiento **Validación de datos de registro**.
Nota: Tal vez no capte correctamente la pregunta, pero esto fue lo único que me genero ruido.

3. Pues aqui pondría siempre al requerimiento de los mensajes debido a que no me quedo claro si es parte del contrato o una exageración del agente.
