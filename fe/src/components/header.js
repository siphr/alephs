import logo from '../data/alephs.png'
//import logo from '../resources/logo.svg';
import '../stylesheets/main.css';
import {onSearch, onBookmark, showBookmarks} from './search_filter'

function Header() {
  return (
    <div className="c_header">
    <header className="app-header" width="100%">
    <table width="100%">
    <tr>
    <td width="20%">
      <img width="50rem" src={logo}/> 
    </td>
    <td width="60%" align="center">
    ALEPHS<br/>
    <sub><i>
    A List of Emergency Pakistani Help Services
    </i></sub>
    </td>
    <td width="20%" align="right">
      <img width="50rem" src={logo} className="flipped-img" /> 
    </td>
    </tr>
    </table>
    </header>
    </div>
  );
}

export default Header;
