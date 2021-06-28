// Check if PieChartLib.js is included and the correct version
if (typeof PIECHARTLIB == "undefined" || PIECHARTLIB != "0.1.0") {
  alert("Error: This demo requires PieChartLib.js version 0.1.0 to function properly!");
}

// Add event listeners for window
window.addEventListener("load", initializeDocument, false);
window.addEventListener("scroll", YScroll, false);
window.addEventListener("resize", resizeCanvas, false);


// Globally used variables
var mychart;

// Initiate global variables and set up the document
function initializeDocument() {
  var ctx = document.getElementById('display').getContext("2d");
  mychart = new PieChart(ctx.canvas, ctx.canvas.height / 2 - 80, ctx.canvas.width / 2, ctx.canvas.height / 2);
  resizeCanvas();
  if (sessionStorage.getItem("items") != null){
    var items = JSON.parse(sessionStorage.getItem("items"));
    for (var i = 0; i < items.length; i++) {
      addItem(items[i].percentOfPie, items[i].color);
    }
  } else {
    addItem(100, "#0080c0");
  }
}

// Helper function to check if input is a number
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Update the items in the PieChart object and set the session information
function updateItems() {
  // Get the items
  var items = document.getElementsByClassName('item');

  // Update each item in the PieChart object
  for (var i = 0; i < items.length; i++) {
    // Check that the percentage entered is a number
    var arcAngle = items[i].getElementsByTagName('input')[2].value;
    if (!isNumeric(arcAngle) || arcAngle > 100 || arcAngle < 0) {
      console.error("Item " + i + " does not have a proper percentage value!");
    } else {
      mychart.items[i].percentOfPie = arcAngle;
      mychart.items[i].color = items[i].getElementsByTagName('input')[0].value;
    }
  }

  // Redraw the chart and update the session information
  mychart.draw();
  syncSession();
}

function addItem(percentOfPie, color) {
  // Make sure the percent of pie is valid
  if (!isNumeric(percentOfPie) || percentOfPie < 0 || percentOfPie > 100) {
    console.error("Error: New item has invalid percentage!");
    return;
  }

  // Get a copy of the template for items
  var content = document.querySelector('template').content;

  // Set the new item's properties
  content.querySelector('input:nth-child(1)').value = color;
  content.querySelector('input:nth-child(2)').value = "Item " + (document.getElementsByClassName('item').length + 1);
  content.querySelector('input:nth-child(3)').value = percentOfPie;

  // Add the item to the document
  document.getElementById('items').appendChild(document.importNode(content, true));

  // Add a new PieChartDataItem to the PieChart object
  mychart.items.push(new PieChartDataItem(percentOfPie, color));

  // Redraw the chart and update the session information
  mychart.draw();
  syncSession();
}

function removeItem(item) {
  // Get the index of the item to remove
  var items = item.parentNode.getElementsByClassName('item');
  var index = -1;
  for (var i = 0; i < items.length; i++) {
    if (items[i] == item) {
      index = i;
      break;
    }
  }

  //If the item was not found, throw an error
  if (index == -1) {
    console.error("Error: Requested item could not be deleted.");
    return;
  }

  // Delete the item at the proper index
  mychart.items.splice(index, 1);

  // Remove the item from the document
  item.parentNode.removeChild(item);

  // Redraw the chart and update the session information
  mychart.draw();
  syncSession();
}

// Sync the current items to the session data
function syncSession() {
  // Not yet implemented
  sessionStorage.setItem("items", JSON.stringify(mychart.items));
}

function resizeCanvas() {
  var content = document.getElementById('content');
  var display = document.getElementById('display');

  // Fit the size of the canvas to the minimum of the width and height
  var size = Math.min(content.clientHeight, content.clientWidth);

  // For vertical resolutions, center the canvas vertically
  if (display.clientHeight < content.clientHeight) {
    display.style.marginTop = (content.clientHeight - display.clientHeight) / 2 + "px";
  } else {
    display.style.marginTop = "0px";
  }

  // Scale the canvas (later ask for size)
  size *= 2;
  mychart.radius = size / 2 - 80;
  mychart.center.x = size / 2;
  mychart.center.y = size / 2;
  mychart.ctx.canvas.height = size;
  mychart.ctx.canvas.width = size;
  mychart.draw();
}

// Parallax effect for window scroll event
function YScroll() {
  var YPos = window.pageYOffset;
  var content = document.getElementById('content');
  content.style.top = 0 - YPos/2 + "px";
}

// Sets the dowload link for the pie chart canvas
function downloadImage() {
  document.getElementById('download').href = mychart.ctx.canvas.toDataURL('image/png');
}
