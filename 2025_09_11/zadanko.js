let names = ["Heniek", "Janek", "Radzik", "Maciej"];
let ages = [27,21,46,18];
const city = "Skalica";

function greetings(){
	for (el in names){
	if (ages[el] > 25){
		console.log("Hej, jestem " + names[el] + " z miasta " + city + "! Mam " +  ages[el] + " lat, więc jestem stary chłop");
	}
	else {
		console.log("Hej, jestem " + names[el] + " z miasta " + city + "! Mam " +  ages[el] + " lat, więc jestem młody dzieciak");
	}
	}
}

function ageup(num){
	ages[num] +=1;
	console.log(names[num] + " ma teraz " + ages[num] + " lat!");
}

function newguy(name, age){
	names.push(name);
	ages.push(age);
}

function calculateage(){
	let all = 0
	for (el of ages){
		all = all + el;
	}
	console.log(all);
}


greetings();

for (let i = 0; i<8; i++){
	ageup(1);
}

newguy("Jonatan", 24);
calculateage();

greetings();



