const data = [
  {
    name: "Omar Moses",
    house: "Gryffindor",
  },
  {
    name: "Salvador Mayo",
    house: "Gryffindor",
  },
  {
    name: "Zachery Vaughn",
    house: "Slytherin",
  },
  {
    name: "Xena Palmer",
    house: "Hufflepuff",
  },
  {
    name: "Clare Fisher",
    house: "Gryffindor",
  },
];

const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
newUser = [];
voldemortArmy = [];

const giveID = () => {
  data.forEach((student, index) => {
    student.id = index + 1;
  });
};

let domString = "";
//UTILITY FUNCTION
const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};

const sortingHat = () => {
  let domString = "";
  domString = `<div id="intro" class="card">
  <div id="card-header" class="card-header">
   Welcome to Hogwarts.
  </div>
  <div id="card-body" class="card-body">
    <img id="gif" class ="img" src="https://c.tenor.com/9ugA1uLnLMgAAAAC/hat-sorting.gif">
    <p class="card-text">'The start-of-term banquet will begin shortly, but before you take your seats in the Great Hall, you will be sorted into your houses. The Sorting is a very important ceremony because, while you are here, your house will be something like your family within Hogwarts.'</p></div>
   <div id="btn-sort"><button type="button" class="btn-sort" data-bs-toggle="modal" data-bs-target="#sort">
    Place the hat onto your head and I will place you into your house.
    </button></div>
  </div>
</div>
    <!-- Modal -->
  <div class="modal fade" id="sort" tabindex="-1" aria-labelledby="sort" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Let's get sorted!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body" id="modal-body">
        
      <form>
        <input class="form-control" type="text" placeholder="Enter Your Name Here" id="nameInputTextArea" required></input>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Sort Me!</button>
      </form>
          
      </div>
    </div>
  </div>`;
  renderToDom("#sortingHat", domString);
};

const renderButtons = () => {
  let domString = "";
  domString = `
              <button type="button" id="all">All</button>
              <button type="button" id="gryffindor">Gryffindor</button>
              <button type="button" id="ravenclaw">Ravenclaw</button>
              <button type="button" id="hufflepuff">Hufflepuff</button>
              <button type="button" id="slytherin">Slytherin</button>`;
  renderToDom("#filterButtons", domString);
};

const cardsOnDom = (arr, divId) => {
  let domString = "";
  for (const student of arr) {
    const gryffindor = student.house === "Gryffindor";
    const hufflepuff = student.house === "Hufflepuff";
    const ravenclaw = student.house === "Ravenclaw";
    const slytherin = student.house === "Slytherin";
    domString += `<div class="card">
  <div id="header" class="card-header">
     <img src=${
       gryffindor
         ? "https://cdn.shopify.com/s/files/1/1756/9559/products/gryffindor_coaster_photo_480x480.jpg?v=1573583163"
         : ""
     } 
     ${
       hufflepuff
         ? "https://cdn.shopify.com/s/files/1/1756/9559/products/hufflepuff_coaster_photo_480x480.jpg?v=1573583811"
         : ""
     } 
    ${
      ravenclaw
        ? "https://cdn.shopify.com/s/files/1/1756/9559/products/raven_claw_coaster_photo_480x480.jpg?v=1573582005"
        : ""
    } 
    ${
      slytherin
        ? "https://cdn.shopify.com/s/files/1/1756/9559/products/slytherin_coaster_photo_480x480.jpg?v=1573583538"
        : ""
    } alt="...">
  </div>
  <div class="card-body">
    <h5 id="name" class="card-title">${student.name}</h5>
    <a href="#" id="expel--${
      student.id
    }" class="btn btn-danger">Expel from Hogwarts</a>
  </div>
</div>`;
  }
  renderToDom(divId, domString);
};

const moldyVoldy = (arr, divId) => {
  let domString = "";
  for (const student of arr) {
    domString += `<div class="card">
  <div id="header-for-voldemortArmy" class="card-header">
    <img src="https://i.pinimg.com/564x/32/ec/f4/32ecf483561b7db87d6f67f0955caeb4--hd-wallpaper-wallpapers.jpg">
  </div>
  <div class="card-body">
    <h5 id="name" class="card-title">${student.name}</h5>
  </div>
</div>`;
  }
  renderToDom(divId, domString);
};

// Event Listeners
function eventListeners() {
  document.querySelector("#filterButtons").addEventListener("click", (e) => {
    if (e.target.id === "all") {
      cardsOnDom(data, "#students");
    } else if (e.target.id) {
      const house = data.filter(
        (taco) => taco.house.toLowerCase() === e.target.id
      );
      cardsOnDom(house, "#students");
    }
  });

  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    (newStudent = {
      name: document.querySelector("#nameInputTextArea").value,
      house: houses[Math.floor(Math.random() * 4)],
    }),
    document.querySelector("#card-header").style.display = "none";
    document.querySelector("#card-body").style.display = "none";
    document.querySelector("#header-img").style.display = "none";
    data.push(newStudent);
    newUser.push(newStudent);
    giveID();
    cardsOnDom(data, "#students");
    renderButtons();
  });

  document.querySelector("#students").addEventListener("click", (e) => {
    if (e.target.id.includes("expel")) {
      const [method, studentId] = e.target.id.split("--");
      const index = data.findIndex((taco) => {
        return taco.id === parseInt(studentId);
      });
      const student = data.splice(index, 1);
      voldemortArmy.push(...student);
      moldyVoldy(voldemortArmy, "#voldemort");
      cardsOnDom(data, "#students");
      alert(
        `${student[0].name} has been expelled from Hogwarts and sent to Voldemort's Army!`
      );
    }
  });
}

function startApp() {
  sortingHat();
  giveID();
  eventListeners();
}

startApp();
