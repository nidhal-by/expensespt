// default-objects.provider.ts
import { Provider } from '@nestjs/common';
import { Category } from '../../schemas/category.schema';

export const defaultCategoriesProvider: Provider = {
  provide: 'DEFAULT_CATEGORIES',
  useFactory: () => {
    // Return the default user object
    return [
      {
        id: 'HEALTH_CATEGORY',
        name: 'Santé',
        icon: 'heart',
        color: '#FF204E',
        default: true,
      },
      {
        id: 'SALARY_CATEGORY',
        name: 'Salaire',
        icon: 'payments',
        color: '#008504',
        default: true,
      },
      {
        id: 'LEISURE_CATEGORY',
        name: 'Loisir',
        icon: 'diversity',
        color: '#9FBB73',
        default: true,
      },
      {
        id: 'HOUSE_CATEGORY',
        name: 'Maison',
        icon: 'house',
        color: '#86A3B8',
        default: true,
      },
      {
        id: 'COFFEE_CATEGORY',
        name: 'Café',
        icon: 'cafe',
        color: '#9F8772',
        default: true,
      },
      {
        id: 'RESTAURANT_CATEGORY',
        name: 'Restaurant',
        icon: 'restaurant',
        color: '#FFDE00',
        default: true,
      },
      {
        id: 'EDUCATION_CATEGORY',
        name: 'Éducation',
        icon: 'school',
        color: '#FF577F',
        default: true,
      },
      {
        id: 'GIFTS_CATEGORY',
        name: 'Cadeau',
        icon: 'gift',
        color: '#9FC088',
        default: true,
      },
      {
        id: 'FAMILY_CATEGORY',
        name: 'Famille',
        icon: 'family',
        color: '#EA5C2B',
        default: true,
      },
      {
        id: 'TRAINING_CATEGORY',
        name: 'Entrainement',
        icon: 'exercise',
        color: '#2B580C',
        default: true,
      },
      {
        id: 'TRANSPORT_CATEGORY',
        name: 'Transport',
        icon: 'bus',
        color: '#378CE7',
        default: true,
      },
    ] as Category[];
  },
};
