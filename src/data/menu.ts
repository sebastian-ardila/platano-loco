export interface MenuItem {
  id: string;
  name: { es: string; en: string };
  ingredients: { es: string; en: string };
  price: number;
  quantity?: string;
  vegetarian?: boolean;
  category: string;
}

export interface MenuCategory {
  id: string;
  name: { es: string; en: string };
  icon: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'platanos',
    name: { es: 'Plátanos', en: 'Plantains' },
    icon: 'ForkKnife',
    items: [
      {
        id: 'p1',
        name: { es: 'Plátano Loco Clásico', en: 'Classic Crazy Plantain' },
        ingredients: {
          es: '🧀 Queso mozzarella, 🥓 Tocineta, 🌽 Maíz dulce, 🫘 Frijol refrito, 🥑 Guacamole',
          en: '🧀 Mozzarella cheese, 🥓 Bacon, 🌽 Sweet corn, 🫘 Refried beans, 🥑 Guacamole',
        },
        price: 18900,
        vegetarian: false,
        category: 'platanos',
      },
      {
        id: 'p2',
        name: { es: 'Plátano Hawaiano', en: 'Hawaiian Plantain' },
        ingredients: {
          es: '🧀 Queso mozzarella, 🍍 Piña caramelizada, 🥓 Tocineta, 🍯 Miel mostaza',
          en: '🧀 Mozzarella cheese, 🍍 Caramelized pineapple, 🥓 Bacon, 🍯 Honey mustard',
        },
        price: 19900,
        vegetarian: false,
        category: 'platanos',
      },
      {
        id: 'p3',
        name: { es: 'Plátano BBQ', en: 'BBQ Plantain' },
        ingredients: {
          es: '🧀 Queso mozzarella, 🐔 Pollo desmechado, 🧅 Cebolla caramelizada, 🫙 Salsa BBQ',
          en: '🧀 Mozzarella cheese, 🐔 Shredded chicken, 🧅 Caramelized onion, 🫙 BBQ sauce',
        },
        price: 20900,
        vegetarian: false,
        category: 'platanos',
      },
      {
        id: 'p4',
        name: { es: 'Plátano Veggie', en: 'Veggie Plantain' },
        ingredients: {
          es: '🧀 Queso mozzarella, 🥑 Guacamole, 🌽 Maíz, 🫘 Frijol, 🍅 Hogao',
          en: '🧀 Mozzarella cheese, 🥑 Guacamole, 🌽 Corn, 🫘 Beans, 🍅 Hogao',
        },
        price: 17900,
        vegetarian: true,
        category: 'platanos',
      },
      {
        id: 'p5',
        name: { es: 'Plátano Ranchero', en: 'Ranch Plantain' },
        ingredients: {
          es: '🧀 Queso mozzarella, 🥩 Carne desmechada, 🫘 Frijol refrito, 🥑 Guacamole, 🍅 Hogao',
          en: '🧀 Mozzarella cheese, 🥩 Shredded beef, 🫘 Refried beans, 🥑 Guacamole, 🍅 Hogao',
        },
        price: 21900,
        vegetarian: false,
        category: 'platanos',
      },
    ],
  },
  {
    id: 'hamburguesas',
    name: { es: 'Hamburguesas', en: 'Burgers' },
    icon: 'Hamburger',
    items: [
      {
        id: 'h1',
        name: { es: 'Hamburguesa Clásica', en: 'Classic Burger' },
        ingredients: {
          es: '🥩 Carne 150g, 🧀 Queso americano, 🥬 Lechuga, 🍅 Tomate, 🧅 Cebolla, 🫙 Salsas de la casa',
          en: '🥩 150g Beef patty, 🧀 American cheese, 🥬 Lettuce, 🍅 Tomato, 🧅 Onion, 🫙 House sauces',
        },
        price: 16900,
        quantity: '150g',
        vegetarian: false,
        category: 'hamburguesas',
      },
      {
        id: 'h2',
        name: { es: 'Hamburguesa Doble Carne', en: 'Double Meat Burger' },
        ingredients: {
          es: '🥩 Doble carne 300g, 🧀 Doble queso, 🥓 Tocineta, 🥬 Lechuga, 🍅 Tomate, 🫙 Salsas de la casa',
          en: '🥩 Double meat 300g, 🧀 Double cheese, 🥓 Bacon, 🥬 Lettuce, 🍅 Tomato, 🫙 House sauces',
        },
        price: 24900,
        quantity: '300g',
        vegetarian: false,
        category: 'hamburguesas',
      },
      {
        id: 'h3',
        name: { es: 'Hamburguesa Pollo', en: 'Chicken Burger' },
        ingredients: {
          es: '🐔 Pechuga apanada, 🧀 Queso americano, 🥬 Lechuga, 🍅 Tomate, 🍯 Miel mostaza',
          en: '🐔 Breaded chicken breast, 🧀 American cheese, 🥬 Lettuce, 🍅 Tomato, 🍯 Honey mustard',
        },
        price: 18900,
        vegetarian: false,
        category: 'hamburguesas',
      },
    ],
  },
  {
    id: 'perros',
    name: { es: 'Perros Calientes', en: 'Hot Dogs' },
    icon: 'Dog',
    items: [
      {
        id: 'd1',
        name: { es: 'Perro Sencillo', en: 'Simple Hot Dog' },
        ingredients: {
          es: '🌭 Salchicha americana, 🧀 Queso mozzarella, 🥔 Papa ripio, 🫙 Salsas de la casa',
          en: '🌭 American sausage, 🧀 Mozzarella cheese, 🥔 Crushed chips, 🫙 House sauces',
        },
        price: 12900,
        vegetarian: false,
        category: 'perros',
      },
      {
        id: 'd2',
        name: { es: 'Perro Loco', en: 'Crazy Hot Dog' },
        ingredients: {
          es: '🌭 Salchicha americana, 🧀 Queso mozzarella, 🥓 Tocineta, 🌽 Maíz, 🥔 Papa ripio, 🫙 Salsas de la casa',
          en: '🌭 American sausage, 🧀 Mozzarella cheese, 🥓 Bacon, 🌽 Corn, 🥔 Crushed chips, 🫙 House sauces',
        },
        price: 15900,
        vegetarian: false,
        category: 'perros',
      },
    ],
  },
  {
    id: 'empanadas',
    name: { es: 'Empanadas', en: 'Empanadas' },
    icon: 'CookingPot',
    items: [
      {
        id: 'e1',
        name: { es: 'Empanada de Carne', en: 'Beef Empanada' },
        ingredients: {
          es: '🥩 Carne molida sazonada, 🥔 Papa criolla, 🧅 Hogao',
          en: '🥩 Seasoned ground beef, 🥔 Creole potato, 🧅 Hogao',
        },
        price: 3500,
        vegetarian: false,
        category: 'empanadas',
      },
      {
        id: 'e2',
        name: { es: 'Empanada de Pollo', en: 'Chicken Empanada' },
        ingredients: {
          es: '🐔 Pollo desmechado, 🥔 Papa criolla, 🧅 Hogao',
          en: '🐔 Shredded chicken, 🥔 Creole potato, 🧅 Hogao',
        },
        price: 3500,
        vegetarian: false,
        category: 'empanadas',
      },
      {
        id: 'e3',
        name: { es: 'Empanada de Queso', en: 'Cheese Empanada' },
        ingredients: {
          es: '🧀 Queso mozzarella, 🧀 Queso doble crema',
          en: '🧀 Mozzarella cheese, 🧀 Double cream cheese',
        },
        price: 3500,
        vegetarian: true,
        category: 'empanadas',
      },
    ],
  },
  {
    id: 'bebidas',
    name: { es: 'Bebidas', en: 'Drinks' },
    icon: 'Beer',
    items: [
      {
        id: 'b1',
        name: { es: 'Limonada Natural', en: 'Natural Lemonade' },
        ingredients: {
          es: '🍋 Limón fresco, 💧 Agua, 🍬 Azúcar',
          en: '🍋 Fresh lemon, 💧 Water, 🍬 Sugar',
        },
        price: 5900,
        quantity: '400ml',
        vegetarian: true,
        category: 'bebidas',
      },
      {
        id: 'b2',
        name: { es: 'Limonada de Coco', en: 'Coconut Lemonade' },
        ingredients: {
          es: '🍋 Limón fresco, 🥥 Crema de coco, 🍬 Azúcar',
          en: '🍋 Fresh lemon, 🥥 Coconut cream, 🍬 Sugar',
        },
        price: 7900,
        quantity: '400ml',
        vegetarian: true,
        category: 'bebidas',
      },
      {
        id: 'b3',
        name: { es: 'Gaseosa', en: 'Soda' },
        ingredients: {
          es: '🥤 350ml',
          en: '🥤 350ml',
        },
        price: 4500,
        quantity: '350ml',
        vegetarian: true,
        category: 'bebidas',
      },
      {
        id: 'b4',
        name: { es: 'Agua', en: 'Water' },
        ingredients: {
          es: '💧 600ml',
          en: '💧 600ml',
        },
        price: 3500,
        quantity: '600ml',
        vegetarian: true,
        category: 'bebidas',
      },
    ],
  },
  {
    id: 'adicionales',
    name: { es: 'Adicionales', en: 'Extras' },
    icon: 'Plus',
    items: [
      {
        id: 'a1',
        name: { es: 'Porción de Queso Extra', en: 'Extra Cheese Portion' },
        ingredients: {
          es: '🧀 Queso mozzarella',
          en: '🧀 Mozzarella cheese',
        },
        price: 3000,
        vegetarian: true,
        category: 'adicionales',
      },
      {
        id: 'a2',
        name: { es: 'Porción de Tocineta', en: 'Bacon Portion' },
        ingredients: {
          es: '🥓 Tocineta crocante',
          en: '🥓 Crispy bacon',
        },
        price: 4000,
        vegetarian: false,
        category: 'adicionales',
      },
      {
        id: 'a3',
        name: { es: 'Guacamole Extra', en: 'Extra Guacamole' },
        ingredients: {
          es: '🥑 Guacamole fresco',
          en: '🥑 Fresh guacamole',
        },
        price: 3500,
        vegetarian: true,
        category: 'adicionales',
      },
    ],
  },
];

export const getVegetarianItems = (): MenuItem[] => {
  const items: MenuItem[] = [];
  menuCategories.forEach((cat) => {
    cat.items.forEach((item) => {
      if (item.vegetarian) {
        items.push(item);
      }
    });
  });
  return items;
};

export const allCategoriesWithVegetarian = (): MenuCategory[] => {
  const vegItems = getVegetarianItems();
  return [
    ...menuCategories,
    {
      id: 'vegetariano',
      name: { es: 'Vegetariano', en: 'Vegetarian' },
      icon: 'Leaf',
      items: vegItems,
    },
  ];
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
};
