window.onload = function()
{
	// create canvas element and append it to document body
	var canvas = document.getElementById('drawZone');
	var container = document.getElementById('canvasContainer');
	var color = document.getElementById('color');
	var thickness = document.getElementById('thickness');
	var eraser = document.getElementById("eraser");
	var clear = document.getElementById("clear");
	
	var drawingColor = '#c0392b';
	var drawingThickness = '5';

	// get canvas 2D context and set him correct size
	var ctx = canvas.getContext('2d');
	resize();

	// last known position
	var pos = { x: 0, y: 0 };
	console.log("init");

	window.addEventListener('resize', resize);
	color.addEventListener('change', changeColor);
	thickness.addEventListener('change', changeThickness);
	clear.addEventListener("click", clearCanvas);
	document.addEventListener('mousemove', draw);
	document.addEventListener('mousedown', setPosition);
	document.addEventListener('mouseenter', setPosition);

	// new position from mouse event
	function setPosition(e) {
		pos.x = e.pageX - canvas.offsetLeft;
		pos.y = e.pageY - canvas.offsetTop;
		
		if(pos.x < 0) pos.x = 0;
		if(pos.x > canvas.width) pos.x = canvas.width;
		if(pos.y < 0) pos.y = 0;
		if(pos.y > canvas.height) pos.y = canvas.height;
	}
	
	// clear the canvas
	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	// change the color of the tool
	function changeColor() {
		drawingColor = color.value;
	}
	
	// change the thickness of the tool
	function changeThickness() {
		drawingThickness = thickness.value;
	}

	// resize canvas
	function resize() {
	  ctx.canvas.width = container.getBoundingClientRect().width;
	  ctx.canvas.height = container.getBoundingClientRect().height;
	}

	function draw(e) {
		// mouse left button must be pressed
		if (e.buttons !== 1) return;
		
		// if we chose the eraser
		/*if(eraser.checked)
		{
			ctx.beginPath();
			ctx.fillStyle="white";
			ctx.rect(pos.x-(drawingThickness*3), pos.y-(drawingThickness*3), drawingThickness*2*3, drawingThickness*2*3);
			setPosition(e);
			ctx.fill();
		}
		else {*/
			ctx.beginPath(); // begin

			ctx.lineWidth = drawingThickness;
			ctx.lineCap = 'round';
			if(eraser.checked) {
				ctx.strokeStyle = "white";
			} else {
				ctx.strokeStyle = drawingColor;
			}

			ctx.moveTo(pos.x, pos.y); // from
			setPosition(e);
			ctx.lineTo(pos.x, pos.y); // to

			ctx.stroke(); // draw it!
		//}
		
	  
	}
}

