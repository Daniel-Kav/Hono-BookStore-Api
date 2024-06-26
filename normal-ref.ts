import { pgTable, serial, varchar, integer, text, decimal, boolean, timestamp, foreignKey } from 'drizzle-orm';

// Define City Table
export const CityTable = pgTable('city', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull()
});

// Define State Table
export const StateTable = pgTable('state', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    city_id: integer('city_id').references(() => CityTable.id)
});

// Define Address Table
export const AddressTable = pgTable('address', {
    id: serial('id').primaryKey(),
    street_address_1: varchar('street_address_1', { length: 255 }).notNull(),
    street_address_2: varchar('street_address_2', { length: 255 }),
    city_id: integer('city_id').references(() => CityTable.id),
    state_id: integer('state_id').references(() => StateTable.id),
    postal_code: varchar('postal_code', { length: 20 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

// Define Restaurant Table
export const RestaurantTable = pgTable('restaurant', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    address_id: integer('address_id').references(() => AddressTable.id),
    contact_phone: varchar('contact_phone', { length: 20 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

// Define RestaurantOwner Table
export const RestaurantOwnerTable = pgTable('restaurant_owner', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    restaurant_id: integer('restaurant_id').references(() => RestaurantTable.id),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

// Define User Table
export const UserTable = pgTable('user', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    contact_phone: varchar('contact_phone', { length: 20 }).notNull(),
    password_hash: varchar('password_hash', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

// Define Category Table
export const CategoryTable = pgTable('category', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull()
});

// Define MenuItem Table
export const MenuItemTable = pgTable('menu_item', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    restaurant_id: integer('restaurant_id').references(() => RestaurantTable.id),
    category_id: integer('category_id').references(() => CategoryTable.id),
    description: text('description'),
    ingredients: text('ingredients'),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    active: boolean('active').default(true),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

// Define Order Table
export const OrderTable = pgTable('order', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => UserTable.id),
    restaurant_id: integer('restaurant_id').references(() => RestaurantTable.id),
    cart_id: integer('cart_id').references(() => CartTable.id),
    status_id: integer('status_id').references(() => StatusCatalogTable.id),
    delivery_address_id: integer('delivery_address_id').references(() => AddressTable.id),
    total_price: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

// Define OrderMenuItem Table
export const OrderMenuItemTable = pgTable('order_menu_item', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').references(() => OrderTable.id),
    menu_item_id: integer('menu_item_id').references(() => MenuItemTable.id),
    quantity: integer('quantity').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

// Define Cart Table
export const CartTable = pgTable('cart', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => UserTable.id),
    restaurant_id: integer('restaurant_id').references(() => RestaurantTable.id),
    total_price: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

// Define OrderStatus Table
export const OrderStatusTable = pgTable('order_status', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull()
});

// Define OrderDetails Table
export const OrderDetailsTable = pgTable('order_details', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').references(() => OrderTable.id),
    status_id: integer('status_id').references(() => OrderStatusTable.id),
    updated_at: timestamp('updated_at').defaultNow()
});

// Define StatusCatalog Table
export const StatusCatalogTable = pgTable('status_catalog', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull()
});
