import {
  UsersRound,
  UserPlus,
  Milk,
  PackageSearch,
  PackagePlus,
  Notebook,
  NotebookPen,
  BookUser,
  BookPlus,
} from "lucide-react";
import { Roles } from "./roles";

export const Routes = {
  users: "/users",
  userRegister: "/users/register",
  products: "/products",
  productRegister: "/products/register",
  sales: "/sales",
  saleRegister: "/sales/register",
  customers: "/customers",
  customerRegister: "/customers/register",
  login: "/login",
  root: "/",
};
export const routesInfo = {
  [Routes.users]: {
    label: "Usuários",
    role: [Roles.MANAGER],
    icon: (size, color = "primary") => (
      <UsersRound size={size} className={`text-${color}`} />
    ),
  },
  [Routes.userRegister]: {
    label: "Cadatro de usuário",
    role: [Roles.MANAGER],
    icon: (size, color = "primary") => (
      <UserPlus size={size} className={`text-${color}`} />
    ),
  },
  [Routes.products]: {
    label: "Produtos",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: (size, color = "primary") => (
      <PackageSearch size={size} className={`text-${color}`} />
    ),
  },
  [Routes.productRegister]: {
    label: "Cadastro de produto",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: (size, color = "primary") => (
      <PackagePlus size={size} className={`text-${color}`} />
    ),
  },
  [Routes.sales]: {
    label: "Vendas",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: (size, color = "primary") => (
      <Notebook size={size} className={`text-${color}`} />
    ),
  },
  [Routes.saleRegister]: {
    label: "Cadatro de venda",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: (size, color = "primary") => (
      <NotebookPen size={size} className={`text-${color}`} />
    ),
  },
  [Routes.customers]: {
    label: "Clientes",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: (size, color = "primary") => (
      <BookUser size={size} className={`text-${color}`} />
    ),
  },
  [Routes.customerRegister]: {
    label: "Cadatro de cliente",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: (size, color = "primary") => (
      <BookPlus size={size} className={`text-${color}`} />
    ),
  },
};
