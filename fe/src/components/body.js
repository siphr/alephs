import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../stylesheets/main.css'; 
import '../stylesheets/body.css'; 
import {useEffect, useState} from 'react';
import {onBookmark} from './search_filter';
//import data from '../data/institutions.json'
import '../stylesheets/body.css';

toast.configure();


function Body() {
  //const srvr = "0.0.0.0";
  const srvr = "api-alephs";
  const port = "";//"8002";
  const cmd = window.location.pathname.split('/')[1];
  const [data, setData] = useState();

  const getInstitutes = async () => {
    const base_url = "https://" + srvr + ".techtum.dev" + port + "/institutions";
    let fetch_url = base_url;

    if (cmd) {
      switch(cmd) {
        case "bookmarks":
          fetch_url = fetch_url + "/bookmarks/" + search_term;
          break;
        case "search":
          const search_term = window.location.pathname.split('/')[2];
          if (search_term) {
            fetch_url = fetch_url + "/search/" + search_term;
          }
      }
    }
    else {
      /*
      let count_url = fetch_url + "/count";
      console.log(count_url);
      const res = await fetch(count_url);
      let count = await res.json();
      count = Number(count.res);
      console.log(count);
      */

      const summary_url = base_url + "/";
      const rq = await fetch(summary_url);
      const list = await rq.json();
      const lst = list.res;

      //console.log(list);
      let insts = [];
      for (let idx in list.institutions) {
        const list_item = list.institutions[idx];
        /*fetch_url = base_url + "/" + list_item.id;
        console.log(fetch_url);
        const res = await fetch(fetch_url);
        const inst = await res.json();
        console.log(inst);*/
        //insts.push(inst.res[0]);
        insts.push(list_item);
      }

      //console.log(insts);
      return setData(insts);
    }

    //console.log(fetch_url);
    const res = await fetch(fetch_url);
    const data = await res.json();
    return setData(data.res);
  };

  useEffect(() => {
    getInstitutes();
  }, []);

  function renderInstitute(item) {
    //console.log(item.name);
 
    var el =
      <div className="container" key={item.name}>
        <div className="left" key="left">
          <b><u>{item.name}</u></b>
          <br/>{item.description}
          <br/><span className="details" key="place"><span className="material-icons">place</span>{item.coverage}</span>
          <br/><span className="details" key="tag"><span className="material-icons">sell</span>{item.category}</span>
        </div>
        <div className="right" key="right">
          <br/><a title="Call" href={"tel:"+item.number}><span className="material-icons">call</span></a>
          <br/>{item.email ?
            <a title='Mail' href={"mailto:"+item.email}><span className="material-icons">email</span></a> : ''}
          <br/>{item.website ?
              <a title="Website" href={"https://"+item.website} target="_blank"><span className="material-icons">link</span></a> : ''}
        <br/>&nbsp;
        </div>
      </div>
    return (el);
  }

  var formatted = '';

  if (data) {
    //console.log(data);
    formatted = data.map(renderInstitute);
  }

  /*
  console.log(data);
  if (data != undefined && data.res != undefined) {
    console.log('rendering institute');
    formatted = data.map(renderInstitute);
  }
  */

  //if (formatted) {console.log(formatted);}

  return (
    <div className="c_body">
    <>
    {formatted}
    </>
    </div>
  );
}

export default Body;
