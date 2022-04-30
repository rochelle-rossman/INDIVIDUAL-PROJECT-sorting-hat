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
    <img class ="img" src="https://i0.wp.com/bookstacked.com/wp-content/uploads/2016/01/Pottermore-Sorting-Hat.jpg?fit=1200%2C679&ssl=1">
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
          <div class="form-floating mb-3">
            <input class="form-control form-control-lg" type="text" placeholder="Name" id="student" aria-label="student" required>
            <label for="studentId">Student's Name</label>
          </div>
          <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Submit</button>
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
              <button type="button" id="slytherin">Slytherin</button>
              <button type="button" id="voldemort">Voldemort's Army</button>
              `;
  renderToDom("#filterButtons", domString);
}

const cardsOnDom = (taco) => {
  let domString = "";
  for (const student of taco) {
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
  renderToDom("#students", domString);
};

// Event Listeners
function eventListeners() {

  document.querySelector('#filterButtons').addEventListener('click', (e) => {
    if (e.target.id === "all") {
      cardsOnDom(data);
    } else if (e.target.id) {
      const house = data.filter((taco) => taco.house.toLowerCase() === e.target.id);
      cardsOnDom(house);
    } else if (e.target.id === "voldemort") {
      const army = document.querySelector("#voldemort");
      cardsOnDom(army);
    }
  });

  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    newStudent = {
      name: document.querySelector("#name").value
    },
    data.push(newStudent);
    cardsOnDom(data);


  })
}

sortingHat();
// renderButtons();
// cardsOnDom(data);
giveID();
eventListeners();
