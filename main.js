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
	}
];

const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
newUser = [];
voldemortArmy = [];


const giveID = () => {
  data.forEach((student, index) => {
    student.id = index + 1;
  }); 
  
}

let domString = "";
//UTILITY FUNCTION
const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};

const sortingHat = () => {
  let domString = "";
  domString = `<div class="card">
  <div class="card-header">
   Let's get sorted!
  </div>
  <div class="card-body">
    <img class ="img" src="https://jonnegroni.com/wp-content/uploads/2016/10/harry-potter1-disneyscreencaps-com-5582.jpg">
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
   <button type="button" class="btn-sort" data-bs-toggle="modal" data-bs-target="#sort">
    Sort
    </button>
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
        <div class="form-floating">
        <label for="exampleFormControlInput1" class="form-label">Name</label>
      <input class="form-control" placeholder="Enter Your Name Here" id="nameInputTextArea" required></input>
    </div>
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
}

const cardsOnDom = (arr, divId) => {
  let domString = "";
  for (const student of arr) {
    domString += `<div class="card">
  <div id="header-for-${student.house}" class="card-header">
    ${student.house}
  </div>
  <div class="card-body">
    <h5 id="name" class="card-title">${student.name}</h5>
    <a href="#" id="expel" class="btn btn-danger">Expel</a>
  </div>
</div>`;
  }
  renderToDom(divId, domString);
};

// Event Listeners
function eventListeners() {

  document.querySelector('#filterButtons').addEventListener('click', (e) => {
    if (e.target.id === "all") {
      cardsOnDom(data, "#students");
    } else if (e.target.id) {
      const house = data.filter((taco) => taco.house.toLowerCase() === e.target.id);
      cardsOnDom(house, "#students");
    }
  });

  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    newStudent = {
      name: document.querySelector("#nameInputTextArea").value,
      house: houses[Math.floor(Math.random() * 4)],
    },
      data.push(newStudent);
      newUser.push(newStudent);
      giveID();
      cardsOnDom(data, "#students");
      cardsOnDom(newUser, "#newStudents");
      renderButtons();
});


  document.querySelector("#students").addEventListener("click", (e) => {
    if (e.target.id === "expel") {
      const [method, studentId] = e.target.id.split("--");
      const index = data.findIndex((taco) => taco.id === parseInt(studentId));
      voldemortArmy.push(...data.splice(index, 1));
      alert
      cardsOnDom(voldemortArmy, "#voldemort");
      cardsOnDom(data, "#students");
    }
  });
  
}
function startApp() {
  sortingHat();
  giveID();
  eventListeners();
};

startApp();
