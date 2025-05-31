// Base URL for JSONPlaceholder API
const API_BASE_URL = "https://jsonplaceholder.typicode.com"

// User ID to fetch (1-10 are valid in JSONPlaceholder)
const USER_ID = 1

// DOM Elements
const userNameElements = document.querySelectorAll("#user-name, #user-name-mini, #profile-name")
const profileUsername = document.getElementById("profile-username")
const profileCompany = document.getElementById("profile-company")
const profileEmail = document.getElementById("profile-email")
const profilePhone = document.getElementById("profile-phone")
const profileWebsite = document.getElementById("profile-website")
const profileAddress = document.getElementById("profile-address")
const userAvatar = document.getElementById("user-avatar")
const userAvatarSmall = document.querySelector(".user-avatar-small")
const postsContainer = document.getElementById("posts-container")
const postsLoading = document.getElementById("posts-loading")
const todosContainer = document.getElementById("todos-container")
const todosLoading = document.getElementById("todos-loading")
const postsCount = document.getElementById("posts-count")
const albumsCount = document.getElementById("albums-count")
const todosCount = document.getElementById("todos-count")
const commentsCount = document.getElementById("comments-count")

// Fetch user data
async function fetchUserData() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${USER_ID}`)
    if (!response.ok) throw new Error("Failed to fetch user data")

    const userData = await response.json()

    // Update user information
    userNameElements.forEach((el) => {
      if (el) el.textContent = userData.name
    })

    if (profileUsername) profileUsername.textContent = `@${userData.username}`
    if (profileCompany) profileCompany.textContent = userData.company.name
    if (profileEmail) profileEmail.textContent = userData.email
    if (profilePhone) profilePhone.textContent = userData.phone
    if (profileWebsite) profileWebsite.textContent = userData.website
    if (profileAddress) {
      const { street, suite, city, zipcode } = userData.address
      profileAddress.textContent = `${street}, ${suite}, ${city}, ${zipcode}`
    }

    // Generate avatar using user initials
    const initials = userData.name
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()

    // Generate a consistent color based on user ID
    const hue = (userData.id * 137) % 360
    const avatarBg = `hsl(${hue}, 70%, 60%)`

    if (userAvatar) {
      userAvatar.style.backgroundColor = avatarBg
      userAvatar.style.display = "flex"
      userAvatar.style.alignItems = "center"
      userAvatar.style.justifyContent = "center"
      userAvatar.style.color = "white"
      userAvatar.style.fontSize = "2rem"
      userAvatar.style.fontWeight = "bold"
      userAvatar.textContent = initials
    }

    if (userAvatarSmall) {
      userAvatarSmall.style.backgroundColor = avatarBg
      userAvatarSmall.style.display = "flex"
      userAvatarSmall.style.alignItems = "center"
      userAvatarSmall.style.justifyContent = "center"
      userAvatarSmall.style.color = "white"
      userAvatarSmall.style.fontSize = "1rem"
      userAvatarSmall.style.fontWeight = "bold"
      userAvatarSmall.textContent = initials
    }
  } catch (error) {
    console.error("Error fetching user data:", error)
    userNameElements.forEach((el) => {
      if (el) el.textContent = "User Not Found"
    })
  }
}

// Fetch posts
async function fetchPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${USER_ID}/posts`)
    if (!response.ok) throw new Error("Failed to fetch posts")

    const posts = await response.json()

    // Update posts count
    if (postsCount) postsCount.textContent = posts.length

    // Display only the first 5 posts
    const recentPosts = posts.slice(0, 5)

    if (postsContainer) {
      // Clear loading indicator
      postsContainer.innerHTML = ""

      // Create post cards
      recentPosts.forEach((post) => {
        const postCard = document.createElement("div")
        postCard.className = "post-card fade-in"
        postCard.style.setProperty("--delay", `${Math.random() * 0.3}s`)

        const postTitle = document.createElement("h3")
        postTitle.className = "post-title"
        postTitle.textContent = post.title

        const postBody = document.createElement("p")
        postBody.className = "post-body"
        postBody.textContent = post.body

        const postMeta = document.createElement("div")
        postMeta.className = "post-meta"

        const postDate = document.createElement("span")
        // Generate a random date within the last month
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 30))
        postDate.textContent = date.toLocaleDateString()

        const postComments = document.createElement("span")
        // Random number of comments (1-20)
        const commentCount = Math.floor(Math.random() * 20) + 1
        postComments.textContent = `${commentCount} comments`

        postMeta.appendChild(postDate)
        postMeta.appendChild(postComments)

        postCard.appendChild(postTitle)
        postCard.appendChild(postBody)
        postCard.appendChild(postMeta)

        postsContainer.appendChild(postCard)
      })
    }
  } catch (error) {
    console.error("Error fetching posts:", error)
    if (postsContainer) {
      postsContainer.innerHTML = '<div class="error-message">Failed to load posts</div>'
    }
  }
}

// Fetch todos
async function fetchTodos() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${USER_ID}/todos`)
    if (!response.ok) throw new Error("Failed to fetch todos")

    const todos = await response.json()

    // Update todos count
    if (todosCount) todosCount.textContent = todos.length

    // Display only the first 5 todos
    const recentTodos = todos.slice(0, 5)

    if (todosContainer) {
      // Clear loading indicator
      todosContainer.innerHTML = ""

      // Create todo items
      recentTodos.forEach((todo) => {
        const todoItem = document.createElement("div")
        todoItem.className = "todo-item fade-in"
        todoItem.style.setProperty("--delay", `${Math.random() * 0.3}s`)

        const todoCheckbox = document.createElement("div")
        todoCheckbox.className = `todo-checkbox ${todo.completed ? "checked" : ""}`
        todoCheckbox.addEventListener("click", () => {
          todoCheckbox.classList.toggle("checked")
          todoText.classList.toggle("completed")
        })

        const todoText = document.createElement("div")
        todoText.className = `todo-text ${todo.completed ? "completed" : ""}`
        todoText.textContent = todo.title

        todoItem.appendChild(todoCheckbox)
        todoItem.appendChild(todoText)

        todosContainer.appendChild(todoItem)
      })
    }
  } catch (error) {
    console.error("Error fetching todos:", error)
    if (todosContainer) {
      todosContainer.innerHTML = '<div class="error-message">Failed to load tasks</div>'
    }
  }
}

// Fetch albums
async function fetchAlbums() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${USER_ID}/albums`)
    if (!response.ok) throw new Error("Failed to fetch albums")

    const albums = await response.json()

    // Update albums count
    if (albumsCount) albumsCount.textContent = albums.length
  } catch (error) {
    console.error("Error fetching albums:", error)
  }
}

// Fetch comments
async function fetchComments() {
  try {
    const response = await fetch(`${API_BASE_URL}/comments`)
    if (!response.ok) throw new Error("Failed to fetch comments")

    const comments = await response.json()

    // Filter comments for user's posts
    const postsResponse = await fetch(`${API_BASE_URL}/users/${USER_ID}/posts`)
    const posts = await postsResponse.json()
    const postIds = posts.map((post) => post.id)

    const userComments = comments.filter((comment) => postIds.includes(comment.postId))

    // Update comments count
    if (commentsCount) commentsCount.textContent = userComments.length
  } catch (error) {
    console.error("Error fetching comments:", error)
  }
}

// Add animation to sidebar menu items
function setupSidebarAnimation() {
  const menuItems = document.querySelectorAll(".sidebar-nav li")
  menuItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-20px)"

    setTimeout(
      () => {
        item.style.transition = "opacity 0.3s ease, transform 0.3s ease"
        item.style.opacity = "1"
        item.style.transform = "translateX(0)"
      },
      100 + index * 50,
    )
  })
}

// Initialize the dashboard
async function initDashboard() {
  // Fetch all data
  await fetchUserData()
  fetchPosts()
  fetchTodos()
  fetchAlbums()
  fetchComments()

  // Setup animations
  setupSidebarAnimation()

  // Add event listeners
  document.querySelectorAll(".sidebar-nav li").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelectorAll(".sidebar-nav li").forEach((li) => {
        li.classList.remove("active")
      })
      this.classList.add("active")
    })
  })
}

// Start the application
document.addEventListener("DOMContentLoaded", initDashboard)
