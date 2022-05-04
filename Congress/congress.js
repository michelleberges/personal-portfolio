import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'

const header = document.querySelector('header')
const main = document.querySelector('main')

const allCongressMembers = [...senators, ...representatives] 

const senatorDiv = document.querySelector('.senatorsDiv')
const seniorityHeading = document.querySelector('.seniority')
const loyaltyList = document.querySelector('.loyaltyList')
const simpleSenators = simplifiedSenators()
//const simpleRepresentatives = simplifiedRepresentatives
const maleCongress = simpleSenators.filter((senator) => senator.gender === 'M')// comment: used const variables to create filters for male and female senators
const femaleCongress = simpleSenators.filter((senator) => senator.gender === 'F') 
const republicanCongress = simpleSenators.filter((senator) => senator.party === 'R') 
const democratCongress = simpleSenators.filter((senator) => senator.party === 'D') 

const maleButton = document.createElement('button')
maleButton.textContent = 'Male'
maleButton.addEventListener('click', () => populateSenatorDiv(maleCongress)) // comment: created buttons with an Event Listener that waits for a click in order to populate the page with the characters for that button

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female'
femaleButton.addEventListener('click', () => populateSenatorDiv(femaleCongress))

const republicanButton = document.createElement('button')
republicanButton.textContent = 'Republican'
republicanButton.addEventListener('click', () => populateSenatorDiv(republicanCongress))

const democratButton = document.createElement('button')
democratButton.textContent = 'Democrat'
democratButton.addEventListener('click', () => populateSenatorDiv(democratCongress))

const senatorsButton = document.createElement('button')
senatorsButton.textContent = 'All Senators'
senatorsButton.addEventListener('click', () => populateSenatorDiv(simpleSenators))

//const RepresentativesButton = document.createElement('button')
//RepresentativesButton.textContent = 'Representatives'
//RepresentativesButton.addEventListener('click', () => populateRepresentativesDiv(simpleRepresentatives))

header.appendChild(maleButton)
header.appendChild(femaleButton)
header.appendChild(republicanButton)
header.appendChild(democratButton)
header.appendChild(senatorsButton)
//header.appendChild(RepresentativesButton)

function removeChildren(parent){
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}


function simplifiedSenators() { //comment: used a function to define which information to grab from the api for the senators
  return senators.map(senator => {
    const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      party: senator.party,
      gender: senator.gender,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
      seniority: +senator.seniority,
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct
    }
  })
}



function populateSenatorDiv(senatorArray) { // comment: used a function to define what to attach to the senatorDiv, like the image and their names
  removeChildren(senatorDiv)
  senatorArray.forEach(senator => {
    const senFigure = document.createElement('figure')
    const figImg = document.createElement('img')
    const figCaption = document.createElement('figcaption')

    figImg.src = senator.imgURL
    figCaption.textContent = senator.name

    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorDiv.appendChild(senFigure)
  })
}

populateSenatorDiv(simpleSenators)

const mostSeniorMember = simplifiedSenators().reduce((acc, senator) => {
  return acc.seniority > senator.seniority ? acc : senator
})

const biggestMissedVotesPct = simplifiedSenators().reduce((acc, senator) => acc.missedVotesPct > senator.missedVotesPct ? acc : senator)


const biggestVacationerList = simplifiedSenators().filter(senator => senator.missedVotesPct === biggestMissedVotesPct.missedVotesPct).map(senator => senator.name).join(' and ')



seniorityHeading.textContent = `The most senior member of the senate is ${mostSeniorMember.name} and the biggest vacationers are ${biggestVacationerList}`


simplifiedSenators().forEach(senator => {
  if(senator.loyaltyPct === 100) {
    let listItem = document.createElement('li')
    listItem.textContent = senator.name
    loyaltyList.appendChild(listItem)
  }
})


//start of representatives (couldn't figure out how to display the representatives and filter through them)
/* function simplifiedRepresentatives() {
     return representatives.map(representative => {
       const middleName = representative.middle_name ? ` ${representative.middle_name} ` : ` `
       return {
         id: representative.id,
         name: `${representative.first_name}${middleName}${representative.last_name}`,
         party: representative.party,
         gender: representative.gender,
         imgURL: `https://www.govtrack.us/static/legislator-photos/${representative.govtrack_id}-200px.jpeg`,
         seniority: +representative.seniority,
         missedVotesPct: representative.missed_votes_pct,
         loyaltyPct: representative.votes_with_party_pct
      }
     })
  }
  
   const simpleRepresentatives = simplifiedRepresentatives()
  
   function populateRepresentativeDiv(representativeArray) {
     representativeArray.forEach(representative => {
       const repFigure = document.createElement('figure')
       const figImg = document.createElement('img')
       const figCaption = document.createElement('figcaption')
  
       figImg.src = representative.imgURL
       figCaption.textContent = representative.name
  
       repFigure.appendChild(figImg)
       repFigure.appendChild(figCaption)
       representativeDiv.appendChild(repFigure)
     })
   }
  
   populateRepresentativeDiv(simpleRepresentatives)
  
   //const mostSeniorMember = simplifiedRepresentative().reduce((acc, representative) => {
   //  return acc.seniority > representative.seniority ? acc : representative
   //})
   */
  
//   const biggestMissedVotesPct = simplifiedRepresentative().reduce((acc, representative) => acc.missedVotesPct > representative.missedVotesPct ? acc : representative)
  
//   // console.log(biggestMissedVotesPct.missedVotesPct)
  
//   const biggestVacationerList = simplifiedRepresentative().filter(representative => representative.missedVotesPct === biggestMissedVotesPct.missedVotesPct).map(representative => representative.name).join(' and ')
  
//   // console.log(biggestVacationerList)
  
//   seniorityHeading.textContent = `The most senior member of the senate is ${mostSeniorMember.name} and the biggest vacationers are ${biggestVacationerList}`
  
  
//   simplifiedRepresentative().forEach(representative => {
//     if(representative.loyaltyPct === 100) {
//       let listItem = document.createElement('li')
//       listItem.textContent = representative.name
//       loyaltyList.appendChild(listItem)
//     }
//   })