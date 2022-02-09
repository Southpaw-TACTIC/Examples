import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-custom">
        <div className="container">
          <a className="navbar-brand" href="/">TACTIC</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent1"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/jobs">All Jobs</Link> <br />
              </li>
              <li className="nav-item">
                <Link to="/jobassets">Job Assets</Link>
              </li>
              <li className="nav-item">
                <Link to="/assets">Assets</Link>
              </li>
   
              <li className="nav-item">
                <Link to="/Test">Test</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      );
}
 
export default Navbar ;