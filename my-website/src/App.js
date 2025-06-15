import './App.css';
import NavBar from './NavBar';
import AddBlock from './AddBlock'
import PostSummary from './PostSummary'
import {useEffect, useState} from 'react'

let summariesShown = 5
const webUrl = 'http://127.0.0.1:8000/'

function App() {

  const [summaryMin, setSummaryMin] = useState("1")

  // Update summaries every time the summary page changes
  useEffect(() => {
      console.log('getting summaries')

      // Remove all existing summaries
      let main = document.querySelector("main");
      let summary = main.lastElementChild;

      while (summary){
        main.removeChild(summary)
        summary = main.lastElementChild;
      }

      // Add new summaries
      fetch(webUrl+'summaries'+summaryMin+'-'+(summaryMin+summariesShown), {method: "GET", mode: "cors"}).then(response => {
        if (response.ok) {
          console.log('data')
          return response.json();
        }
      }).then(data =>{
        console.log(data)
        let summaries = data.summaries;

        summaries.forEach((post) => {
          let newSummary = PostSummary(post.title, post.date);

          main.appendChild(newSummary)
        })
        
      })

  }, [summaryMin])

  return (
    <div className="App">
      <header className="App-header">
        <NavBar></NavBar>
        <title>Alex's Cool Website</title>
        <h1>Alex's Cool Website</h1>
      </header>
      <main></main>
      <AddBlock></AddBlock>
    </div>
  );
}

export default App;
