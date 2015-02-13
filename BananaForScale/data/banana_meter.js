
var deltaTop = 0;
// Number of pixel to make a banana. Randomly choosed.
var bRate = 1337;

// Log the start of the script
console.log("Yep, that's a Banana For Scale.");

// Resuming of last time
self.port.on("throwBananas", function(px) {
  console.log("Catching "+(px/bRate)+" bananas. Resuming...");
});

// Catching each pixel scrolled
window.onscroll = function()
{
     var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

     // Scrolling to the top is not considered a valid scroll
     var d = (scrollTop - deltaTop) > 0 ? scrollTop - deltaTop : 0;
     deltaTop = scrollTop;

     self.port.emit("addPixels",d);
}
