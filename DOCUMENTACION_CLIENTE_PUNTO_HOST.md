# Documentacion del prototipo: Cliente y Punto Host

Este documento explica que hace cada apartado del prototipo de TransCor Logistica, separado por las dos vistas solicitadas: Cliente y Punto Host.

El prototipo es una aplicacion frontend estatica. No tiene backend, base de datos real, autenticacion real ni integraciones externas. Las respuestas del sistema se simulan con datos cargados en memoria, mensajes visuales, tablas y notificaciones.

## Vista Cliente

La vista Cliente representa el acceso de un cliente corporativo o remitente que necesita gestionar envios, consultar estados, solicitar retiros y revisar facturacion.

### Acceso

En la pantalla inicial se muestra un login simulado con email y contrasena precargados. Para entrar a esta experiencia se selecciona el perfil **Cliente** y luego se presiona **Ingresar**.

El selector de perfil existe solamente para la presentacion del prototipo. En una version real, el sistema identificaria el rol segun el usuario autenticado.

### Barra lateral

En la vista Cliente, el menu muestra los accesos permitidos para este perfil:

- **Mis envios**: permite consultar el listado de envios y hacer seguimiento.
- **Solicitudes de retiro**: permite pedir retiros de paquetes desde una direccion.
- **Portal corporativo**: concentra las funciones principales del cliente con convenio.

La barra lateral tambien indica la **Vista activa**, para dejar claro que el usuario esta navegando como Cliente.

### Barra superior

La parte superior muestra el modulo activo, una descripcion del rol y el usuario demo. Tambien incluye:

- Boton de notificaciones: muestra una notificacion simulada.
- Boton **Cambiar vista**: vuelve al login para seleccionar otro perfil del prototipo.

### Portal corporativo

Es la vista principal del Cliente. Esta organizada en pestanas internas.

#### Inicio

Muestra indicadores resumidos del cliente:

- Envios activos.
- Entregados hoy.
- Pendientes.
- Envios con problemas.
- Retiros solicitados.
- Facturas disponibles.

Sirve como resumen rapido del estado operativo de la cuenta corporativa.

#### Nuevo envio

Permite simular la creacion de un envio corporativo. El formulario pide:

- Destinatario.
- Direccion.
- Peso.
- Dimensiones.
- Servicio: Estandar, Express o Mismo dia.
- Modalidad: Domicilio o Punto Host.

El boton **Crear envio** no guarda en una base real; muestra una confirmacion simulada.

#### Carga masiva

Permite representar la carga de muchos envios por archivo. Incluye:

- Boton para descargar una plantilla CSV/Excel en modo demo.
- Campo para seleccionar archivo.
- Tabla de validacion con filas de ejemplo.

La tabla muestra un caso correcto y un caso con error simulado por falta de codigo postal. Este apartado sirve para explicar como el sistema podria validar archivos antes de registrar envios.

#### Mis envios

Muestra filtros para buscar envios por:

- Fecha.
- Estado.
- Destinatario.
- Codigo.
- Tipo de servicio.
- Modalidad.

Debajo aparece una tabla con envios de ejemplo. Cada fila muestra codigo, destinatario, servicio, modalidad, estado y fecha estimada. El objetivo es que el cliente pueda consultar sus operaciones y detectar rapidamente en que estado esta cada paquete.

#### Solicitar retiro

Permite al cliente pedir que TransCor retire paquetes en una direccion. El formulario incluye:

- Direccion.
- Fecha.
- Franja horaria.
- Cantidad de paquetes.

El boton **Confirmar solicitud** muestra una confirmacion simulada de retiro corporativo.

#### Facturas

Lista facturas disponibles del cliente. La tabla muestra:

- Periodo.
- Numero.
- Fecha.
- Estado.
- Total.
- Accion de descarga.

La accion **Descargar** es simulada y sirve para representar el acceso del cliente a su documentacion comercial.

### Mis envios

Esta vista muestra un listado completo de envios del cliente y funciona como consulta rapida de ubicacion.

La tabla incluye:

- Codigo de seguimiento.
- Cliente.
- Destinatario.
- Servicio.
- Modalidad.
- Estado.
- Referencia de entrega o Punto Host.
- Fecha estimada.
- Boton **Track**.

Al presionar **Track**, el prototipo muestra una notificacion con el estado y la referencia del envio seleccionado.

### Solicitudes de retiro

Esta vista permite crear y consultar solicitudes de retiro.

#### Nueva solicitud

El formulario registra los datos necesarios para pedir un retiro:

- Cliente corporativo.
- Direccion de retiro.
- Localidad.
- Codigo postal.
- Zona detectada.
- Fecha solicitada.
- Franja horaria.
- Cantidad estimada de paquetes.
- Peso total estimado.
- Observaciones.
- Contacto en domicilio.
- Telefono de contacto.

El boton **Validar cobertura** simula la deteccion de zona y confirma que hay cobertura disponible. El boton **Confirmar solicitud** simula el alta de la solicitud.

#### Solicitudes existentes

Muestra una tabla con solicitudes ya cargadas. Cada registro indica:

- Codigo.
- Cliente.
- Direccion.
- Estado.
- Fecha.
- Franja horaria.

Sirve para explicar como el cliente podria controlar el avance de retiros pendientes, asignados, en proceso o ya retirados.

## Vista Punto Host

La vista Punto Host representa el acceso del comercio o punto fisico que recibe paquetes, valida retiros, registra envios, recibe devoluciones y solicita recolecciones.

### Acceso

En la pantalla inicial se selecciona el perfil **Punto Host** y luego se presiona **Ingresar**. Al entrar con este perfil, el prototipo abre directamente la pestana **Operacion del Host**, porque es la tarea principal del punto fisico.

### Barra lateral

En la vista Punto Host, el menu muestra:

- **Puntos Host**: pantalla principal para operar y configurar el punto.
- **Mis envios**: listado de envios y consulta rapida de tracking.

La barra lateral tambien muestra la **Vista activa** como Punto Host.

### Barra superior

La barra superior identifica el rol como Punto Host y muestra el usuario demo. Incluye el boton de notificaciones y el boton **Cambiar vista** para volver al selector de perfiles.

### Puntos Host

Es la pantalla principal del perfil Punto Host. Esta organizada en tres pestanas.

#### Administracion de Hosts

Muestra informacion de hosts registrados y un formulario de alta.

En **Hosts registrados**, la tabla presenta:

- ID Host.
- Nombre o razon social.
- Tipo.
- DNI / CUIT.
- Telefono.
- Email.
- Estado.
- Cantidad de puntos.
- Accion para ver detalle.

El boton **Ver** abre una accion simulada de detalle.

En **Formulario de alta**, se cargan datos basicos de un host:

- Tipo de Host.
- Nombre.
- Apellido.
- Razon social.
- DNI / CUIT.
- Telefono.
- Email.
- Direccion principal.
- Localidad.
- Codigo postal.
- Estado inicial.

El boton **Guardar Host** confirma el alta en modo demo.

#### Puntos fisicos

Permite configurar el punto fisico donde se reciben y entregan paquetes.

El formulario principal incluye:

- Host asociado.
- Nombre comercial.
- Direccion del punto.
- Localidad.
- Codigo postal.
- Zona.
- Telefono del punto.
- Referencia de ubicacion.
- Estado.

Luego se configuran servicios disponibles mediante casillas:

- Recibe paquetes para retiro.
- Acepta paquetes para envio.
- Acepta devoluciones.

Tambien permite definir capacidad y horarios:

- Capacidad maxima.
- Cantidad actual de paquetes.
- Capacidad disponible.
- Peso maximo por paquete.
- Tamano maximo permitido.
- Dia.
- Hora de apertura.
- Hora de cierre.
- Activo.

Los botones **Agregar horario** y **Guardar configuracion** muestran respuestas simuladas.

#### Operacion del Host

Es el apartado mas importante para el Punto Host. Simula las acciones diarias del comercio.

##### Escaneo rapido

Incluye un campo con un codigo de seguimiento o codigo de retiro. Desde ahi el operador puede ejecutar acciones rapidas:

- **Recibir paquete**: registra que el paquete llego al Punto Host, lo marca como disponible y genera codigo de retiro.
- **Validar retiro**: simula que el cliente retiro el paquete usando el codigo correcto.
- **Registrar envio**: crea un envio recibido por el Punto Host y lo deja pendiente de recoleccion.
- **Registrar devolucion**: registra una devolucion recibida y pendiente de recoleccion.

Cada accion muestra un resultado visible en pantalla.

##### Validar retiro

Permite confirmar formalmente la entrega de un paquete al destinatario. Solicita:

- Codigo de retiro.
- Codigo de seguimiento.
- Documento opcional.

El boton **Confirmar retiro** simula la validacion del codigo, cambia el envio a entregado y deja constancia del retiro en el Punto Host.

##### Registrar paquete para envio

Permite que el Punto Host reciba un paquete de un cliente para que TransCor lo retire despues. El formulario pide:

- Datos del remitente.
- Telefono y email.
- Datos del destinatario.
- Direccion destino.
- Localidad.
- Codigo postal.
- Descripcion del paquete.
- Peso.
- Dimensiones.
- Tipo de servicio.

El boton **Registrar paquete para recoleccion** genera un codigo de envio simulado y deja el paquete pendiente de recoleccion.

##### Registrar devolucion

Permite recibir devoluciones en el Punto Host. El formulario incluye:

- Codigo de seguimiento original.
- Codigo de devolucion.
- Motivo.
- Observaciones.

El boton **Registrar devolucion** deja la devolucion pendiente de recoleccion por parte de TransCor.

##### Solicitar recoleccion

Muestra una tabla de paquetes pendientes en el Punto Host, por ejemplo envios y devoluciones. Luego permite sugerir:

- Fecha de recoleccion.
- Franja horaria.
- Observaciones.

El boton **Solicitar recoleccion** simula el pedido para que TransCor pase a retirar los paquetes acumulados en el punto.

##### Consulta de movimientos

Permite revisar el historial operativo del Punto Host. Incluye filtros por:

- Punto.
- Fecha.
- Estado.
- Tipo de movimiento.
- Codigo.

La tabla muestra movimientos registrados, como paquetes recibidos, retiros entregados y devoluciones pendientes. Sirve para explicar la trazabilidad interna del Punto Host.

### Mis envios

Esta vista tambien esta disponible para el Punto Host. Muestra los envios del sistema en una tabla con:

- Codigo.
- Cliente.
- Destinatario.
- Servicio.
- Modalidad.
- Estado.
- Referencia.
- Fecha estimada.
- Accion Track.

El boton **Track** muestra una notificacion con el estado y la referencia del envio. En el contexto del Punto Host, esta vista sirve para consultar rapidamente paquetes asociados a retiros, entregas o movimientos operativos.

## Resumen del alcance

La vista Cliente cubre la gestion desde el lado del usuario que contrata o consulta envios: portal corporativo, seguimiento, retiros y facturas.

La vista Punto Host cubre la operacion del comercio o punto fisico: recepcion de paquetes, validacion de retiros, registro de envios, devoluciones, recolecciones y consulta de movimientos.

Ambas vistas usan datos de ejemplo y acciones simuladas para demostrar el flujo funcional del sistema sin depender de servicios externos.
