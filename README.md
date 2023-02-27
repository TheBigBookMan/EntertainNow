# EntertainNow

## Introduction

I built this full-stack application with the intention of learning more about Typescript, GraphQL and JWT user authorization. Full-stack, mobile first entertainment application where users can input entertainment criteria and then view the youtube trailer for what they are interested in. There is also user authentication and using a database to add to favourites. Testing credentials- Username: Gary, Password: 12345678

## Technologies

ReactJS, ExpressJS, NodeJS, Typescript/Javascript, TailwindCSS, Vite, GraphQL/Apollo, MongoDB/Mongoose, Third Party API, JWT, React Packages, Heroku, Netlify and responsive design.

## Deployed URL

https://fascinating-horse-1ffdc9.netlify.app/

## GitHub Repo

https://github.com/TheBigBookMan/EntertainNow

## Functionality

### Initialization

```
npm run dev
```

### User Authentication

The user can create an account with a username and password, this uses JWT authentication and react context for context management. The users details are stored in the database and then retrieved through JWT and stored into the local storage and context.

![](/screenshots/signin.png)

### Search

The search functionality is a criteria of whatever the user wants to search for and then this is sent to the movie third party database API. The API then responds with a list of movie/tv shows based on the selection criteria.

![](/screenshots/search.png)

### Response API

The response from the API is presented in a list with the image of the movie/tv show, title and some basic information.

![](/screenshots/response.png)

### Trailer

The user can click on the image of the movie/tv show they are interested in and then this will open up a smaller component that will call the YouTube API and present the trailer for that title. The user can watch it and then close out of the component.

![](/screenshots/trailer.png)

### Favourites

The user can select to favourite the movie/tv show and this will store in the information into the database and save it into favourites table. The user can then go to the favourites page and be presented with their selected favourites and view the trailer from there and unselect them from the favourites.

![](/screenshots/favourites.png)
