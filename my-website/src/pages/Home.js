import '../App.css';
import AddBlock from './AddBlock'
import {useEffect, useState} from 'react'

let summariesShown = 5
const webUrl = 'http://127.0.0.1:8000/'

const Home = () => {

  const [summaryMin, setSummaryMin] = useState("1")

  // Update summaries every time the summary page changes
  useEffect(() => {
      console.log('getting summaries')

      // Add new summaries
      fetch(webUrl+'summaries'+summaryMin+'-'+(summaryMin+summariesShown), {method: "GET", mode: "cors"}).then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data =>{
         // Remove all existing summaries
        let main = document.getElementsByTagName("main").item(0);
        let summary = main?.lastElementChild;

        while (summary){
          main.removeChild(summary)
          summary = main.lastElementChild;
        }

        let summaries = data.summaries;
        summaries = summaries[0]

        // Handle list of 1
        if (! (Array.isArray(summaries))) {
          summaries = [summaries]
        }

        summaries.forEach((PostObject) => {
          let post = PostObject[Object.keys(PostObject)[0]]
          let newDiv = document.createElement("div");

          // Date
          let pDate = document.createElement("p");
          const pDateText = document.createTextNode(post.date)
          pDate.className = "SummaryDate"
          pDate.appendChild(pDateText)
          newDiv.appendChild(pDate)

          // Title
          let pTitle = document.createElement("a");
          const pTitleText = document.createTextNode(post.title)
          pTitle.className = "SummaryTitle"
          pTitle.href = "/post/" +Object.keys(PostObject)[0]+"/"+post.title
          pTitle.appendChild(pTitleText)
          newDiv.appendChild(pTitle)
          
          // Parent
          newDiv.className = "Summary"
          main.appendChild(newDiv)
          
        })
        
      })

  }, [summaryMin])

  return (
    <div className="Home">
      <header className="home-header">
        <title>House Museum</title>
        <h1>The House Museum</h1>
      </header>
      <div class="grid">
        <main></main>
        <AddBlock></AddBlock>
      </div>
    </div>
  );
}

export default Home;
