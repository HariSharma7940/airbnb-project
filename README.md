# Airbnb Clone - Router Project

A simple Airbnb-inspired web app built with Node.js, Express, and MongoDB.

## Features
- Browse rental home listings
- View home details
- Add/remove homes from favourites
- Host panel to add, edit, and delete listings

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **View Engine:** EJS
- **Styling:** Tailwind CSS

## Project Structure
Airbnb_Router_Project/
├── app.js
├── routes/
│   ├── storeRouter.js
│   └── hostRouter.js
├── controllers/
│   ├── storeController.js
│   └── hostController.js
├── models/
│   ├── home.js
│   └── favourite.js
├── views/
│   ├── store/
│   └── host/
├── public/
└── utils/

## How to Run

1. Clone the repository
   git clone https://github.com/HariSharma7940/airbnb-project.git

2. Install dependencies
   npm install

3. Start the server
   npm start

4. Open your browser and go to
   http://localhost:3002

## Pages
| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/homes` | All listings |
| `/homes/:id` | Home details |
| `/favourites` | Your favourites |
| `/host/host-home-list` | Host dashboard |
| `/host/add-home` | Add new listing |