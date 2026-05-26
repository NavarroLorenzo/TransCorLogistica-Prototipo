import { useState } from 'react'
import {
  corporateDeals,
  dashboardStats,
  hostAdmins,
  hostPoints,
  invoices,
  navItems,
  shipments,
  surcharges,
  tariffBase,
  withdrawalRequests,
  zones,
  type HostPoint,
  type Screen,
  type Shipment,
} from './data/mockData'
import './App.css'

type HostTab = 'administracion' | 'puntos' | 'operacion'
type PortalTab = 'inicio' | 'nuevo' | 'masiva' | 'mis-envios' | 'retiro' | 'facturas'
type TarifaTab = 'zonas' | 'base' | 'convenios' | 'recargos'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [toast, setToast] = useState('')
  const [modal, setModal] = useState(false)
  const [deliveryMode, setDeliveryMode] = useState<'domicilio' | 'host'>('domicilio')
  const [selectedHost, setSelectedHost] = useState(hostPoints[0])
  const [tariffCalculated, setTariffCalculated] = useState(false)
  const [trackingSearched, setTrackingSearched] = useState(false)
  const [portalTab, setPortalTab] = useState<PortalTab>('inicio')
  const [hostTab, setHostTab] = useState<HostTab>('administracion')
  const [tarifaTab, setTarifaTab] = useState<TarifaTab>('zonas')
  const [hostResult, setHostResult] = useState('')
  const [coverage, setCoverage] = useState('')

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 3200)
  }

  function goTo(next: Screen) {
    setScreen(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">TC</span>
          <div>
            <strong>TransCor</strong>
            <span>Logistica</span>
          </div>
        </div>
        <nav className="side-nav">
          {navItems.map((item) => (
            <button
              className={screen === item.key ? 'active' : ''}
              key={item.key}
              onClick={() => goTo(item.key)}
              type="button"
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <span className="muted">Modulo A</span>
            <strong>Gestion de Envios + Portal del Cliente</strong>
          </div>
          <div className="user-chip">
            <button className="icon-button" onClick={() => notify('Tenes 4 notificaciones operativas nuevas.')} type="button">
              !
            </button>
            <div>
              <strong>Operador TransCor</strong>
              <span>Rol: Operaciones</span>
            </div>
          </div>
        </header>

        {screen === 'dashboard' && (
          <Dashboard
            stats={dashboardStats}
            onCreate={() => goTo('nuevo-envio')}
            onHostOperation={() => {
              setHostTab('operacion')
              goTo('hosts')
            }}
            onTrack={(code) => {
              setTrackingSearched(true)
              goTo('tracking')
              notify(`Tracking abierto para ${code}`)
            }}
            onPrint={(code) => notify(`Etiqueta ${code} enviada a impresion.`)}
          />
        )}
        {screen === 'nuevo-envio' && (
          <NewShipment
            deliveryMode={deliveryMode}
            selectedHost={selectedHost}
            tariffCalculated={tariffCalculated}
            onModeChange={setDeliveryMode}
            onSelectHost={(host) => {
              setSelectedHost(host)
              notify(`Punto Host seleccionado: ${host.name}`)
            }}
            onValidateAddress={() => notify('Direccion validada. Zona detectada: Cordoba Capital.')}
            onCalculate={() => {
              setTariffCalculated(true)
              notify('Tarifa simulada calculada correctamente.')
            }}
            onConfirm={() => setModal(true)}
            onQr={() => notify('Etiqueta QR generada para TC-2026-0001.')}
          />
        )}
        {screen === 'tracking' && (
          <Tracking
            searched={trackingSearched}
            shipment={shipments[0]}
            selectedHost={selectedHost}
            onSearch={() => {
              setTrackingSearched(true)
              notify('Envio encontrado en datos mockeados.')
            }}
            onCopy={() => notify('Codigo de retiro copiado: HOST-8421.')}
            onLocation={() => notify('Ubicacion abierta en modo demostracion.')}
          />
        )}
        {screen === 'portal' && (
          <CorporatePortal
            active={portalTab}
            setActive={setPortalTab}
            onAction={notify}
          />
        )}
        {screen === 'retiros' && (
          <WithdrawalRequests
            coverage={coverage}
            onCoverage={() => {
              setCoverage('Cobertura disponible. Zona detectada: Cordoba Capital.')
              notify('Cobertura validada para la direccion indicada.')
            }}
            onConfirm={() => notify('Solicitud RET-0205 confirmada y pendiente de asignacion.')}
          />
        )}
        {screen === 'hosts' && (
          <HostPoints
            active={hostTab}
            setActive={setHostTab}
            result={hostResult}
            onResult={(message) => {
              setHostResult(message)
              notify(message)
            }}
          />
        )}
        {screen === 'tarifas' && (
          <RatesAndZones
            active={tarifaTab}
            setActive={setTarifaTab}
            onAction={(message) => notify(message)}
          />
        )}
      </main>

      {toast && <div className="toast">{toast}</div>}
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <div className="success-mark">OK</div>
          <h2>Envio registrado correctamente</h2>
          <div className="summary-list">
            <span>Codigo de seguimiento</span>
            <strong>TC-2026-0001</strong>
          <span>Estado inicial</span>
          <strong>Recibido</strong>
          <span>Tarifa final</span>
          <strong>$ 5.861</strong>
          <span>Modalidad</span>
          <strong>{deliveryMode === 'host' ? `Punto Host - ${selectedHost.name}` : 'Entrega a domicilio'}</strong>
          {deliveryMode === 'host' && (
            <>
              <span>Punto Host seleccionado</span>
              <strong>{selectedHost.address}, {selectedHost.locality}</strong>
            </>
          )}
        </div>
          <div className="button-row">
            <button
              className="primary"
              onClick={() => {
                setModal(false)
                setTrackingSearched(true)
                goTo('tracking')
              }}
              type="button"
            >
              Ver tracking
            </button>
            <button onClick={() => notify('Etiqueta TC-2026-0001 enviada a impresion.')} type="button">
              Imprimir etiqueta
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="login-page">
      <section className="login-panel">
        <div className="login-copy">
          <span className="brand-mark large">TC</span>
          <h1>TransCor Logistica</h1>
          <p>Prototipo academico para gestion de envios, portal corporativo y operacion de Puntos Host.</p>
        </div>
        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault()
            onLogin()
          }}
        >
          <label>
            Email
            <input defaultValue="operador@transcor.com" type="email" />
          </label>
          <label>
            Contrasena
            <input defaultValue="demo2026" type="password" />
          </label>
          <button className="primary full" type="submit">
            Ingresar
          </button>
        </form>
      </section>
    </div>
  )
}

function Dashboard({
  stats,
  onCreate,
  onHostOperation,
  onTrack,
  onPrint,
}: {
  stats: string[][]
  onCreate: () => void
  onHostOperation: () => void
  onTrack: (code: string) => void
  onPrint: (code: string) => void
}) {
  return (
    <>
      <PageHeader
        title="Dashboard operativo"
        subtitle="Indicadores del dia y ultimos envios registrados"
      />
      <section className="stats-grid">
        {stats.map(([label, value, hint]) => (
          <article className="stat-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{hint}</small>
          </article>
        ))}
      </section>
      <section className="demo-flow">
        <div>
          <span className="eyebrow">Flujo sugerido para demo</span>
          <h2>Recorrido corto para defender el modulo</h2>
        </div>
        <ol>
          {['Crear envio', 'Seleccionar Punto Host', 'Confirmar envio', 'Consultar tracking', 'Validar retiro en Punto Host'].map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <div className="button-row">
          <button className="primary" onClick={onCreate} type="button">Iniciar demo</button>
          <button onClick={onHostOperation} type="button">Ir a operacion Host</button>
        </div>
      </section>
      <Section title="Ultimos envios">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Codigo de seguimiento</th>
                <th>Cliente</th>
                <th>Destinatario</th>
                <th>Tipo de servicio</th>
                <th>Modalidad</th>
                <th>Estado actual</th>
                <th>Zona destino</th>
                <th>Fecha estimada</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.code}>
                  <td><strong>{shipment.code}</strong></td>
                  <td>{shipment.client}</td>
                  <td>{shipment.recipient}</td>
                  <td>{shipment.service}</td>
                  <td>{shipment.modality}</td>
                  <td><StatusBadge status={shipment.status} /></td>
                  <td>{shipment.zone}</td>
                  <td>{shipment.estimated}</td>
                  <td>
                    <div className="mini-actions">
                      <button onClick={() => onTrack(shipment.code)} type="button">Ver tracking</button>
                      <button onClick={() => onPrint(shipment.code)} type="button">Imprimir etiqueta</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  )
}

function NewShipment({
  deliveryMode,
  selectedHost,
  tariffCalculated,
  onModeChange,
  onSelectHost,
  onValidateAddress,
  onCalculate,
  onConfirm,
  onQr,
}: {
  deliveryMode: 'domicilio' | 'host'
  selectedHost: HostPoint
  tariffCalculated: boolean
  onModeChange: (mode: 'domicilio' | 'host') => void
  onSelectHost: (host: HostPoint) => void
  onValidateAddress: () => void
  onCalculate: () => void
  onConfirm: () => void
  onQr: () => void
}) {
  return (
    <>
      <PageHeader title="Nuevo envio" subtitle="Alta manual de envio con tarifa simulada y modalidad Host" />
      <div className="form-stack">
        <Section title="1. Datos del cliente/remitente">
          <div className="form-grid">
            <Field label="Tipo de cliente" as="select" options={['Particular', 'Corporativo']} />
            <Field label="Nombre o razon social" defaultValue="Andes Repuestos SRL" />
            <Field label="DNI / CUIT" defaultValue="30-71234567-8" />
            <Field label="Telefono" defaultValue="351-444-2211" />
            <Field label="Email" defaultValue="logistica@andesrepuestos.com" />
            <Field label="Direccion de origen" defaultValue="Bv. Los Alemanes 810" />
            <Field label="Localidad" defaultValue="Cordoba Capital" />
            <Field label="Codigo postal" defaultValue="5000" />
            <Field label="Empresa asociada" defaultValue="Andes Repuestos SRL" />
            <Field label="Convenio activo" defaultValue="Convenio REP-2026" />
            <Field label="Cuenta corriente" defaultValue="Habilitada" />
            <Field label="Descuento aplicado" defaultValue="12%" />
          </div>
        </Section>

        <Section title="2. Datos del destinatario">
          <div className="form-grid">
            <Field label="Nombre" defaultValue="Mariana Costa" />
            <Field label="Telefono" defaultValue="351-610-5519" />
            <Field label="Email" defaultValue="mariana.costa@email.com" />
            <Field label="Direccion de entrega" defaultValue="Obispo Trejo 742" />
            <Field label="Localidad" defaultValue="Cordoba Capital" />
            <Field label="Codigo postal" defaultValue="5000" />
            <Field label="Referencia de domicilio" defaultValue="Local frente a plaza" />
            <Field label="Observaciones de entrega" defaultValue="Entregar por la tarde" />
          </div>
          <button className="secondary" onClick={onValidateAddress} type="button">Validar direccion</button>
        </Section>

        <Section title="3. Datos del paquete">
          <div className="form-grid">
            <Field label="Descripcion del contenido" defaultValue="Kit de repuestos automotor" />
            <Field label="Tipo de envio" as="select" options={['estandar', 'documentacion', 'fragil', 'gran tamano', 'refrigerado']} />
            <Field label="Peso real en kg" defaultValue="3.4" />
            <Field label="Largo en cm" defaultValue="42" />
            <Field label="Ancho en cm" defaultValue="28" />
            <Field label="Alto en cm" defaultValue="18" />
            <Readonly label="Peso volumetrico calculado" value="4.23 kg" />
            <Field label="Valor declarado" defaultValue="$ 85.000" />
            <Field label="Requiere seguro" as="select" options={['Si', 'No']} />
          </div>
        </Section>

        <Section title="4. Servicio">
          <div className="form-grid">
            <Field label="Tipo de servicio" as="select" options={['Estandar', 'Express', 'Mismo dia', 'Mensajeria moto']} />
            <Field label="Prioridad" as="select" options={['Normal', 'Alta', 'Critica']} />
            <Field label="Zona origen" defaultValue="Cordoba Capital" />
            <Field label="Zona destino" defaultValue="Cordoba Capital" />
            <Field label="Fecha estimada de entrega" defaultValue="26/05/2026" />
          </div>
        </Section>

        <Section title="5. Modalidad de entrega">
          <div className="segmented">
            <button className={deliveryMode === 'domicilio' ? 'active' : ''} onClick={() => onModeChange('domicilio')} type="button">
              Entrega a domicilio
            </button>
            <button className={deliveryMode === 'host' ? 'active' : ''} onClick={() => onModeChange('host')} type="button">
              Retiro en Punto Host
            </button>
          </div>
          {deliveryMode === 'host' && (
            <>
              <div className="selected-host-banner">
                <div>
                  <span>Punto Host seleccionado</span>
                  <strong>{selectedHost.name}</strong>
                  <small>{selectedHost.address}, {selectedHost.locality} | {selectedHost.hours}</small>
                </div>
                <StatusBadge status="Disponible en Punto Host" />
              </div>
              <div className="host-picker">
                {hostPoints.map((host) => (
                  <article className={selectedHost.name === host.name ? 'host-card selected' : 'host-card'} key={host.name}>
                    <div className="host-card-header">
                      <h3>{host.name}</h3>
                      {selectedHost.name === host.name && <span className="selected-pill">Seleccionado</span>}
                    </div>
                    <p>{host.address}, {host.locality}</p>
                    <span>{host.hours}</span>
                    <strong>Capacidad disponible: {host.capacity}</strong>
                    <small>{host.services.join(' | ')}</small>
                    <button className={selectedHost.name === host.name ? 'primary' : ''} onClick={() => onSelectHost(host)} type="button">Seleccionar Punto Host</button>
                  </article>
                ))}
              </div>
            </>
          )}
        </Section>

        <Section title="6. Tarifa y pago">
          <div className="rate-panel">
            <Readonly label="Tarifa base" value="$ 2.400" />
            <Readonly label="Precio por peso" value="$ 2.210" />
            <Readonly label="Recargo por seguro" value="$ 850" />
            <Readonly label="Recargo por servicio express" value="$ 1.200" />
            <Readonly label="Descuento corporativo" value="- $ 799" />
            <Readonly label="Total final" value={tariffCalculated ? '$ 5.861' : 'Pendiente de calcular'} highlight />
            <Field label="Medio de pago" as="select" options={['efectivo', 'transferencia', 'tarjeta', 'cuenta corriente corporativa']} />
            <Field label="Estado de pago" as="select" options={['Pendiente', 'Pagado', 'Cuenta corriente']} />
          </div>
          <div className="button-row">
            <button className="secondary" onClick={onCalculate} type="button">Calcular tarifa</button>
            <button className="primary" onClick={onConfirm} type="button">Confirmar envio</button>
            <button onClick={onQr} type="button">Generar etiqueta QR</button>
          </div>
        </Section>
      </div>
    </>
  )
}

function Tracking({
  searched,
  shipment,
  selectedHost,
  onSearch,
  onCopy,
  onLocation,
}: {
  searched: boolean
  shipment: Shipment
  selectedHost: HostPoint
  onSearch: () => void
  onCopy: () => void
  onLocation: () => void
}) {
  const steps = ['Recibido', 'En depósito', 'En tránsito', 'Disponible en Punto Host', 'Entregado']
  const currentStep = 3
  return (
    <>
      <PageHeader title="Tracking" subtitle="Consulta publica y operativa de envios" />
      <Section title="Buscar envio">
        <div className="search-row">
          <input defaultValue="TC-2026-0001" placeholder="Codigo de seguimiento" />
          <button className="primary" onClick={onSearch} type="button">Buscar envio</button>
        </div>
      </Section>

      {searched && (
        <>
          <section className="detail-grid">
            <article className="detail-card">
              <h3>{shipment.code}</h3>
              <StatusBadge status={shipment.status} />
              <dl>
                <dt>Tipo de servicio</dt><dd>{shipment.service}</dd>
                <dt>Fecha de alta</dt><dd>{shipment.createdAt}</dd>
                <dt>Fecha estimada</dt><dd>{shipment.estimated}</dd>
                <dt>Cliente/remitente</dt><dd>{shipment.client}</dd>
                <dt>Destinatario</dt><dd>{shipment.recipient}</dd>
                <dt>Modalidad</dt><dd>{shipment.modality}</dd>
                <dt>Entrega</dt><dd>{shipment.host ?? shipment.destination}</dd>
              </dl>
            </article>
            <article className="detail-card">
              <h3>Linea de tiempo</h3>
              <div className="timeline">
                {steps.map((step, index) => {
                  const stateClass = index < currentStep ? 'done' : index === currentStep ? 'current' : 'pending'
                  return (
                    <div className={stateClass} key={step}>
                      <span>{index < currentStep ? 'OK' : index + 1}</span>
                      <strong>{step}</strong>
                      <small>{index < currentStep ? 'Movimiento registrado' : index === currentStep ? 'Estado actual del envio' : 'Pendiente'}</small>
                    </div>
                  )
                })}
              </div>
            </article>
          </section>
          <section className="host-alert">
            <div>
              <strong>Tu paquete esta disponible para retiro</strong>
              <p>{selectedHost.name} - {selectedHost.address}. Horarios: {selectedHost.hours}</p>
              <span>Codigo de retiro: HOST-8421 | Fecha limite: 31/05/2026</span>
            </div>
            <div className="button-row">
              <button onClick={onCopy} type="button">Copiar codigo</button>
              <button onClick={onLocation} type="button">Ver ubicacion</button>
            </div>
          </section>
        </>
      )}
    </>
  )
}

function CorporatePortal({
  active,
  setActive,
  onAction,
}: {
  active: PortalTab
  setActive: (tab: PortalTab) => void
  onAction: (message: string) => void
}) {
  const tabs: { key: PortalTab; label: string }[] = [
    { key: 'inicio', label: 'Inicio' },
    { key: 'nuevo', label: 'Nuevo envio' },
    { key: 'masiva', label: 'Carga masiva' },
    { key: 'mis-envios', label: 'Mis envios' },
    { key: 'retiro', label: 'Solicitar retiro' },
    { key: 'facturas', label: 'Facturas' },
  ]
  return (
    <>
      <PageHeader title="Portal corporativo" subtitle="Vista simulada para clientes con convenio" />
      <Tabs tabs={tabs} active={active} setActive={setActive} />
      {active === 'inicio' && (
        <section className="stats-grid">
          {[
            ['Envios activos', '74', 'En seguimiento'],
            ['Entregados hoy', '18', 'Con comprobante'],
            ['Pendientes', '11', 'Listos para retiro'],
            ['Con problemas', '3', 'Requieren gestion'],
            ['Retiros solicitados', '4', 'Proximas 24 hs'],
            ['Facturas disponibles', '2', 'Mayo 2026'],
          ].map(([label, value, hint]) => <article className="stat-card compact" key={label}><span>{label}</span><strong>{value}</strong><small>{hint}</small></article>)}
        </section>
      )}
      {active === 'nuevo' && (
        <Section title="Nuevo envio corporativo">
          <div className="form-grid">
            <Field label="Destinatario" defaultValue="Centro Medico Sucre" />
            <Field label="Direccion" defaultValue="Sucre 245" />
            <Field label="Peso" defaultValue="2.2 kg" />
            <Field label="Dimensiones" defaultValue="30 x 22 x 12 cm" />
            <Field label="Servicio" as="select" options={['Estandar', 'Express', 'Mismo dia']} />
            <Field label="Modalidad" as="select" options={['Domicilio', 'Punto Host']} />
          </div>
          <button className="primary" onClick={() => onAction('Envio corporativo simulado creado.')} type="button">Crear envio</button>
        </Section>
      )}
      {active === 'masiva' && (
        <Section title="Carga masiva">
          <div className="upload-box">
            <button onClick={() => onAction('Plantilla CSV/Excel descargada en modo demo.')} type="button">Descargar plantilla CSV/Excel</button>
            <input type="file" />
          </div>
          <SimpleTable
            headers={['Fila', 'Destinatario', 'Direccion', 'Servicio', 'Estado']}
            rows={[
              ['1', 'Ana Torres', 'Belgrano 80', 'Express', 'OK'],
              ['2', 'Lucas Pereyra', 'Sin CP', 'Estandar', 'Error simulado: falta codigo postal'],
            ]}
          />
        </Section>
      )}
      {active === 'mis-envios' && (
        <Section title="Mis envios">
          <div className="filters">
            <Field label="Fecha" defaultValue="25/05/2026" />
            <Field label="Estado" as="select" options={['Todos', 'Recibido', 'En transito', 'Entregado']} />
            <Field label="Destinatario" defaultValue="" />
            <Field label="Codigo" defaultValue="" />
            <Field label="Tipo de servicio" as="select" options={['Todos', 'Estandar', 'Express']} />
            <Field label="Modalidad" as="select" options={['Todas', 'Domicilio', 'Punto Host']} />
          </div>
          <ShipmentsMiniTable />
        </Section>
      )}
      {active === 'retiro' && (
        <Section title="Solicitar retiro">
          <div className="form-grid">
            <Field label="Direccion" defaultValue="Bv. Los Alemanes 810" />
            <Field label="Fecha" defaultValue="26/05/2026" />
            <Field label="Franja horaria" as="select" options={['09:00-12:00', '12:00-15:00', '15:00-18:00']} />
            <Field label="Cantidad de paquetes" defaultValue="18" />
          </div>
          <button className="primary" onClick={() => onAction('Retiro corporativo solicitado.')} type="button">Confirmar solicitud</button>
        </Section>
      )}
      {active === 'facturas' && (
        <Section title="Facturas">
          <SimpleTable headers={['Periodo', 'Numero', 'Fecha', 'Estado', 'Total', 'Accion']} rows={invoices.map((row) => [...row, 'Descargar'])} actionMessage={onAction} />
        </Section>
      )}
    </>
  )
}

function WithdrawalRequests({
  coverage,
  onCoverage,
  onConfirm,
}: {
  coverage: string
  onCoverage: () => void
  onConfirm: () => void
}) {
  return (
    <>
      <PageHeader title="Solicitudes de retiro" subtitle="Agenda de retiros corporativos y validacion de cobertura" />
      <Section title="Nueva solicitud">
        <div className="form-grid">
          <Field label="Cliente corporativo" defaultValue="Andes Repuestos SRL" />
          <Field label="Direccion de retiro" defaultValue="Bv. Los Alemanes 810" />
          <Field label="Localidad" defaultValue="Cordoba Capital" />
          <Field label="Codigo postal" defaultValue="5000" />
          <Readonly label="Zona detectada" value={coverage || 'Pendiente'} />
          <Field label="Fecha solicitada" defaultValue="26/05/2026" />
          <Field label="Franja horaria" as="select" options={['09:00-12:00', '12:00-15:00', '15:00-18:00']} />
          <Field label="Cantidad estimada de paquetes" defaultValue="24" />
          <Field label="Peso total estimado" defaultValue="96 kg" />
          <Field label="Observaciones" defaultValue="Retirar por deposito lateral" />
          <Field label="Contacto en domicilio" defaultValue="Pablo Rios" />
          <Field label="Telefono de contacto" defaultValue="351-500-4412" />
        </div>
        <div className="button-row">
          <button className="secondary" onClick={onCoverage} type="button">Validar cobertura</button>
          <button className="primary" onClick={onConfirm} type="button">Confirmar solicitud</button>
        </div>
      </Section>
      <Section title="Solicitudes existentes">
        <SimpleTable headers={['Codigo', 'Cliente', 'Direccion', 'Estado', 'Fecha', 'Franja']} rows={withdrawalRequests} />
      </Section>
    </>
  )
}

function HostPoints({
  active,
  setActive,
  result,
  onResult,
}: {
  active: HostTab
  setActive: (tab: HostTab) => void
  result: string
  onResult: (message: string) => void
}) {
  const tabs: { key: HostTab; label: string }[] = [
    { key: 'administracion', label: 'Administracion de Hosts' },
    { key: 'puntos', label: 'Puntos fisicos' },
    { key: 'operacion', label: 'Operacion del Host' },
  ]
  return (
    <>
      <PageHeader title="Puntos Host" subtitle="Alta, configuracion y operacion de puntos de retiro" />
      <Tabs tabs={tabs} active={active} setActive={setActive} />
      {active === 'administracion' && (
        <>
          <Section title="Hosts registrados">
            <SimpleTable
              headers={['ID Host', 'Nombre / Razon social', 'Tipo', 'DNI / CUIT', 'Telefono', 'Email', 'Estado', 'Cantidad de puntos', 'Accion']}
              rows={hostAdmins.map((row) => [...row, 'Ver'])}
              actionMessage={() => onResult('Detalle del Host abierto en modo demo.')}
            />
          </Section>
          <Section title="Formulario de alta">
            <div className="form-grid">
              <Field label="Tipo de Host" as="select" options={['Persona', 'Negocio']} />
              <Field label="Nombre" defaultValue="Martin" />
              <Field label="Apellido" defaultValue="Quiroga" />
              <Field label="Razon social" defaultValue="Almacen Centro" />
              <Field label="DNI / CUIT" defaultValue="20-30555999-1" />
              <Field label="Telefono" defaultValue="351-455-8877" />
              <Field label="Email" defaultValue="almacencentro@host.com" />
              <Field label="Direccion principal" defaultValue="9 de Julio 520" />
              <Field label="Localidad" defaultValue="Cordoba Capital" />
              <Field label="Codigo postal" defaultValue="5000" />
              <Field label="Estado inicial" as="select" options={['Pendiente de validacion', 'Aprobado', 'Rechazado', 'Suspendido']} />
            </div>
            <div className="button-row">
              <button className="primary" onClick={() => onResult('Host guardado correctamente.')} type="button">Guardar Host</button>
              <button onClick={() => onResult('Host aprobado y habilitado para crear puntos fisicos.')} type="button">Aprobar Host</button>
              <button onClick={() => onResult('Host rechazado en simulacion.')} type="button">Rechazar Host</button>
            </div>
          </Section>
        </>
      )}
      {active === 'puntos' && (
        <Section title="Configuracion de punto fisico">
          <div className="form-grid">
            <Field label="Host asociado" as="select" options={['Natalia Suarez', 'Autoservicio El Sol', 'Distribuidora Norte']} />
            <Field label="Nombre comercial" defaultValue="Kiosco Nueva Cordoba" />
            <Field label="Direccion del punto" defaultValue="Obispo Trejo 742" />
            <Field label="Localidad" defaultValue="Cordoba Capital" />
            <Field label="Codigo postal" defaultValue="5000" />
            <Field label="Zona" defaultValue="Cordoba Capital" />
            <Field label="Telefono del punto" defaultValue="351-600-9877" />
            <Field label="Referencia de ubicacion" defaultValue="Frente a plaza" />
            <Field label="Estado" as="select" options={['Activo', 'Inactivo']} />
          </div>
          <div className="checkbox-grid">
            <label><input defaultChecked type="checkbox" /> Recibe paquetes para retiro</label>
            <label><input defaultChecked type="checkbox" /> Acepta paquetes para envio</label>
            <label><input defaultChecked type="checkbox" /> Acepta devoluciones</label>
          </div>
          <div className="form-grid">
            <Field label="Capacidad maxima de paquetes" defaultValue="60" />
            <Field label="Cantidad actual de paquetes" defaultValue="18" />
            <Readonly label="Capacidad disponible" value="42" />
            <Field label="Peso maximo por paquete" defaultValue="12 kg" />
            <Field label="Tamano maximo permitido" defaultValue="80 x 60 x 60 cm" />
            <Field label="Dia" as="select" options={['Lunes a viernes', 'Sabado', 'Domingo']} />
            <Field label="Hora de apertura" defaultValue="09:00" />
            <Field label="Hora de cierre" defaultValue="20:00" />
            <Field label="Activo" as="select" options={['Si', 'No']} />
          </div>
          <div className="button-row">
            <button onClick={() => onResult('Horario agregado al punto fisico.')} type="button">Agregar horario</button>
            <button className="primary" onClick={() => onResult('Configuracion del Punto Host guardada.')} type="button">Guardar configuracion</button>
          </div>
        </Section>
      )}
      {active === 'operacion' && (
        <HostOperation result={result} onResult={onResult} />
      )}
    </>
  )
}

function HostOperation({ result, onResult }: { result: string; onResult: (message: string) => void }) {
  return (
    <div className="form-stack">
      <Section title="Escaneo rapido">
        <div className="search-row">
          <input defaultValue="TC-2026-0001 / HOST-8421" />
          <button onClick={() => onResult('Movimiento registrado: Recibido en Host. Estado: Disponible en Punto Host. Codigo de retiro HOST-8421 generado. Destinatario notificado.')} type="button">Recibir paquete</button>
          <button onClick={() => onResult('Codigo usado. Movimiento registrado. Estado: Entregado / Retirado en Host.')} type="button">Validar retiro</button>
          <button onClick={() => onResult('Codigo TC-2026-HOST-014 generado. Estado: Pendiente de recoleccion en Host.')} type="button">Registrar envio</button>
          <button onClick={() => onResult('Devolucion recibida en Punto Host y pendiente de recoleccion.')} type="button">Registrar devolucion</button>
        </div>
        {result && <div className="result-box">{result}</div>}
      </Section>
      <Section title="Validar retiro">
        <div className="form-grid">
          <Field label="Codigo de retiro" defaultValue="HOST-8421" />
          <Field label="Codigo de seguimiento" defaultValue="TC-2026-0001" />
          <Field label="Documento opcional" defaultValue="29.222.111" />
        </div>
        <button className="primary" onClick={() => onResult('Retiro confirmado. Codigo usado y envio entregado en Punto Host.')} type="button">Confirmar retiro</button>
      </Section>
      <Section title="Registrar paquete para envio">
        <div className="form-grid">
          <Field label="Remitente" defaultValue="Carlos Funes" />
          <Field label="Telefono" defaultValue="351-611-2200" />
          <Field label="Email" defaultValue="carlos@email.com" />
          <Field label="Destinatario" defaultValue="Paula Moyano" />
          <Field label="Telefono destinatario" defaultValue="3541-448899" />
          <Field label="Direccion destino" defaultValue="Av. San Martin 820" />
          <Field label="Localidad" defaultValue="Villa Carlos Paz" />
          <Field label="Codigo postal" defaultValue="5152" />
          <Field label="Descripcion" defaultValue="Accesorios electronicos" />
          <Field label="Peso" defaultValue="1.6 kg" />
          <Field label="Dimensiones" defaultValue="25 x 20 x 10 cm" />
          <Field label="Tipo de servicio" as="select" options={['Estandar', 'Express', 'Mensajeria moto']} />
        </div>
        <button className="primary" onClick={() => onResult('Paquete registrado para recoleccion. Codigo TC-2026-HOST-014 generado.')} type="button">Registrar paquete para recoleccion</button>
      </Section>
      <Section title="Registrar devolucion">
        <div className="form-grid">
          <Field label="Codigo de seguimiento original" defaultValue="TC-2026-0008" />
          <Field label="Codigo de devolucion" defaultValue="DEV-0042" />
          <Field label="Motivo" as="select" options={['No retirado', 'Producto rechazado', 'Domicilio incorrecto']} />
          <Field label="Observaciones" defaultValue="Cliente entrega paquete cerrado" />
        </div>
        <button onClick={() => onResult('Devolucion recibida en Punto Host y pendiente de recoleccion.')} type="button">Registrar devolucion</button>
      </Section>
      <Section title="Solicitar recoleccion">
        <SimpleTable headers={['Codigo', 'Tipo', 'Estado', 'Fecha ingreso']} rows={[
          ['TC-2026-HOST-014', 'Envio', 'Pendiente de recoleccion', '25/05/2026'],
          ['DEV-0042', 'Devolucion', 'Pendiente de recoleccion', '25/05/2026'],
        ]} />
        <div className="form-grid">
          <Field label="Fecha sugerida" defaultValue="26/05/2026" />
          <Field label="Franja horaria" as="select" options={['09:00-12:00', '12:00-15:00', '15:00-18:00']} />
          <Field label="Observaciones" defaultValue="Retirar al cierre del comercio" />
        </div>
        <button className="primary" onClick={() => onResult('Recoleccion solicitada para paquetes pendientes del Punto Host.')} type="button">Solicitar recoleccion</button>
      </Section>
      <Section title="Consulta de movimientos">
        <div className="filters">
          <Field label="Punto" as="select" options={hostPoints.map((host) => host.name)} />
          <Field label="Fecha" defaultValue="25/05/2026" />
          <Field label="Estado" as="select" options={['Todos', 'Disponible', 'Retirado', 'Pendiente']} />
          <Field label="Tipo de movimiento" as="select" options={['Todos', 'Recibido en Host', 'Retiro', 'Devolucion']} />
          <Field label="Codigo" defaultValue="" />
        </div>
        <SimpleTable
          headers={['Fecha', 'Codigo', 'Movimiento', 'Estado', 'Responsable', 'Observacion']}
          rows={[
            ['25/05/2026 10:14', 'TC-2026-0001', 'Recibido en Host', 'Disponible', 'Natalia Suarez', 'Notificado'],
            ['25/05/2026 16:40', 'TC-2026-0001', 'Retiro', 'Entregado', 'Natalia Suarez', 'Codigo validado'],
            ['25/05/2026 17:05', 'DEV-0042', 'Devolucion', 'Pendiente', 'Martin Quiroga', 'Esperando recoleccion'],
          ]}
        />
      </Section>
    </div>
  )
}

function RatesAndZones({
  active,
  setActive,
  onAction,
}: {
  active: TarifaTab
  setActive: (tab: TarifaTab) => void
  onAction: (message: string) => void
}) {
  const tabs: { key: TarifaTab; label: string }[] = [
    { key: 'zonas', label: 'Zonas' },
    { key: 'base', label: 'Tarifa base' },
    { key: 'convenios', label: 'Convenios corporativos' },
    { key: 'recargos', label: 'Recargos' },
  ]
  return (
    <>
      <PageHeader title="Tarifas y zonas" subtitle="Matrices comerciales simuladas para calculo de precio" />
      <Tabs tabs={tabs} active={active} setActive={setActive} />
      <div className="button-row toolbar">
        <button onClick={() => onAction('Registro nuevo creado en modo demo.')} type="button">Crear</button>
        <button onClick={() => onAction('Edicion simulada habilitada.')} type="button">Editar</button>
        <button className="primary" onClick={() => onAction('Cambios guardados en memoria del prototipo.')} type="button">Guardar</button>
      </div>
      {active === 'zonas' && <Section title="Zonas"><SimpleTable headers={['Nombre de zona', 'Tipo', 'Localidades', 'Codigos postales', 'Estado']} rows={zones} /></Section>}
      {active === 'base' && <Section title="Tarifa base"><SimpleTable headers={['Zona origen', 'Zona destino', 'Tipo servicio', 'Precio base', 'Precio por kg', 'Escala', 'Vigencia']} rows={tariffBase} /></Section>}
      {active === 'convenios' && <Section title="Convenios corporativos"><SimpleTable headers={['Cliente corporativo', 'Descuento', 'Tarifa fija', 'Volumen minimo', 'Vigencia', 'Estado']} rows={corporateDeals} /></Section>}
      {active === 'recargos' && <Section title="Recargos"><SimpleTable headers={['Tipo', 'Descripcion', 'Monto fijo o porcentaje', 'Condicion de aplicacion']} rows={surcharges} /></Section>}
    </>
  )
}

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">TransCor Logistica</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function Field({
  label,
  defaultValue,
  as,
  options = [],
}: {
  label: string
  defaultValue?: string
  as?: 'select'
  options?: string[]
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {as === 'select' ? (
        <select defaultValue={defaultValue ?? options[0]}>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : (
        <input defaultValue={defaultValue} />
      )}
    </label>
  )
}

function Readonly({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={highlight ? 'readonly highlight' : 'readonly'}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function getStatusClass(status: string) {
  const normalized = status.toLowerCase()
  if (normalized.includes('problema') || normalized.includes('rechazado') || normalized.includes('suspendido') || normalized.includes('error')) {
    return 'danger'
  }
  if (normalized.includes('pendiente') || normalized.includes('validacion') || normalized.includes('asignada') || normalized.includes('proceso')) {
    return 'pending'
  }
  if (normalized.includes('disponible')) {
    return 'host'
  }
  if (normalized.includes('entregado') || normalized.includes('retirada') || normalized.includes('aprobado') || normalized.includes('activo') || normalized === 'ok') {
    return 'success'
  }
  if (normalized.includes('tránsito') || normalized.includes('transito') || normalized.includes('deposito') || normalized.includes('recibido')) {
    return 'info'
  }
  return 'neutral'
}

function isStatusLike(value: string) {
  const normalized = value.toLowerCase()
  return [
    'recibido',
    'tránsito',
    'transito',
    'disponible',
    'entregado',
    'pendiente',
    'problema',
    'aprobado',
    'rechazado',
    'suspendido',
    'asignada',
    'proceso',
    'retirada',
    'cancelada',
    'activo',
    'inactivo',
    'pagada',
    'ok',
    'error',
  ].some((status) => normalized.includes(status))
}

function StatusBadge({ status }: { status: string }) {
  const className = getStatusClass(status)
  return <span className={`status ${className}`}>{status}</span>
}

function Tabs<T extends string>({
  tabs,
  active,
  setActive,
}: {
  tabs: { key: T; label: string }[]
  active: T
  setActive: (tab: T) => void
}) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button className={active === tab.key ? 'active' : ''} key={tab.key} onClick={() => setActive(tab.key)} type="button">
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function SimpleTable({
  headers,
  rows,
  actionMessage,
}: {
  headers: string[]
  rows: string[][]
  actionMessage?: (message: string) => void
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`}>
                  {cellIndex === row.length - 1 && (cell.toLowerCase().includes('descargar') || cell.toLowerCase() === 'ver') ? (
                    <button onClick={() => actionMessage?.('Accion simulada ejecutada correctamente.')} type="button">{cell}</button>
                  ) : isStatusLike(cell) ? (
                    <StatusBadge status={cell} />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ShipmentsMiniTable() {
  return (
    <SimpleTable
      headers={['Codigo', 'Destinatario', 'Servicio', 'Modalidad', 'Estado', 'Fecha estimada']}
      rows={shipments.map((shipment) => [
        shipment.code,
        shipment.recipient,
        shipment.service,
        shipment.modality,
        shipment.status,
        shipment.estimated,
      ])}
    />
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true">
        <button className="close-button" onClick={onClose} type="button">x</button>
        {children}
      </div>
    </div>
  )
}

export default App
