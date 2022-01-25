import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav class="navbar navbar-dark bg-dark navbar-custom">
        <div class="container">
          <a class="navbar-brand" href="/">TACTIC</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent1"
          >
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <Link to="/jobs">All Jobs</Link> <br />
              </li>
              <li class="nav-item">
                <Link to="/jobassets">Job Assets</Link>
              </li>
              <li class="nav-item">
                <Link to="/assets">Assets</Link>
              </li>
   
              <li class="nav-item">
                <Link to="/Test">Test</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      );
}
 
export default Navbar ;