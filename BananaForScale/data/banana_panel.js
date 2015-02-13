
var bRate = 1337;

var gbnn = 0;
var mbnn = 0;
var kbnn = 0;
var bnn = 0;

function showBananas() {
	document.getElementById("bnn").innerHTML = bnn;

	if ( gbnn == 0 && mbnn == 0 && kbnn == 0 )
		return;

	document.getElementById("list").children[2].style.display = "list-item";
  document.getElementById("kbnn").innerHTML = kbnn;

	if ( gbnn == 0 && mbnn == 0 )
		return;

	document.getElementById("list").children[1].style.display = "list-item";
  document.getElementById("mbnn").innerHTML = mbnn;

	if ( gbnn == 0 )
		return;

	document.getElementById("list").children[0].style.display = "list-item";
  document.getElementById("gbnn").innerHTML = gbnn;
}

self.port.on("throwBananas", function(px) {
  var bananas = Math.round((px/bRate) * 100) / 100;
	
	gbnn = Math.floor(bananas / 1000000000);
	mbnn = Math.floor(bananas / 1000000) % 1000;
	kbnn = Math.floor(bananas / 1000) % 1000;
	bnn = Math.floor((bananas % 1000) * 100) / 100;
	showBananas();
});

// I guess I wanted to say "Link" but did a mistake
document.getElementById("zelda").addEventListener("click", function (event) {
  self.port.emit("GoTo9gag",0);
});

document.getElementById("dev").addEventListener("click", function (event) {
  self.port.emit("GoToDevsite",0);
});

document.getElementById("github").addEventListener("click", function (event) {
	self.port.emit("GoToGithub",0);
});
