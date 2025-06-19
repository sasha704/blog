import { useParams } from "react-router-dom";
import {useEffect} from 'react';
import { marked } from 'marked';

const webUrl = 'http://127.0.0.1:8000/'

function Reader(props) {
  console.log(props)
  const {filename, title} = useParams()

  // Only update contents if reading a new file
  useEffect(() => {

     // Add new summaries
     
      fetch(webUrl+'post/'+filename, {method: "GET", mode: "cors"}).then(response => {
        if (response.ok) {
          console.log('post body')
          return response.json();
        }
      }).then(data =>{
        // Remove all existing posts
        let main = document.querySelector("main");
        
        main.innerHTML = marked.parse(data.body);
      })


  }, [filename])

  return <div className="Reader">
      <header className="reader-header">
        <title>House Museum</title>
      <h1>{title}</h1>
      </header>
      <main className="PostReader"></main>
    </div>;
};

export default Reader;