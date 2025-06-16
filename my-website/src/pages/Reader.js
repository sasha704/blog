import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'

const webUrl = 'http://127.0.0.1:8000/'

function Reader(props) {
  console.log(props)
  const {filename} = useParams()

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
        let post = main.lastElementChild;

        while (post){
          main.removeChild(post)
          post = main.lastElementChild;
        }

        console.log(data)
        
        // Date
        let pPost = document.createElement("p");
        pPost.className ="PostReader"
        let postBodyText = document.createTextNode(data.body)
        pPost.appendChild(postBodyText)
        main.appendChild(pPost)
      })


  }, [filename])

  return <div className="Reader">
      <header className="reader-header">
        <title>Alex's Cool Website</title>
        <h1>Alex's Cool Website</h1>
      </header>
      <main className="PostReader"></main>
    </div>;
};

export default Reader;