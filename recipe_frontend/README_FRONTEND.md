# Recipe Hub Frontend

Modern, minimalistic React frontend for Recipe Hub.

Features
- User authentication (register, login, logout)
- Recipe browsing, search
- Add / Edit / Delete recipes (authenticated)
- Save and view favorites (authenticated)
- Responsive layout with header, sidebar, and main content
- Theming with primary: #2E7D32, secondary: #81C784, accent: #FFB300

Configuration
- Copy .env.example to .env and set:
  REACT_APP_API_BASE_URL=http://localhost:3001

Scripts
- npm start
- npm run build
- npm test

API Integration
- Auth: POST /auth/register, /auth/login, GET /auth/me
- Recipes: GET /recipes, GET /recipes/search, GET/DELETE/PATCH /recipes/{id}, POST /recipes
- Favorites: GET /favorites, POST/DELETE /favorites/{recipe_id}
