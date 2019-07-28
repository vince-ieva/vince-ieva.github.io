const gridContainer = document.querySelector(".grid-container");
const timeline = document.querySelector(".timeline");
const secondColumn= document.querySelectorAll(".second-column")[0];
const header= document.querySelectorAll("header")[0];
const myimg=document.querySelectorAll(".waiting")[0];
const overlay = document.querySelector(".overlay");
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



const skilldiv =document.querySelector(".skillset .col")
const skillset = {
							"languages": [
							    {
							      "name": "JavaScript",
							      "skill": 3
							    },
							    {
							      "name": "HTML",
							      "skill": 4
							    },
							    {
							      "name": "CSS",
							      "skill": 3
							    },
							    {
							      "name": "Python",
							      "skill": 2
							    }
							  ],
							  "web-Analytics": [
							    {
							      "name": "Adobe Analytics",
							      "skill": 5
							    },
							    {
							      "name": "Google Analytics",
							      "skill": 5
							    }],
							    "TMS": [
							    {
							      "name": "GTM",
							      "skill": 5
							    },
							    {
							      "name": "DTM",
							      "skill": 5
							    },
							    {
							      "name": "Tealium",
							      "skill": 3
							    }],
							    "Dashboarding tools": [
							    {
							      "name": "Tableau",
							      "skill": 4
							    },
							    {
							      "name": "DOMO",
							      "skill": 4
							    },
							    {
							      "name": "Data Studio",
							      "skill": 3
							    }],
							    "CRO": [
							    {
							      "name": "Optimize",
							      "skill": 4
							    },
							    {
							      "name": "VWO",
							      "skill": 2
							    },
							    {
							      "name": "Adobe Target",
							      "skill": 2
							    },
							    {
							      "name": "Monetate",
							      "skill": 1
							    }],
							"frameworks": [
							    {
							      "name": "jQuery",
							      "skill": 2
							    },
							    {
							      "name": "Bootstrap",
							      "skill": 1
							    },
							    {
							      "name": "Sass",
							      "skill": 2
							    },
							  ],
							"databases": [
							    {
							      "name": "BigQuery",
							      "skill": 2
							    }]
							
							}
var imgs=["jp_island","me_onthesea","norway","stmichel","telaviv","trani","testjp"];
function getRandomImg(yourimg){

		var randomNumber= Math.floor(Math.random() * yourimg.length);
		var selectedRandomly=yourimg[randomNumber]
			return selectedRandomly
		}
//SET new image at every page refresh
function addImg(img){
			var imgUrl= "img/"+img+".jpg"
			secondColumn.style.backgroundImage = 'url('+imgUrl+')';
			secondColumn.style.backgroundRepeat = 'no-repeat';
			secondColumn.style.backgroundPosition = 'center';
			secondColumn.style.borderRadius = '40%';
			myimg.style.display="none";

		     }




// skills BAR
												
					function myfunc(myob){
						let skilldivHTML = '';
					
						let nested=Object.keys(myob);
						let level="";
		
						nested.forEach((skilltype)=>{
								let skillsection=skilltype.toUpperCase();
								let mapped=skillset[skilltype]
									skilldivHTML += `<div class= skillwrapper ${skilltype}>
													<h3 style="color:white">${skillsection}</h3>
							 						<ul class= skillgroup ${skilltype}>	
							 						`
								      mapped.forEach((newskills) =>{
											   
												let percent=(newskills.skill*100)/5;
												let skillname=newskills.name;
												switch (newskills.skill) {
												case 1:
    													level = "Basic Knowledge";
   														 break;
   												case 2:
    													level = "Novice";
   														 break;
   												 case 3:
    													level = "Intermediate";
   														 break;
   												case 4:
    													level = "Advanced";
   														 break;
   												case 5:
    													level = "Expert";
   														 break;

												}

										skilldivHTML += `
													<div class="skillbar-container"><div class="skillbar" style="background:#eb8a88; " data-percent="${percent}&#37;"><li class="label-for-skills">${skillname} </div></div><div><p class="knowledge-level">${percent}&#37; &#47; ${level}</p></div></li>

							 						`
							 					})
								      skilldivHTML += `</ul></div>
							 						`
								      })
						skilldiv.innerHTML = skilldivHTML;
						
						}





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
        						<div style="background-color:white;">
        							<img class="avatar" src="${logo}"/></div>
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
				timeline.innerHTML = expHTML;
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



				function animation(selector){
					selector="."+selector;
					$(selector).each(function(){$(this).animate({
							width:$(this).attr('data-percent')
								},1500);
								});

						}



//ACTION 

if (document.title === "Vincenzo Ieva") {


				const newImg = getRandomImg(imgs);


				 var typed = new Typed('#typed', {
				  stringsElement: '#typed-strings',
				  backSpeed: 40,
				  typeSpeed: 40,
				   onComplete: function () {
				   				addImg(newImg)
				   						}

						});
}


else if(document.title === "Curriculum"){

				
				//Create Skillset
				myfunc(skillset);

					//DISPLAY TIMELINE
				displayExperience(myexperience);
				
	
	
				(function() {
						  $(".skillbars").each(function(idNr) {
						    var color = $(this).attr('data-color'),
						      percent = $(this).attr('data-pr'),
						      caption = $(this).attr('data-cap'),
						      heightBar = $(this).attr('data-height'),
						      widthBar = $(this).attr('data-width'),
						      skillLevel = "";
						    if (!heightBar) {
						      heightBar = "5px";
						    }
						    if (!widthBar) {
						      widthBar = "400px";
						    }
						    getPerAsNum = percent.split("%");
						    if (getPerAsNum[0] == 25 || getPerAsNum[0] < 25) {
						      skillLevel = "Beginner";
						    }
						    if (getPerAsNum[0] == 50 || getPerAsNum[0] == 75 || getPerAsNum[0] > 50 && getPerAsNum[0] < 75) {
						      skillLevel = "Avarage";
						    }
						    if (getPerAsNum[0] == 100 || getPerAsNum[0] > 75) {
						      skillLevel = "Professional";
						    }

						    var skillHtml = "<div class='skillbar'>" +
						      "<h1 style='display: none; margin-bottom: .2em;'>" + caption + "</h1>" +
						      "<div class='skillbg' style='display: none; width: " + widthBar + "; height: " + heightBar + "; background-color: #BFBFBF;'>" +
						      "<div class='skill-skill-" + idNr + "' style='background-color: " + color + "; height: " + heightBar + ";' />" +
						      "</div>" +
						      "<p style='display: none; margin-bottom: 1em;'>" + percent + " / " + skillLevel + "</p>" +
						      "</div>";
						    setTimeout(function() {
						      $(".skill-skill-" + idNr).css({
						        width: '0px'
						      });
						      $(".skillbar h1").fadeIn(500, function() {
						        $(".skillbg").fadeIn(500, function() {
						          $(".skillbar p").fadeIn(500, function() {
						            $("div.skill-skill-" + idNr).animate({
						              width: percent
						            }, 1500);
						          });
						        });
						      });
						    }, 100);
						    $(this).prepend(skillHtml);
						  });
						})();

					//animation on skillbar				
				$(window).on('load',function() {
  					$("body").removeClass("preload");
  					animation("skillbar")
						});

					modalClose.addEventListener('click', () => {
				overlay.classList.add("hidden");
					})

					var mybutton=document.querySelectorAll(".mybutton")
					//DISPLAY OVERLAY
					mybutton.forEach((button)=> {button.addEventListener('click', e => {
			            // // make sure the click is not on the gridContainer itself
					let newModalposition="";
			// 		// select the card element based on its proximity to actual element clicked
			 		const card = e.target.closest(".timeline-item");
			 		//const index = card.getAttribute('data-index');
			 		var index=e.target.getAttribute("data-index");
			 		
			 		var bodyRect = document.body.getBoundingClientRect();
    				elemRect = button.getBoundingClientRect();
   					 newModalposition  = (elemRect.top - bodyRect.top);
			 		
			 		//newModalposition= index != 0 ? card.offsetTop+1200 : card.offsetTop+1200;
			 			console.log(newModalposition);
			 		//overlay.style.offsetTop= (card.offsetTop+100)+"px";
			 		displayModal(index,newModalposition+"px");

							})
						})

					

}