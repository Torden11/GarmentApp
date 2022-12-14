import { NavLink } from "react-router-dom";

function Nav({status}) {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container-fluid">
                            <span className="navbar-brand">Apparel Store</span>
                            <div className="navbar-collapse">
                                <div className="navbar-nav">
                                    {status === 2 || status === 3 || status === 4 ? <NavLink to="/" end className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink> : null}
                                    {status === 3 ? <NavLink to="/garments" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Garments</NavLink> : null}
                                    {status === 3 ? <NavLink to="/orders" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Orders</NavLink> : null}
                                    {status === 2 ? <NavLink to="/cart" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Shopping Cart</NavLink> : null}
                                    {status !== 1 ? <NavLink to="/logout" className="nav-link">Logout</NavLink> : null}
                                    {status === 1 ? <NavLink to="/register" className="nav-link">Register</NavLink> : null}
                                    {status === 1 ? <NavLink to="/login" className="nav-link">Login</NavLink> : null}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Nav;