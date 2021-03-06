//document.body.style.backgroundColor = "black";
document.body.style.backgroundImage = "url('cyber-1481752.png')";
document.body.style.backgroundSize = "cover";



// matrix stuff
// from https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web
function multiplyMatrixAndPoint(matrix, point) {

	//a point is really like a vector
  
  //Give a simple variable name to each part of the matrix, a column and row number
  var c0r0 = matrix[ 0], c1r0 = matrix[ 1], c2r0 = matrix[ 2], c3r0 = matrix[ 3];
  var c0r1 = matrix[ 4], c1r1 = matrix[ 5], c2r1 = matrix[ 6], c3r1 = matrix[ 7];
  var c0r2 = matrix[ 8], c1r2 = matrix[ 9], c2r2 = matrix[10], c3r2 = matrix[11];
  var c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15];
  
  //Now set some simple names for the point
  var x = point[0];
  var y = point[1];
  var z = point[2];
  var w = point[3];
  
  //Multiply the point against each part of the 1st column, then add together
  var resultX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3);
  
  //Multiply the point against each part of the 2nd column, then add together
  var resultY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3);
  
  //Multiply the point against each part of the 3rd column, then add together
  var resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3);
  
  //Multiply the point against each part of the 4th column, then add together
  var resultW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3);
  
  return [resultX, resultY, resultZ, resultW];
}

function multiplyMatrices(matrixA, matrixB) {
  // Slice the second matrix up into columns
  var column0 = [matrixB[0], matrixB[4], matrixB[8], matrixB[12]];
  var column1 = [matrixB[1], matrixB[5], matrixB[9], matrixB[13]];
  var column2 = [matrixB[2], matrixB[6], matrixB[10], matrixB[14]];
  var column3 = [matrixB[3], matrixB[7], matrixB[11], matrixB[15]];
  
  // Multiply each column by the matrix, calling other function
  var result0 = multiplyMatrixAndPoint(matrixA, column0);
  var result1 = multiplyMatrixAndPoint(matrixA, column1);
  var result2 = multiplyMatrixAndPoint(matrixA, column2);
  var result3 = multiplyMatrixAndPoint(matrixA, column3);
  
  // Turn the result columns back into a single matrix
  return [
    result0[0], result1[0], result2[0], result3[0],
    result0[1], result1[1], result2[1], result3[1],
    result0[2], result1[2], result2[2], result3[2],
    result0[3], result1[3], result2[3], result3[3]
  ];
}

  var sin = Math.sin;
  var cos = Math.cos;

function rotateAroundXAxis(a) {
  return [
       1,       0,        0,     0,
       0,  cos(a),  -sin(a),     0,
       0,  sin(a),   cos(a),     0,
       0,       0,        0,     1
  ];
}

// translation matrix
function translate(x, y, z) {
	return [
	    1,    0,    0,   0,
	    0,    1,    0,   0,
	    0,    0,    1,   0,
	    x,    y,    z,   1
	];
}

// Create the matrix3d style property from a matrix array
function matrixArrayToCssMatrix(array) {
  return 'matrix3d(' + array.join(',') + ')';
}

// initialize cube
var cubeSetup = function() {
	var w = (window.innerHeight)*.80;
	var h = (window.innerHeight)*.80;

	// var w = 1200;
	// var h = 600;

	console.log(w + " " + h)

	// set sizes of scene
	document.getElementById("scene").style.width = w + "px";
	document.getElementById("scene").style.height = h + "px";

	// set perspective = 4w
document.getElementById("scene").style.perspective =  w*4 + "px";

	// set the sizes of the cube 
	document.getElementById("cube").style.height = h + "px";
	document.getElementById("cube").style.width = w + "px";

	// set cube translate = h/2
	// document.getElementById("cube").style.transform = "perspective(" + w*4 + "px)";
	var trans = translate(0, 0, (-1*h/2));
	var rot = rotateAroundXAxis( 0 );
	var mat = multiplyMatrices(rot, trans);
	var matstyle = matrixArrayToCssMatrix(mat);
	document.getElementById("cube").style.transform = matstyle;

	// set the size of the faces
	var faces = document.getElementById("cube").getElementsByClassName('side');
	for (i = 0; i < faces.length; i++) {
		faces[i].style.width = w + "px";
		faces[i].style.height = h + "px";
		// faces[i].style.transform = "perspective(" + w*4 + "px)";
		// faces[i].style.transform = "transformOrigin(50% 50% " + -1*h/2 + "px)";
	}

	// set face rotations
	/*
		.back {
			transform: translateZ(-300px) rotateX(180deg);
		}
		.top {
			transform: translateY(-300px) rotateX(90deg);
		}
		.bottom {
			transform: translateY(300px) rotateX(270deg);
		}
		.front {
			transform: translateZ(300px);
		}
	*/
	// set the size of the faces

	var trans = translate(0, 0, (-1*h/2));
	var rot = rotateAroundXAxis( Math.PI );
	var mat = multiplyMatrices(rot, trans);
	var matstyle = matrixArrayToCssMatrix(mat);

	var faces1 = document.getElementById("cube").getElementsByClassName('side back');
	faces1[0].style.transform = matstyle;

	var trans = translate(0, (-1*h/2), 0);
	var rot = rotateAroundXAxis( Math.PI /2);
	var mat = multiplyMatrices(rot, trans);
	var matstyle = matrixArrayToCssMatrix(mat);

	var faces2 = document.getElementById("cube").getElementsByClassName('side top');
	faces2[0].style.transform = matstyle;


	var trans = translate(0, h/2, 0);
	var rot = rotateAroundXAxis( Math.PI *3/2);
	var mat = multiplyMatrices(rot,trans);
	var matstyle = matrixArrayToCssMatrix(mat);

	var faces3 = document.getElementById("cube").getElementsByClassName('side bottom');
	faces3[0].style.transform = matstyle;

	var faces4 = document.getElementById("cube").getElementsByClassName('side front');
	faces4[0].style.transform = "translateZ(" + (h/2) + "px)";

}

// centering splash logo and intro
var center = function() {
	cubeSetup();
}

if ( document.readyState === "complete" || ( document.readyState !== "loading" && !document.documentElement.doScroll )) {
	center();
} else {
	document.addEventListener("DOMContentLoaded", center);
}

// handle resize
window.onresize = function(event) {
	center();
};

var xAngle = 0, yAngle = 0;
document.addEventListener('keydown', function(e) {
  switch(e.keyCode) {

    case 37: // left
      yAngle -= 90;
      break;

    case 38: // up
      xAngle += 90;
      break;

    case 39: // right
      yAngle += 90;
      break;

    case 40: // down
      xAngle -= 90;
      break;
  };

  document.getElementById("cube").style.webkitTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
}, false);