import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import JobCardList from "../pages/Home/AddJobCard/JobCardList";
import AddEmployee from "../pages/Home/Employee/AddEmployee";
import ViewInvoice from "../pages/Home/Invoice/ViewInvoice";
import Detail from "../pages/Home/Invoice/Detail";
import UpdateInvoice from "../pages/Home/Invoice/UpdateInvoice";
import Invoice from "../pages/Home/Invoice/Invoice";
import AddRole from "../pages/Home/Role/AddRole";
import Role from "../pages/Home/Role/Role";
import UpdateCustomer from "../pages/Home/Customer/UpdateCustomer";
import AddExpense from "../pages/Home/Expense/AddExpense";
import Expense from "../pages/Home/Expense/Expense";
import AddCustomer from "../pages/Home/Customer/AddCustomer";
import Product from "../pages/Home/Products/Product";
import AddProduct from "../pages/Home/Products/AddProduct";
import Profile from "../pages/Home/Profile/Profile";
import UpdateJobCard from "../pages/Home/AddJobCard/UpdateJobCard";
import AddJobCard from "../pages/Home/AddJobCard/AddJobCard";
import Services from "../pages/Home/Services";
import PreviewJobCard from "../pages/Home/AddJobCard/PreviewJobCard/PreviewJobCard";
import UpdateProduct from "../pages/Home/Products/UpdateProduct";
import UpdateRole from "../pages/Home/Role/UpdateRole";
import Login from "../pages/Login/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import MoneyReceived from "../pages/Home/MoneyReceived/MoneyReceived";
import MoneyReceiptList from "../pages/Home/MoneyReceived/MoneyReceiptList";
import MoneyReceiptView from "../pages/Home/MoneyReceived/MoneyReceiptView";
import UpdateMoneyReceipt from "../pages/Home/MoneyReceived/UpdateMoneyReceipt";
import AddQuotation from "../pages/Home/Quotation/AddQuotation";
import QuotationView from "../pages/Home/Quotation/QuotationView";
import QuotationList from "../pages/Home/Quotation/QuotationList";
import UpdateQuotation from "../pages/Home/Quotation/UpdateQuotation";
import CustomerList from "../pages/Home/Customer/CustomerList";
import CustomerProfile from "../pages/Home/Customer/CustomerProfile";
import EmployeeList from "../pages/Home/Employee/EmployeeList";
import UpdateEmployee from "../pages/Home/Employee/UpdateEmployee";
import EmployeeProfile from "../pages/Home/Employee/EmployeeProfile";
import AddSuppliers from "../pages/Home/Suppliers/AddSuppliers";
import SupplierList from "../pages/Home/Suppliers/SupplierList";
import UpdateSupplier from "../pages/Home/Suppliers/UpdateSupplier";
import SupplierProfile from "../pages/Home/Suppliers/SupplierProfile";
import PurchaseList from "../pages/Home/Parchase/PurchaseList";
import AddPurchase from "../pages/Home/Parchase/AddPurchase";
import UpdatePurchase from "../pages/Home/Parchase/UpdatePurchase";
import CompanyList from "../pages/Home/Company/CompanyList";
import AddCompany from "../pages/Home/Company/AddCompany";
import CompanyProfile from "../pages/Home/Company/CompanyProfile";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Login></Login>
      }
    ]

  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Home/>,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "addjob",
        element: <AddJobCard />,
      },
      {
        path: "preview",
        element: <PreviewJobCard />
      },
      {
        path: "update-jobcard",
        element: <UpdateJobCard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },

      {
        path: "product",
        element: <Product />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "update-product",
        element: <UpdateProduct />,
      },
      {
        path: "update-product",
        element: <UpdateProduct />,
      },
      {
        path: "customer-list",
        element: <CustomerList />,
      },
      {
        path: "update-customer",
        element: <UpdateCustomer />,
      },
      {
        path: "add-customer",
        element: <AddCustomer />,
      },
      {
        path: "customer-profile",
        element: <CustomerProfile/>,
      },
      {
        path: "company-profile",
        element: <CompanyProfile/>,
      },
      {
        path: "add-company",
        element: <AddCompany/>,
      },
      {
        path: "company-list",
        element: <CompanyList/>,
      },
      {
        path: "expense",
        element: <Expense />,
      },
      {
        path: "add-expense",
        element: <AddExpense />,
      },
      {
        path: "add-employee",
        element: <AddEmployee />,
      },
      {
        path: "employee-list",
        element: <EmployeeList />,

      },
      {
        path: "update-employee",
        element: <UpdateEmployee />,

      },
      {
        path: "employee-profile",
        element: <EmployeeProfile/>

      },
      {
        path: "add-supplier",
        element: <AddSuppliers/>
      },
      {
        path: "supplier-list",
        element: <SupplierList/>
      },
      {
        path: "supplier-profile",
        element: <SupplierProfile/>
      },
      {
        path: "update-supplier",
        element: <UpdateSupplier/>
      },
      {
        path: "purchase-list",
        element: <PurchaseList/>
      },
      {
        path: "add-purchase",
        element: <AddPurchase/>
      },
      {
        path: "update-purchase",
        element: <UpdatePurchase/>
      },
      {
        path: "role",
        element: <Role />,
      },
      {
        path: "add-role",
        element: <AddRole />,
      },
      {
        path: "update-role",
        element: <UpdateRole />,
      },
      {
        path: "qutation",
        element: <AddQuotation/>,
      },
      {
        path: "update-quotation",
        element: <UpdateQuotation/>,
      },
      {
        path: "quotation-view",
        element: <QuotationView/>,
      },
      {
        path: "quotaiton-list",
        element: <QuotationList />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "update-invoice",
        element: <UpdateInvoice />,
      },
      {
        path: "detail",
        element: <Detail />,
      },
      {
        path: "invoice-view",
        element: <ViewInvoice />,
      },
     
      {
        path: "jobcard-list",
        element: <JobCardList />,
      },
      {
        path: "money-receive",
        element: <MoneyReceived/>,
      },
      {
        path: "money-receipt-list",
        element: <MoneyReceiptList/>,
      },
      {
        path: "money-receipt-view",
        element: <MoneyReceiptView/>,
      },
      {
        path: "money-receipt-update",
        element: <UpdateMoneyReceipt/>,
      },
    
    ],
  },
]);
