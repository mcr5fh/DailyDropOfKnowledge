# Welcome to Readables

What is this all about?

The aim of Readbles is to create a user friendly way to facilitate the [Spacing Effect](https://en.wikipedia.org/wiki/Spacing_effect) for whatever your reading, listening, or watching. The idea is that if you are able to answer a set of questions over an extended, increasing period of time, that you will effectively remember that knowledge forever. 


Perhaps this can even be applied to [learning foreign languages](https://journals.sagepub.com/doi/abs/10.1111/j.1467-9280.1993.tb00571.x)? 

For some further readings, check out the articles below

https://max2c.com/learning-how-to-learn/

https://www.td.org/insights/spaced-learning-an-approach-to-minimize-the-forgetting-curve

https://quantum.country/qcvc

https://onlinelibrary.wiley.com/doi/abs/10.1207/s15516709cog0000_14


## Dev
See the package specific READMEs for info on running locally and deploying.

## Links
Google Sign on config - https://console.developers.google.com/

## Roadmap
- Look into Medium pay model, users get X articles for free. Article writers get paid for # of views

### Features 
- Subscribe to questions that are asked at an increasing cadence
- Make an "about" page with the readme info about spaced learning (and get more articles)
- Integrate note taking an any way?
- Subscribe your single sign on email to an email
- Some sort of front end/back end integration tests


### Front end small fix ups/features
**High priority**
- Add a delete button (if owner)
- Hook up edit button (hooks are there)
- Create readable: change description to author 
- Make type a drop down 
- Show/Hide the answers to the questions
- Default to hidden , question level show as v2 
- Change date to date added (in months) 
- Change Readable type to icon 

**Medium priority**
- categorize ReadablesList by type (books) 
- My readables and Recently added sections
- Add genres/tags 
- Category level right/wrong 

**Low priority**
- Make this work on Mobile
- Can you pull cover art and link on search 

### Back end
**High priority**
- Create database seed script

**Medium priority**
- Create Dev back end stack

**Low priority**
- Add uuid request id

## Current Bugs
- Order the chapters
- When switching between readablesDetails, the questions from the last readable are rendered for a split second, then the correct readables data shows up 

# Completed features
- Only allow the Readable owner to add questions
