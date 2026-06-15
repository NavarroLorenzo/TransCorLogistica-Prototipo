export type Screen =
  | 'dashboard'
  | 'nuevo-envio'
  | 'tracking'
  | 'portal'
  | 'retiros'
  | 'hosts'
  | 'tarifas'

export type Shipment = {
  code: string
  client: string
  recipient: string
  service: string
  modality: string
  status: string
  zone: string
  estimated: string
  origin: string
  destination: string
  createdAt: string
  host?: string
}

export type HostPoint = {
  name: string
  address: string
  locality: string
  hours: string
  capacity: number
  services: string[]
}

export const navItems: { key: Screen; label: string; icon: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'IN' },
  { key: 'nuevo-envio', label: 'Nuevo envio', icon: 'NE' },
  { key: 'tracking', label: 'Mis envios', icon: 'ME' },
  { key: 'portal', label: 'Portal corporativo', icon: 'PC' },
  { key: 'retiros', label: 'Solicitudes de retiro', icon: 'SR' },
  { key: 'hosts', label: 'Puntos Host', icon: 'PH' },
  { key: 'tarifas', label: 'Tarifas y zonas', icon: 'TZ' },
]

export const dashboardStats = [
  ['Envios registrados hoy', '36', '+8 vs ayer'],
  ['Envios pendientes', '14', '5 requieren despacho'],
  ['Envios en transito', '128', 'Rutas activas'],
  ['Envios entregados', '91', 'Hoy'],
  ['Envios con problemas', '5', 'Prioridad alta'],
  ['Paquetes disponibles en Punto Host', '27', '6 vencen pronto'],
  ['Solicitudes de retiro pendientes', '9', '3 corporativas'],
  ['Devoluciones pendientes en Host', '11', 'Pendientes de recoleccion'],
]

export const shipments: Shipment[] = [
  {
    code: 'TC-2026-0001',
    client: 'Andes Repuestos SRL',
    recipient: 'Mariana Costa',
    service: 'Express',
    modality: 'Retiro en Punto Host',
    status: 'Disponible en Punto Host',
    zone: 'Cordoba Capital',
    estimated: '26/05/2026',
    origin: 'Cordoba Capital',
    destination: 'Barrio General Paz',
    createdAt: '25/05/2026',
    host: 'Kiosco Nueva Cordoba',
  },
  {
    code: 'TC-2026-0002',
    client: 'Electro Centro',
    recipient: 'Nicolas Farina',
    service: 'Estandar',
    modality: 'Entrega a domicilio',
    status: 'En tránsito',
    zone: 'Villa Allende',
    estimated: '27/05/2026',
    origin: 'Cordoba Capital',
    destination: 'Villa Allende',
    createdAt: '25/05/2026',
  },
  {
    code: 'TC-2026-0003',
    client: 'Laura Molina',
    recipient: 'Rocio Perez',
    service: 'Documentacion',
    modality: 'Entrega a domicilio',
    status: 'Recibido',
    zone: 'Alta Gracia',
    estimated: '28/05/2026',
    origin: 'Nueva Cordoba',
    destination: 'Alta Gracia',
    createdAt: '25/05/2026',
  },
  {
    code: 'TC-2026-0004',
    client: 'Viento Sur Textil',
    recipient: 'Federico Luna',
    service: 'Mismo dia',
    modality: 'Retiro en Punto Host',
    status: 'En deposito',
    zone: 'Cordoba Capital',
    estimated: '25/05/2026',
    origin: 'Cordoba Capital',
    destination: 'Centro',
    createdAt: '25/05/2026',
    host: 'Libreria Plaza',
  },
  {
    code: 'TC-2026-0005',
    client: 'BioFrio SA',
    recipient: 'Sanatorio Norte',
    service: 'Refrigerado',
    modality: 'Entrega a domicilio',
    status: 'Con problema',
    zone: 'Jesus Maria',
    estimated: '26/05/2026',
    origin: 'Cordoba Capital',
    destination: 'Jesus Maria',
    createdAt: '24/05/2026',
  },
  {
    code: 'TC-2026-0006',
    client: 'Cordoba Farma',
    recipient: 'Matias Herrera',
    service: 'Express',
    modality: 'Retiro en Punto Host',
    status: 'Pendiente',
    zone: 'Cordoba Capital',
    estimated: '26/05/2026',
    origin: 'Centro',
    destination: 'Nueva Cordoba',
    createdAt: '25/05/2026',
    host: 'Mini Market Ruta 20',
  },
  {
    code: 'TC-2026-0007',
    client: 'Nexo Tecnologia',
    recipient: 'Carolina Diaz',
    service: 'Estandar',
    modality: 'Entrega a domicilio',
    status: 'Entregado',
    zone: 'Sierras Chicas',
    estimated: '25/05/2026',
    origin: 'Cordoba Capital',
    destination: 'Mendiolaza',
    createdAt: '24/05/2026',
  },
  {
    code: 'TC-2026-0008',
    client: 'Punto Hogar',
    recipient: 'Diego Aguilar',
    service: 'Gran tamano',
    modality: 'Entrega a domicilio',
    status: 'En tránsito',
    zone: 'Valle de Punilla',
    estimated: '28/05/2026',
    origin: 'Cordoba Capital',
    destination: 'Villa Carlos Paz',
    createdAt: '25/05/2026',
  },
]

export const hostPoints: HostPoint[] = [
  {
    name: 'Kiosco Nueva Cordoba',
    address: 'Obispo Trejo 742',
    locality: 'Cordoba Capital',
    hours: 'Lun a sab 09:00 a 20:00',
    capacity: 42,
    services: ['Retiros', 'Envios', 'Devoluciones'],
  },
  {
    name: 'Libreria Plaza',
    address: 'San Martin 318',
    locality: 'Cordoba Capital',
    hours: 'Lun a vie 08:30 a 18:30',
    capacity: 18,
    services: ['Retiros', 'Devoluciones'],
  },
  {
    name: 'Mini Market Ruta 20',
    address: 'Av. Fuerza Aerea 4112',
    locality: 'Cordoba Capital',
    hours: 'Todos los dias 10:00 a 22:00',
    capacity: 31,
    services: ['Retiros', 'Envios'],
  },
]

export const withdrawalRequests = [
  ['RET-0201', 'Andes Repuestos SRL', 'Bv. Los Alemanes 810', 'Pendiente', '26/05/2026', '09:00-12:00'],
  ['RET-0202', 'Viento Sur Textil', 'Rondeau 95', 'Asignada', '25/05/2026', '14:00-17:00'],
  ['RET-0203', 'Electro Centro', 'Colon 1500', 'En proceso', '25/05/2026', '12:00-15:00'],
  ['RET-0204', 'BioFrio SA', 'Parque Industrial 2', 'Retirada', '24/05/2026', '08:00-11:00'],
]

export const invoices = [
  ['Mayo 2026', 'FAC-A-000193', '25/05/2026', 'Disponible', '$ 428.600'],
  ['Abril 2026', 'FAC-A-000171', '30/04/2026', 'Pagada', '$ 391.200'],
  ['Marzo 2026', 'FAC-A-000144', '31/03/2026', 'Pagada', '$ 365.900'],
]

export const hostAdmins = [
  ['H-001', 'Natalia Suarez', 'Persona', '29.441.882', '351-602-7741', 'natalia@host.com', 'Aprobado', '2'],
  ['H-002', 'Autoservicio El Sol', 'Negocio', '30-71888221-4', '351-488-1200', 'elsol@host.com', 'Pendiente de validacion', '1'],
  ['H-003', 'Distribuidora Norte', 'Negocio', '30-66210022-9', '3525-441100', 'norte@host.com', 'Suspendido', '3'],
]

export const zones = [
  ['Cordoba Capital', 'Urbana', 'Centro, Nueva Cordoba, General Paz', '5000-5016', 'Activa'],
  ['Sierras Chicas', 'Regional', 'Villa Allende, Mendiolaza, Unquillo', '5105-5109', 'Activa'],
  ['Valle de Punilla', 'Regional', 'Carlos Paz, Cosquin, La Falda', '5152-5172', 'Activa'],
  ['Norte provincial', 'Extendida', 'Jesus Maria, Colonia Caroya', '5220-5223', 'Activa'],
]

export const tariffBase = [
  ['Cordoba Capital', 'Cordoba Capital', 'Estandar', '$ 2.400', '$ 650', '0-5 kg', 'Mayo 2026'],
  ['Cordoba Capital', 'Sierras Chicas', 'Express', '$ 4.200', '$ 820', '0-10 kg', 'Mayo 2026'],
  ['Cordoba Capital', 'Norte provincial', 'Refrigerado', '$ 7.800', '$ 1.400', '0-8 kg', 'Mayo 2026'],
]

export const corporateDeals = [
  ['Andes Repuestos SRL', '12%', '$ 3.100', '120 envios/mes', '31/12/2026', 'Activo'],
  ['Viento Sur Textil', '18%', '$ 2.850', '250 envios/mes', '30/09/2026', 'Activo'],
  ['BioFrio SA', '8%', '$ 6.900', '60 envios/mes', '31/08/2026', 'En revision'],
]

export const surcharges = [
  ['Seguro', 'Cobertura por valor declarado', '2.5%', 'Si requiere seguro'],
  ['Express', 'Prioridad operativa', '$ 1.200', 'Servicio Express'],
  ['Gran tamano', 'Manipulacion especial', '$ 1.800', 'Bulto mayor a 80 cm'],
  ['Refrigerado', 'Cadena de frio controlada', '18%', 'Tipo refrigerado'],
]
