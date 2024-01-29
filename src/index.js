ocument.addEventListener('DOMContentLoaded'), () => {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        const toyCollection = document.getElementById('toy-collection');
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p>${toy.likes} Likes</p>
          <button class="like-btn" id="${toy.id}">Like ❤️</button>
        `;
        toyCollection.appendChild(card);
      });
    });
  }
  const toyForm = document.querySelector('.add-toy-form');
toyForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newToy = {
    name: toyForm.name.value,
    image: toyForm.image.value,
    likes: 0
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then(response => response.json())
  .then(toy => {
    // Add toy to the DOM
    const toyCollection = document.getElementById('toy-collection');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `;
    toyCollection.appendChild(card);
  });
});
const toyForms = document.getElementById('toy-form');
toyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const formData = new FormData(toyForm);
  const name = formData.get('name');
  const image = formData.get('image');
  
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(newToy => {
    // Add the new toy to the DOM
  });
});

document.addEventListener('click', (event) => {
  if (event.target.className === 'like-btn') {
    const id = event.target.id;
    const likesElement = event.target.previousElementSibling;
    const newLikes = parseInt(likesElement.textContent) + 1;

    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
    .then(response => response.json())
    .then(updatedToy => {
      likesElement.textContent = `${updatedToy.likes} Likes`;
    });
  }
});