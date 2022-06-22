import '../stylesheets/main.css';
import {useEffect} from "react";

import Header from './header';
import Body from './body';

function Main (props) {
  const hdr = Header();
  const bdy= Body();

  useEffect(() => {
     document.title = "ALEPHS";
  }, []);

  return (
    <>
      {hdr}
      {bdy}
    </>
  );
}

export default Main;
