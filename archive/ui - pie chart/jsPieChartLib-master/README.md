# PieChartLib.js
A small JavaScript library that can be used to draw pie charts on an HTML5 canvas element.

###Demo
[View Demo](http://mshamory.github.io/jsPieChartLib/demo/)

###PieChart
An object that controls the settings of the pie chart and draws it to the canvas.

####Arguments
* Canvas Element
* Radius
* X Position of center
* Y Position of center

####Properties
#####ctx
    The 2d context for the canvas element
    Default Value: Uses canvas from constructor
#####radius
    The radius of the pie chart in pixels (including the border)
    Default Value: Uses constructor value
#####center.x
    The x position of the center of the pie chart (in pixels)
    Default Value: Uses constructor value
#####center.y
    The y position of the center of the pie chart (in pixels)
    Default Value: Uses constructor value
#####background
    The background color of the pie chart (not the color of the canvas)
    Default Value: `rgba(255,255,255,1)`
#####border.size
    The size of the border of the pie chart (in pixels)
    Default Value: 10
#####border.color
    The color of the border
    Default Value: rgba(255,255,255,1)
#####shadow.offsetX
    The x-offset of the shadow of the pie chart (in pixels)
    Default Value: 0
#####shadow.offsetY
    The y-offset of the shadow of the pie chart (in pixels)
    Default Value: 0
#####shadow.blur
    The blur amount of the shadow of the pie chart (in pixels)
    Default Value: 10
#####shadow.color
    The color of the shadow (set transparent for no shadow)
    Default Value: rgba(0,0,0,.3)
#####offsetAngle
    The angle of the circle to offset before drawing the first item (as a percentage)
    Default Value: 0
    Note: A value of 0 starts drawing at the top of the circle
#####items
    An array to push PieChartDataItems to
    Default Value: []

####Methods
#####draw()
    Draw the pie chart using the current settings on the canvas

_____

###PieChartDataItem
An Object containing information about a slice of the pie chart

####Arguments
* percent
* color

####Properties
#####percentOfPie
    The percentage of the pie the slice occupys
    Default Value: Uses canvas from constructor
#####color
    The color of the slice
    Default Value: Uses constructor value

_____

###Example
```javascript
var canvas = document.getElementById('canvas');
var graph = new PieChart(canvas, 200, 200, 200);
graph.items.push(new PieChartDataItem(70, "rgb(255, 0, 0)"));
graph.items.push(new PieChartDataItem(30, "rgb(0, 255, 0)"));
graph.draw();
```
