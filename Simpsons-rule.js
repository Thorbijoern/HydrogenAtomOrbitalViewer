// Integrates Via Simpson's Rule

//takes function, resolution and range and returns 3D array of values
function simpsonIntegrate (foo, xmin, xmax, ymin, ymax, zmin, zmax, resolution){// number of cubes made is resolution^3
	var coordinates = [];
	var xsteps = (xmax-xmin)/resolution;
	var ysteps = (ymax-ymin)/resolution;
	var zsteps = (zmax-zmin)/resolution;

	var currentx = xmin;
	var currenty = ymin;
	var currentz = zmin;

	var tempcurr;
	var tempmid;
	var tempafter;

	for(var i = 0; i < resolution; i++,currentx += xsteps){
		currenty = ymin;
		for(var j = 0; j < resolution; j++, currenty +=ysteps){
			currentz = zmin;	
			for(var k = 0; k < resolution; k++,currentz += zsteps){
				tempcurr = foo(currentx,currenty,currentz);
				tempmid = foo((currentx+xsteps)/2,(currenty+ysteps)/2,(currentz+zsteps)/2);
				tempafter = foo(currentx+xsteps,currenty+ysteps,currentz+zsteps);
				value = xsteps*ysteps*zsteps*(tempcurr+4*tempmid+tempafter);
				coordinates.push([currentx, currenty, currentz,value]);		
			}
			
		}
		
	}
	
}
