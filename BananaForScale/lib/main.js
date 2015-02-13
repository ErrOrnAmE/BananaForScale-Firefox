// main.js
// Where all the magic comes from

// All the require stuff

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var ss = require("sdk/simple-storage");
var panels = require("sdk/panel");

// Declare a new button
// Icons CC BY-NC-ND 3.0 http://artbees.net/
var button = buttons.ActionButton({
  id: "my-button",
  label: "Banana For Scale",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

// Declare the good looking panel and it's functions

var panel = panels.Panel({
  contentURL: self.data.url("banana_panel.html"),
  onHide: handleHide,
  contentScriptFile: self.data.url("banana_panel.js")
});
panel.port.on("GoTo9gag",function(n) {
  tabs.open("http://9gag.com/");
});
panel.port.on("GoToDevsite",function(n) {
  tabs.open("http://thibaudcourtoison.fr/");
});
panel.port.on("GoToGithub",function(n) {
  tabs.open("https://github.com/ErrOrnAmE/BananaForScale-Firefox/");
});
panel.port.emit("throwBananas",ss.storage.pixels);

function handleHide() {
  button.state('window', {checked: false});
}

// Function to open the panel
function handleClick(state) {
    panel.port.emit("throwBananas",ss.storage.pixels);
    panel.show({
      position: button
    });
}

// Declare the number of pixels scrolled if not done already
if (!ss.storage.pixels) {
	ss.storage.pixels = 0;
}

// Attach the script to the 9gag page
pageMod.PageMod({
  include: "*.9gag.com",
  contentScriptFile: self.data.url("banana_meter.js"),
	attachTo: 'top',
	onAttach: function(worker) {
    		worker.port.emit("throwBananas",ss.storage.pixels);
		worker.port.on("addPixels", function(px) {
			ss.storage.pixels += px;
			panel.port.emit("throwBananas",ss.storage.pixels);
		});
  }
});


/* TODO:
	-   - Make a Git Repo.

	-   - Make a good Website for this plugin
	-   - Make a chrome plugin
*/
