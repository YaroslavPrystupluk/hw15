import {FC} from "react"
import { Outlet } from "react-router-dom";

import Header from "../Header/"

const Layout: FC = () => {

  return (
    <>
      <Header />
      <div style={{maxWidth: "1200px", margin: "0 auto"}}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout
