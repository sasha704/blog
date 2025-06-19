import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Summary_type(BaseModel):
    title: str
    date: str
    filename: str

# Load summaries into list
def load_summaries():

    with open('Posts/Meta.json') as json_file:
        SummariesJSON = json.load(json_file)

    posts = SummariesJSON['posts']
    
    summaries = []
    
    for post in posts:
        # Convert summary json to summary_type class, then store in list
        # post = Summary_type(title=posts[post]["title"], date=posts[post]["date"], filename=post)

        summaries.append(post)

    return posts

global summaries
summaries = load_summaries()



############## SERVER THINGS ##################

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "https://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

postFilePath = "../Posts/Body/"

# ***************** SUMMARIES *****************

# Get requested summaries
@app.get("/summaries{start}-{end}")
async def getSummaries(start,end) -> dict:
    return{"summaries": get_summaries(start,end)}

# Return requested summaries as list
def get_summaries(start, end) -> list[dict]:
    global summaries
    
    # Don't return more summaries than exist 
    if int(end) >= len(summaries):
        end = len(summaries) - 1

        print(len(summaries))
    
    start = int(start) - 1

    print(start, end)

    if (end == 0):
        
        return [summaries]
    else:
        return summaries[start:end]

# Get total number of summaries
@app.get("/totalSummaries")
async def getTotalSummaries():
    return{"size": len(summaries)}

# *************** POSTS ********************

@app.get("/post/{postName}")
async def getPostBody(postName) -> dict:

    postMeta = summaries[postName]
    body = getPostBody(postMeta['filename'])

    return {"title": postMeta['title'], "date": postMeta['date'], "body": body}
    

# Return body of post
def getPostBody(post):

    file = open("Posts/Body/"+post+".md")
    body = file.read()
    file.close()

    return body