import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-custom">
        <div className="container">
          <a className="navbar-brand " href="/">TACTIC | A simple API example</a>
            <button className="nav-button"  >
              <Link className='link' to="/Jobs">Jobs List </Link> 
            </button>
        </div>
      </nav>
    );
}
 
export default Navbar ;