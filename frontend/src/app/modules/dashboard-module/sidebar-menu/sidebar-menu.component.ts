import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})
export class SidebarMenuComponent {
  items: NbMenuItem[] = [
    {
      title: 'Mes Transactions',
      icon: 'repeat',
      link: '/dashboard/transactions',
      expanded: true,
      children: [
        {
          title: 'Liste des transactions',
          icon: 'list',
          link: '/dashboard/transactions/list'
        },
        {
          title: 'Chercher par période',
          icon: 'search',
          link: '/dashboard/transactions/search'
        },
        {
          title: 'Ajouter une transaction',
          icon: 'plus-circle',
          link: '/dashboard/transactions/create'
        }
      ],
    },
    {
      title: 'Les Catégories',
      icon: 'grid',
      link: '/dashboard/categories',
      children: [
        {
          title: 'Liste des catégories',
          icon: 'list',
          link: '/dashboard/categories/list'
        },
        {
          title: 'Ajouter une catégories',
          icon: 'plus-circle',
          link: '/dashboard/categories/create'
        }
      ],
    },
    {
      title: 'Mes Rapports',
      icon: 'pie-chart',
      link: '/dashboard/reports'
    },
    {
      title: 'Mon Budget',
      icon: 'options-2',
      link: '/dashboard/budget'
    },
    {
      title: 'Mes Alertes',
      icon: 'bell',
      link: '/dashboard/alerts'
    },
    {
      title: 'Mon compte',
      icon: 'person-outline',
      children: [
        {
          title: 'Mes Informations',
          icon: 'edit-outline',
          link: '/dashboard/profile'
        },
        {
          title: 'Changer Mot de passe',
          icon: 'lock-outline',
          link: '/dashboard/password'
        }
      ],
    },
  ];
}
