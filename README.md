# TransCor Logistica - Prototipo Frontend

Prototipo academico construido con React, TypeScript y Vite para presentar el sistema **TransCor Logistica**.

## Objetivo del prototipo

Mostrar una interfaz web estatica, navegable y clara para defender el flujo principal de gestion de envios, seguimiento y operacion de Puntos Host. El foco esta puesto en la experiencia de uso y en la demostracion funcional del modulo, no en una implementacion productiva.

## Alcance

El prototipo cubre el **Modulo A: Gestion de Envios + Portal del Cliente** e incorpora la funcionalidad adicional de **Puntos Host**.

Pantallas incluidas:

- Login simulado
- Dashboard
- Nuevo envio
- Tracking
- Portal corporativo
- Solicitudes de retiro
- Puntos Host
- Tarifas y zonas

## Importante

Esta aplicacion no tiene backend, base de datos real, autenticacion real ni conexion a APIs externas. Todas las acciones se simulan con datos mockeados en memoria, modales, toasts o cambios visuales.

Los datos de ejemplo estan separados en:

```text
src/data/mockData.ts
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar el proyecto

```bash
npm run dev
```

Luego abrir la URL local que muestra Vite, normalmente:

```text
http://localhost:5173/
```

## Compilar para entrega

```bash
npm run build
```

## Revisar lint

```bash
npm run lint
```

## Flujo recomendado para mostrar en la defensa

1. Ingresar desde el login simulado con el boton **Ingresar**.
2. En el Dashboard, mostrar indicadores, ultimos envios y la seccion **Flujo sugerido para demo**.
3. Ir a **Nuevo envio**.
4. Elegir la modalidad **Retiro en Punto Host**.
5. Seleccionar un Punto Host disponible.
6. Presionar **Calcular tarifa**.
7. Presionar **Confirmar envio** y revisar el modal con codigo, tarifa final y Punto Host seleccionado.
8. Ir a **Tracking** desde el modal.
9. Mostrar la linea de tiempo y la tarjeta de paquete disponible en Punto Host.
10. Ir a **Puntos Host > Operacion del Host**.
11. Usar **Validar retiro** o **Confirmar retiro** para mostrar la respuesta simulada del sistema.

## Notas de entrega

- El menu lateral permite navegar todas las pantallas principales.
- El login es falso y no valida credenciales.
- Los botones principales tienen una respuesta visible mediante toast, modal o resultado simulado.
- El proyecto esta pensado como prototipo frontend estatico para presentacion academica.
