export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard_group',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard_main',
        title: 'Panel Principal',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'modules_group',
    title: 'Módulos',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'ia_config',
        title: 'Configuración de IA',
        type: 'collapse',
        icon: 'ti ti-settings',
        children: [
          {
            id: 'ia_parametros',
            title: 'Gestión de Parámetros',
            type: 'item',
            url: '/Config_IA',
            target: false,
            breadcrumbs: false
          }
        ]
      },
     {
  id: 'alertas_reportes',
  title: 'Alertas y Reportes',
  type: 'collapse',
  icon: 'ti ti-bell',
  children: [
    {
      id: 'crear_alerta',
      title: 'Crear Alerta',
      type: 'item',
      url: '/Alert',
      target: false,
      breadcrumbs: false
    },
    {
      id: 'historial_alertas',
      title: 'Historial de Alertas',
      type: 'item',
      url: '/Alert_List',
      target: false,
      breadcrumbs: false
    }
  ]
},

      {
        id: 'gestion_usuarios',
        title: 'Gestión de Usuarios',
        type: 'collapse',
        icon: 'ti ti-users',
        children: [
          {
            id: 'registrar_usuario',
            title: 'Registrar Usuario',
            type: 'item',
            url: '/RegisterUser',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'usuarios_registrados',
            title: 'Usuarios Registrados',
            type: 'item',
            url: '/ListUser', // Asegúrate de que esta ruta sea válida en tu app
            target: false,
            breadcrumbs: false
          }
        ]
      }
    ]
  }
];

// {
//   id: 'alertas_reportes',
//   title: 'Alertas y Reportes',
//   type: 'collapse',
//   icon: 'ti ti-bell',
//   children: [
//     {
//       id: 'crear_alerta',
//       title: 'Crear Alerta',
//       type: 'item',
//       url: '/Alert',
//       target: false,
//       breadcrumbs: false
//     },
//     {
//       id: 'historial_alertas',
//       title: 'Historial de Alertas',
//       type: 'item',
//       url: '/Alert_List',
//       target: false,
//       breadcrumbs: false
//     }
//   ]
// }
