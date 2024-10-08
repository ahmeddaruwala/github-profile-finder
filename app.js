const form = document.getElementById("form");
const maindiv = document.getElementById("main-div");
const msgDiv = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const imgTag = maindiv.children[0];
  const name = maindiv.children[1];
  const repos = maindiv.children[2];
  const link = maindiv.children[3];

  const value = event.target.children[0].value;
  const API_URI = `https://api.github.com/users/${value}`;

  msgDiv.innerText = "";

  try {
    const response = await axios(API_URI);

    imgTag.src = response.data.avatar_url;
    name.innerText = response.data.name;
    repos.innerText = `Public Repos: ${response.data.public_repos}`;
    link.href = response.data.html_url;

    maindiv.classList.remove('hidden');

  } catch (err) {
    console.log(err.response.data.message);

    msgDiv.innerText = err.response.data.message;

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid Username! Please try again",
    });

    imgTag.src = "";
    name.innerText = "";
    repos.innerText = "";
    link.href = "";
    maindiv.classList.add('div');
  }
});
