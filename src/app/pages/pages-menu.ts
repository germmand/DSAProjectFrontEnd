import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'nb-home',
    link: '/pages/inicio',
    home: true,
  },
  {
    title: 'PANEL DE POSTGRADOS',
    group: true,
  },
  {
    title: 'Programas',
    icon: 'nb-roller-shades',
    link: '/pages/programas',
    children: [
      {
       title: 'Áreas',
       link: '/pages/programas/areas',
      },
      {
        title: 'Mis programas',
        link: '/pages/programas/my-programs',
      },
   ],
  },
  {
    title: 'PANEL DE USUARIO',
    group: true,
  },
  {
    title: 'Mi Perfil',
    icon: 'nb-person',
    link: '/',
  },
];
