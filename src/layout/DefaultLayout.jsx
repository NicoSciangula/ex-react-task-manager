import { NavLink, Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <>
      <header className="bg-dark text-center d-flex justify-content-around align-items-center p-2">
        <h1 className="main-title">Task manager</h1>
        <nav className="main-nav">
          <NavLink className="nav-link-custom" to="/">
            Lista Task
          </NavLink>
          <NavLink className="nav-link-custom" to="/add_task">
            Aggiungi Task
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
