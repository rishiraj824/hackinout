## Inspiration 

Ever been busy in a meeting or on a vacation and your server crashed causing you a huge loss of User Activity? Well, we thought it would be a huge loss too and this is why we came up with an intelligent bot which could cover up for all your losses. 

## What it does

Status 200 is available as an app as well as a web-based chatbot, which notifies you about your server crashes, tells you the active droplets on your Digital Ocean account, pulls the latest commits from your GitHub repository to your server, if any, tells you about your droplet status, tells you your account usage. You can create servers up to a certain limit. 

## How we built it

We use Digital Ocean APIs to get server details and Github APIs for repository and project details. We used Natual Language Processing over NLTK and FuzzyWuzzy Python libraries to capture keywords and make the bot understand the different type of user queries and responses. Thus this makes the bot very intelligent and handy.

## Challenges we ran into

We were limited to Digital Ocean Droplets and of course we didn't have enough time to sleep, but overall it was fun.


## Accomplishments that we're proud of

We implemented so many clients and APIs in a very limited time. This is achieved with a clean and scalable UI responsive for all phones and browsers.

## What we learned

We came to know about fuzzywuzzy NLP algorithms and implemented the extensive APIs of Digital Ocean.

## What's next for Status 200

Now that we have implemented this, it could be next intelligent bot for all the DevOps related operations for your company.
