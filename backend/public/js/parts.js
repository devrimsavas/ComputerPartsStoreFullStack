new TxtAnime(".heading", {
  effect: "txt-an-1",
  repeat: false,
});

console.log("parts js loaded checked");
async function addItem() {
  //grab form fields
  const product = document.getElementById("product").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  const type = document.getElementById("type").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  //create part object

  const part = {
    product,
    description,
    image,
    type,
    qty_instock: quantity,
    price,
  };

  try {
    //i use async fetch instead of promise
    //fetch post
    const response = await fetch("/part/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(part),
    });

    if (!response.ok) {
      alert("Fetch Error");
      return;
    }
    const data = await response.json();
    alert(data.message);
    window.location.href = "/parts";
  } catch (error) {
    console.error("error", error);
    alert("error");
  }
}

//edit update item
function editItem(id) {
  console.log("edit item works", id);
  //ad it to local storage
  localStorage.setItem("editPartId", id);
  //redirect edit page
  window.location.href = "/part/edit";
}

//update item
async function updateItem() {
  const id = document.getElementById("part-id").value;
  const product = document.getElementById("product").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  const type = document.getElementById("type").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  const part = {
    id,
    product,
    description,
    image,
    type,
    qty_instock: quantity,
    price,
  };

  try {
    const res = await fetch("/part/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(part),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Part updated!");
      localStorage.removeItem("editPartId");
      window.location.href = "/parts";
    } else {
      alert(data.error || "Update failed.");
    }
  } catch (err) {
    console.error("Error updating part:", err);
    alert("Something went wrong.");
  }
}

async function loginUser(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      //  Do redirect yourself
      window.location.href = data.redirectTo;
    } else {
      alert(data.error || "Login failed. Please try again.");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong.");
  }
}

//register new user (default role user fetch to back)
async function registerUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("form3Example4c").value;
  const confirm = document.getElementById("form3Example4cd").value;

  if (!username || !password || !confirm) {
    alert("All fields are required.");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      window.location.href = "/login";
    } else {
      alert(data.error || "Registration failed.");
    }
  } catch (err) {
    console.error("Registration error:", err);
    alert("Something went wrong.");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("editPartId");
  if (!id) return;

  fetch("/part/" + id)
    .then((res) => res.json())
    .then((part) => {
      document.getElementById("product").value = part.product;
      document.getElementById("description").value = part.description;
      document.getElementById("image").value = part.image;
      document.getElementById("type").value = part.type;
      document.getElementById("quantity").value = part.qty_instock;
      document.getElementById("price").value = part.price;
      document.getElementById("part-id").value = part.id;
    })
    .catch((err) => {
      console.error("Failed to load part for editing:", err);
    });
});
