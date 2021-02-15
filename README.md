#  GoblinHood

[View Live Site Here](http://goblinhood.herokuapp.com/#/)

## About
GoblinHood is a clone of the popular commision-free trading app, RobinHood. I choose to make a clone of RobinHood because I use it on the daily combined with my background in Finance. 

## Technologies 
  * Frontend: React, Redux
  * Backend: Ruby on Rails, PostgreSQL
  * Data Visualization: Recharts Library
  * Styling: CSS and HTML5
  * APIs
    * Financial Data: IEX Trading API 
    * News Data: IEX TRading API (NEWS)
    
## Features 
  *User Authentication 
  
   I used the Ruby BCrypt gem, a hash algorithm to safely encrypt the user's password when logging on and making a new account. I also provided a demo user account    for users to try the app before joining.  
   
  *Search Bar
  
  The search bar allows users to search for companies by either the company name or ticker. The user's input queries the database and returns the closest matches.
  
  *Data Visualization 
  
  I combined the real world data on stocks provided by IEX Trading API and Recharts library to reflect stock performance for various timeframes. The challenged I
  faced while working on this was hitting the API call quota on IEX. I tackled this challenge by limiting the the number of requests my application made to IEX     for its data. Instead the request would be for five years worth of data. My functions would iterate through the data and extract slices of the data based on  
  the timeframes which would be saved onto the state and would render based on user's timeframe input.
  
  *Real World News
  
  I intergrated real world news also using IEX Trading API. Users would be able to see the top news that affected the market or specifically the viewed stock 
  
  
