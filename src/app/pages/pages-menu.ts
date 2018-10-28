import { NbMenuItem } from '@nebular/theme';

export class NbMenuCustomItem extends NbMenuItem {
  type: string;
  children?: NbMenuCustomItem[];
}

export const MENU_ITEMS: NbMenuCustomItem[] = [
  {
    title: 'Inicio',
    icon: 'nb-home',
    link: '/pages/inicio',
    home: true,
    type: 'Estudiante',
  },
  {
    title: 'PANEL DE POSTGRADOS',
    type: 'Estudiante',
    group: true,
  },
  {
    title: 'Programas',
    icon: 'nb-roller-shades',
    link: '/pages/programas',
    type: 'Estudiante',
    children: [
      {
        title: 'Áreas',
        link: '/pages/programas/areas',
        type: 'Estudiante',
      },
      {
        title: 'Mis programas',
        link: '/pages/programas/my-programs',
        type: 'Estudiante',
      },
   ],
  },
  {
    title: 'PANEL DE USUARIO',
    group: true,
    type: 'Estudiante',
  },
  {
    title: 'Mi Perfil',
    icon: 'nb-person',
    link: '/pages/user/my-profile',
    type: 'Estudiante',
  },
];
