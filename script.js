document.addEventListener("DOMContentLoaded", () => {
  // --- MOCK DATA ---
  const initialPosts = [
    {
      title: "Annual Tech Fest 2025 - Register Now!",
      description:
        "Join us for the biggest tech fest of the year! Competitions, workshops, guest speakers from top tech companies, and amazing prizes await. Don't miss out on this opportunity to learn, compete, and network.",
      category: "events",
      author: "Tech Club",
      date: "Jan 15, 2025",
      image: "https://placehold.co/600x400/3498db/ffffff?text=Tech+Fest",
    },
    {
      title: "Lost: Red Notebook in Library",
      description:
        "Lost my red spiral notebook in the main library on the 2nd floor. Contains important class notes for Computer Networks. Please contact if found. Reward offered!",
      category: "lost-found",
      author: "Priya Sharma",
      date: "Jan 12, 2025",
      image: "https://placehold.co/600x400/e74c3c/ffffff?text=Lost+Notebook",
    },
    {
      title: "Coding Club Meetup - This Saturday",
      description:
        "Weekly coding session this Saturday at 4 PM in Lab 301. We'll be working on competitive programming problems and preparing for upcoming hackathons. All skill levels are welcome.",
      category: "clubs",
      author: "Coding Club",
      date: "Jan 10, 2025",
      image: "https://placehold.co/600x400/2ecc71/ffffff?text=Coding+Meetup",
    },
    {
      title: "Mid-Semester Exam Schedule Released",
      description:
        "The mid-semester examination schedule for all CS courses has been posted on the academic portal. Exams begin from Feb 1st. Check your timetable and plan accordingly.",
      category: "academics",
      author: "Academic Office",
      date: "Jan 8, 2025",
      image: null, // No image
    },
    {
      title: "Basketball Tournament - Teams Needed",
      description:
        "Inter-department basketball tournament coming up next month! Looking for teams to register. Form your squad and represent your department. Registration closes Jan 20th.",
      category: "events",
      author: "Sports Committee",
      date: "Jan 7, 2025",
      image: "https://placehold.co/600x400/e67e22/ffffff?text=Basketball",
    },
    {
      title: "Machine Learning Workshop by Google",
      description:
        "Exclusive workshop on ML fundamentals and TensorFlow by Google engineers. Limited seats available. Register through the CS department portal before Jan 15th.",
      category: "events",
      author: "CS Department",
      date: "Jan 5, 2025",
      image: "https://placehold.co/600x400/9b59b6/ffffff?text=ML+Workshop",
    },
    {
      title: "Photography Club Exhibition",
      description:
        "Annual photography exhibition showcasing the best captures by our talented photographers. Theme: 'Campus Life'. Open to all students and faculty.",
      category: "clubs",
      author: "Photography Club",
      date: "Jan 3, 2025",
      image: "https://placehold.co/600x400/1abc9c/ffffff?text=Photo+Exhibition",
    },
    {
      title: "Found: iPhone 13 near Cafeteria",
      description:
        "Found an iPhone 13 (blue) near the main cafeteria yesterday evening. Please contact me with proof of ownership to claim it. Contact: 98765xxxxx.",
      category: "lost-found",
      author: "Rahul Verma",
      date: "Jan 2, 2025",
      image: null, // No image
    },
    {
      title: "Guest Lecture on Cloud Computing",
      description:
        "Distinguished guest lecture on Cloud Computing and DevOps practices by AWS Solutions Architect. Topics include AWS services, microservices, and infrastructure as code.",
      category: "academics",
      author: "Dr. Anjali Mehta",
      date: "Dec 30, 2024",
      image: null, // No image
    },
  ];

  let posts = [...initialPosts];

  // --- DOM ELEMENTS ---
  const postsGrid = document.getElementById("posts-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("search-input");

  const pages = {
    home: document.getElementById("home-page"),
    about: document.getElementById("about-page"),
    contact: document.getElementById("contact-page"),
    auth: document.getElementById("auth-page"),
  };

  const navLinks = {
    home: document.getElementById("home-link"),
    about: document.getElementById("about-link"),
    contact: document.getElementById("contact-link"),
    login: document.getElementById("login-signup-link"),
    logo: document.getElementById("logo-link"),
  };

  const authForms = {
    login: document.getElementById("login-form-container"),
    signup: document.getElementById("signup-form-container"),
    showLogin: document.getElementById("show-login-form"),
    showSignup: document.getElementById("show-signup-form"),
  };

  const modal = document.getElementById("create-post-modal");
  const addPostBtn = document.getElementById("add-post-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const cancelPostBtn = document.getElementById("cancel-post-btn");
  const newPostForm = document.getElementById("new-post-form");

  // --- FUNCTIONS ---

  const getCategoryBadge = (category) => {
    const colors = {
      events: "bg-purple-100 text-purple-800",
      clubs: "bg-green-100 text-green-800",
      "lost-found": "bg-orange-100 text-orange-800",
      academics: "bg-blue-100 text-blue-800",
    };
    return `<span class="absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full ${
      colors[category] || "bg-gray-100 text-gray-800"
    }">${category.replace("-", " & ")}</span>`;
  };

  const renderPosts = (postsToRender = posts) => {
    postsGrid.innerHTML = "";
    if (postsToRender.length === 0) {
      postsGrid.innerHTML = `<p class="col-span-full text-center text-gray-500">No posts found.</p>`;
      return;
    }
    postsToRender.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className =
        "card bg-white rounded-lg shadow-md overflow-hidden relative";

      const imageHtml = post.image
        ? `<img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover">`
        : '<div class="w-full h-48 bg-gray-200 flex items-center justify-center"><p class="text-gray-400">No Image</p></div>';

      postElement.innerHTML = `
                ${imageHtml}
                <div class="p-6">
                    ${getCategoryBadge(post.category)}
                    <h3 class="text-xl font-bold mb-2">${post.title}</h3>
                    <p class="text-gray-600 mb-4 text-sm">${post.description.substring(
                      0,
                      120
                    )}...</p>
                    <div class="flex justify-between items-center text-xs text-gray-500">
                        <span>
                            <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            ${post.author}
                        </span>
                        <span>
                            <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            ${post.date}
                        </span>
                    </div>
                </div>
            `;
      postsGrid.appendChild(postElement);
    });
  };

  const showPage = (pageId) => {
    addPostBtn.classList.toggle("hidden", pageId !== "home");
    Object.values(pages).forEach((page) => page.classList.add("hidden"));
    if (pages[pageId]) {
      pages[pageId].classList.remove("hidden");
    }
  };

  const handleFilter = (e) => {
    const filter = e.target.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active-filter"));
    e.target.classList.add("active-filter");

    const filteredPosts = posts.filter(
      (post) => filter === "all" || post.category === filter
    );
    renderPosts(filteredPosts);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm)
    );
    renderPosts(filteredPosts);
  };

  const handleNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      title: e.target.elements["post-title"].value,
      description: e.target.elements["post-description"].value,
      category: e.target.elements["post-category"].value,
      author: e.target.elements["post-name"].value,
      image: e.target.elements["post-image"].value || null,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    posts.unshift(newPost);
    renderPosts();
    modal.classList.add("hidden");
    newPostForm.reset();

    // Reset filters to show the new post
    filterButtons.forEach((btn) => btn.classList.remove("active-filter"));
    document
      .querySelector('.filter-btn[data-filter="all"]')
      .classList.add("active-filter");
  };

  // --- EVENT LISTENERS ---

  // Navigation
  navLinks.home.addEventListener("click", () => showPage("home"));
  navLinks.logo.addEventListener("click", () => showPage("home"));
  navLinks.about.addEventListener("click", () => showPage("about"));
  navLinks.contact.addEventListener("click", () => showPage("contact"));
  navLinks.login.addEventListener("click", () => showPage("auth"));

  // Auth form switching
  authForms.showSignup.addEventListener("click", (e) => {
    e.preventDefault();
    authForms.login.classList.add("hidden");
    authForms.signup.classList.remove("hidden");
  });

  authForms.showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    authForms.signup.classList.add("hidden");
    authForms.login.classList.remove("hidden");
  });

  // Filtering and Searching
  filterButtons.forEach((btn) => btn.addEventListener("click", handleFilter));
  searchInput.addEventListener("input", handleSearch);

  // Modal
  addPostBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
  cancelPostBtn.addEventListener("click", () => modal.classList.add("hidden"));

  // New Post Form
  newPostForm.addEventListener("submit", handleNewPost);

  // --- INITIAL RENDER ---
  renderPosts();
});
