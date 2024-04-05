import { Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../page/HomePage";
import SingleNews from "../page/SingleNews";
import CreateNews from "../page/CreateNews";
import EditNews from "../page/EditNews";
import Registration from "../components/RegistrationForm";
import Login from "../page/Login";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="registartion" element={<Registration />} />
      <Route path=":id" element={<SingleNews />} />
      <Route path=":id/edit" element={<EditNews />} />
      <Route path="new" element={<CreateNews />} />
    </Route>
  )
);

	export default router