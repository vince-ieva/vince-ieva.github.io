const overlay = document.querySelector(".overlay");
const gridContainer = document.querySelector(".timeline");
var overlayTop="";
var overlayLeft="";
const modalContainer = document.querySelector(".mymodal-content");
const modalClose = document.querySelector(".mymodal-close");
let jobs = [];
const myexperience=   [
			{
		   		company:"DMPG",
		   		location:"London",
		   		fadein:"Left",
		   		date:{start:"Oct 2019",end:"Nov 2019"},
		   		role: "Senior Web Analyst",
		   		logo:"img/logos/dmpg-logo.png",
		   		task:["Reporting using all Adobe Analytics tools and Google Analytics",
		   		"Analytics audit of client website",
		   		"Web analytics for App tracking implementation",
		   		"Tag Migration",
		   		"Analysis via Dynamic Tag manager,GTM and Tealium"]
		   },
			{
		   		company:"Station10",
		   		location:"London",
		   		fadein:"Right",
		   		date:{start:"Jan 2017",end:"Sept 2018"},
		   		role: "Web Analyst",
		   		logo:"img/logos/s10.jpg",
		   		task:["Reporting using all Adobe Analytics tools and Google Analytics","Analytics audit of client website","Using Python to automate basic manual daily processes",
		   		"Analysis via Dynamic Tag manager and DTM","Dashboarding using DOMO, (certified)"]
		   },{
		   		company:"Telegraph Media Group",
		   		location:"London",
		   		fadein:"Left",
		   		date:{start:"May 2016",end:"Jan 2017"},
		   		role: "Web Analyst",
		   		logo:"img/logos/tmg.jpg",
		   		task:["Reporting using all Adobe Analytics tools.","Building dashboards by connecting BigQuery and Tableau","Using Python to automate basic manual daily processes",
		   		"Tag analysis via Dynamic Tag manager"]
		   }
		   ,{
		   		company:"Starcom Mediavest",
		   		location:"London",
		   		fadein:"Right",
		   		date:{start:"May 2015",end:"Apr 2016"},
		   		role: "Web Analyst",
		   		logo:"img/logos/svm.jpg",
		   		task:["Providing insights to my client using Google Analytics 360 and Double Click",
		   		"Attribution Model built to find out display campaign contribution","Optimization of metrics and dimensions using GTM",
		   		"User experience analysis for Samsung using Adobe Analytics"]
		   },
		   {
		   		company:"London Financial Studies",
		   		location:"London",
		   		fadein:"Left",
		   		date:{start:"May 2015",end:"Apr 2016"},
		   		role: "Marketing analyst",
		   		logo:"img/logos/lfs.png",
		   		task:["Cross-selling project management",
		   		"Generating leads for the sales force","Sales analysis for EMEA, AMERICA and ASIA PAC",
		   		"Marketing analysis using VBA, SQL, Excel and GA"]
		   },
		   {
		   		company:"Galderma",
		   		location:"Milan",
		   		fadein:"Right",
		   		date:{start:"Sep 2013",end:"Aug 2014"},
		   		role: "Marketing assistant",
		   		logo:"img/logos/galderma.jpg",
		   		task:["Building report and analysis on demand by using Excel",
		   		"Implementing 2 app projects for division’s sales force","Designing marketing projects aiming to increase products awareness",
		   		"Analyzing and monitoring the market"]
		   }


   ]


function displayExperience(experience) {
					jobs = myexperience;
					// store the employee HTML as we create it
					let expHTML = '';
					let taskHTML = ''
					// loop through each employee and create HTML markup
					experience.forEach((exp, index) => {
					let company = exp.company;
					let fade=exp.fadein;
					let logo= exp.logo;
					let city= exp.location;
					let startDate=exp.date.start;
					let endDate = exp.date.end;
					let role = exp.role;
					let tasks = exp.task;
					
					// template literals make this so much cleaner!
					expHTML += `
				    <div class="timeline-item" data-index="${index}">

      						<div class="timeline-img"></div>

      						<div class="timeline-content timeline-card js--fadeIn${fade}">
        						<div class="timeline-img-header">
        							<img class="avatar" src="${logo}"/>
          							<h2>${role}</h2>
        						</div>
        						<div class="date">${startDate} ${endDate}
        						</div>
        						<button type="button" class=" bnt-more mybutton"
  				 				data-index="${index}">Read More</button>
      						</div>

   					</div> 

					`
							});
				gridContainer.innerHTML = expHTML;
				}




	function displayModal(index,top) {
// use object destructuring make our template literal cleaner
		let taskHTML = '';
			let { company, fadein, logo, location, tasks,role, date:{start, end} } = jobs[index];
			listoftask=jobs[index].task;
			listoftask.forEach((newLi) =>{
							taskHTML+="<li class='list-of'>"+newLi+"</li>"
							})
			const modalHTML = `
					<img class="mymodal-avatar" src="${logo}" />
					<div class="text-container">
					
					<h4 class="modal-title">My tasks at</h4>
					<h2 class="mymodal-company">${company}</h2>
					<p class="mymodal-city">${location}</p>
					
					<hr />
					<ul class="task-list-modal">${taskHTML}</ul>
					
										</div>	`;
			overlay.classList.remove("hidden");
			overlay.setAttribute("data-index",`${index}`)
		
			overlay.style.top=top;
			modalContainer.innerHTML = modalHTML;
}
displayExperience(myexperience)
var mybutton=document.querySelectorAll(".mybutton")
	
	//DISPLAY OVERLAY

mybutton.forEach((button)=> {button.addEventListener('click', e => {
// // make sure the click is not on the gridContainer itself
		let newModalposition="";
// 		// select the card element based on its proximity to actual element clicked
 		const card = e.target.closest(".timeline-item");
 		//const index = card.getAttribute('data-index');
 		var index=e.target.getAttribute("data-index");
 		console.log(card.offsetTop);
 		console.log(card.offsetBottom);
 		newModalposition=card.offsetTop-200
 		//overlay.style.offsetTop= (card.offsetTop+100)+"px";
 		displayModal(index,newModalposition+"px");
				})
			})

modalClose.addEventListener('click', () => {
	overlay.classList.add("hidden");})

