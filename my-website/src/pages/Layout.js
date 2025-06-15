import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="NavBar">
            <Link to="/">
                <img src={"/icons/home.png"} width="50" alt="Home"></img>
            </Link>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;