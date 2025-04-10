export interface MenuItem {
  id: string
  name: string
  icon?: string
  route?: string
  children?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    id: '000001',
    name: 'menus.trigger',
    icon: 'clock',
    route: '/trigger/list',
  },
  {
    id: '000002',
    name: 'menus.flow',
    icon: 'calendar-days',
    route: '/flow/list',
  },
  {
    id: '000003',
    name: 'menus.execution',
    icon: 'history',
    route: '/flow/edit',
  },
  {
    id: '000004',
    name: 'menus.apps',
    icon: 'app',
    route: '/app/list',
  },
]
