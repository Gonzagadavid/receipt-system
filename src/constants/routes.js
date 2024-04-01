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
};
export const routesInfo = {
  [Routes.users]: {
    label: "Usuários",
    role: [Roles.MANAGER],
    icon: <UsersRound size={100} />,
  },
  [Routes.userRegister]: {
    label: "Cadatro de usuário",
    role: [Roles.MANAGER],
    icon: <UserPlus size={100} />,
  },
  [Routes.products]: {
    label: "Produtos",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: <PackageSearch size={100} />,
  },
  [Routes.productRegister]: {
    label: "Cadastro de produto",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: <PackagePlus size={100} />,
  },
  [Routes.sales]: {
    label: "Vendas",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: <Notebook size={100} />,
  },
  [Routes.saleRegister]: {
    label: "Cadatro de venda",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: <NotebookPen size={100} />,
  },
  [Routes.customers]: {
    label: "Clientes",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: <BookUser size={100} />,
  },
  [Routes.customerRegister]: {
    label: "Cadatro de cliente",
    role: [Roles.EMPLOYER, Roles.MANAGER],
    icon: <BookPlus size={100} />,
  },
};
