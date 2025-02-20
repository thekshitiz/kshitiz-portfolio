// Current structure:
/api
  /admin
    /comments
    /dashboard
    /messages
    /posts
    /stats
    /users
  /analytics
  /auth
  /blogs
  /contact
  /posts
  /test

// Recommended structure:
/api
  /v1  // Version your API
    /admin
      /comments
      /dashboard
      /messages
      /posts
      /stats
      /users
    /public
      /analytics
      /auth
      /blogs
      /contact
      /posts
    /test  // Move test endpoints to a separate development environment 