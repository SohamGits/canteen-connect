import { MenuItem } from '@/types/canteen';

import breakfastCombo from '@/assets/breakfast-combo.jpg';
import avocadoToast from '@/assets/avocado-toast.jpg';
import chickenWrap from '@/assets/chicken-wrap.jpg';
import buddhaBowl from '@/assets/buddha-bowl.jpg';
import burger from '@/assets/burger.jpg';
import fries from '@/assets/fries.jpg';
import nachos from '@/assets/nachos.jpg';
import fruitCup from '@/assets/fruit-cup.jpg';
import icedCoffee from '@/assets/iced-coffee.jpg';
import orangeJuice from '@/assets/orange-juice.jpg';
import berrySmoothie from '@/assets/berry-smoothie.jpg';
import matchaLatte from '@/assets/matcha-latte.jpg';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Breakfast Combo',
    description: 'Scrambled eggs, crispy bacon, toast, and hash browns',
    price: 8.99,
    category: 'breakfast',
    image: breakfastCombo,
    available: true,
    prepTime: 10,
  },
  {
    id: '2',
    name: 'Avocado Toast',
    description: 'Smashed avocado on sourdough with cherry tomatoes and feta',
    price: 7.49,
    category: 'breakfast',
    image: avocadoToast,
    available: true,
    prepTime: 8,
  },
  {
    id: '3',
    name: 'Grilled Chicken Wrap',
    description: 'Tender chicken, fresh veggies, and tangy sauce in a warm tortilla',
    price: 9.99,
    category: 'lunch',
    image: chickenWrap,
    available: true,
    prepTime: 12,
  },
  {
    id: '4',
    name: 'Veggie Buddha Bowl',
    description: 'Quinoa, roasted vegetables, chickpeas, and tahini dressing',
    price: 10.49,
    category: 'lunch',
    image: buddhaBowl,
    available: true,
    prepTime: 15,
  },
  {
    id: '5',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce',
    price: 11.99,
    category: 'lunch',
    image: burger,
    available: true,
    prepTime: 15,
  },
  {
    id: '6',
    name: 'Crispy Fries',
    description: 'Golden crispy fries with a side of ketchup',
    price: 3.99,
    category: 'snacks',
    image: fries,
    available: true,
    prepTime: 5,
  },
  {
    id: '7',
    name: 'Nachos Supreme',
    description: 'Loaded nachos with cheese, jalapeños, sour cream, and salsa',
    price: 6.99,
    category: 'snacks',
    image: nachos,
    available: true,
    prepTime: 8,
  },
  {
    id: '8',
    name: 'Fresh Fruit Cup',
    description: 'Seasonal fresh fruits with a drizzle of honey',
    price: 4.49,
    category: 'snacks',
    image: fruitCup,
    available: true,
    prepTime: 3,
  },
  {
    id: '9',
    name: 'Iced Coffee',
    description: 'Cold brewed coffee served over ice with your choice of milk',
    price: 4.29,
    category: 'beverages',
    image: icedCoffee,
    available: true,
    prepTime: 2,
  },
  {
    id: '10',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice, no added sugar',
    price: 3.99,
    category: 'beverages',
    image: orangeJuice,
    available: true,
    prepTime: 3,
  },
  {
    id: '11',
    name: 'Berry Smoothie',
    description: 'Blended mixed berries with yogurt and honey',
    price: 5.49,
    category: 'beverages',
    image: berrySmoothie,
    available: true,
    prepTime: 4,
  },
  {
    id: '12',
    name: 'Green Tea Latte',
    description: 'Matcha green tea with steamed milk and a touch of vanilla',
    price: 4.99,
    category: 'beverages',
    image: matchaLatte,
    available: false,
    prepTime: 4,
  },
];
