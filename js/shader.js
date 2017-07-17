			// Integrates Via Simpson's Rule

			//takes function, resolution and range and returns 3D array of values
			function simpsonIntegrate (foo, xmin, xmax, ymin, ymax, zmin, zmax, resolution){
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
							tempmid = foo(currentx+xsteps/2,currenty+ysteps/2,currentz+zsteps/2);
							tempafter = foo(currentx+xsteps,currenty+ysteps,currentz+zsteps);
							value = xsteps*ysteps*zsteps*(tempcurr+4*tempmid+tempafter)/6;
							if (value < 0){
								coordinates.push([currentx+xsteps/2, currenty+ysteps/2, currentz+zsteps/2,Math.pow(value,2),0x0000ff]);	
							}
							else{
								coordinates.push([currentx+xsteps/2, currenty+ysteps/2, currentz+zsteps/2,Math.pow(value,2),0xff0000]);
							
							}
							
						}
						
					}
					
				}
				return coordinates;
				
			}
			//radial probability functions
			function r(x,y,z){
				return Math.sqrt(Math.pow(x/2,2)+Math.pow(y/2,2)+Math.pow(z/2,2));
			}
			function r10(x,y,z){
				var R = r(x,y,z);
				return Math.exp(-R);
			}
			function r20(x,y,z){
				var R =r(x,y,z);
				return (2-R)*Math.exp(-R/2);
			}
			function r21(x,y,z){
				var R = r(x,y,z);
				return Math.exp(-R/2);
			}
			function r30(x,y,z){
				var R =r(x,y,z);
				return (27-18*R+2*Math.pow(R,2))*Math.exp(-R/3);
			}
			function r31(x,y,z){
				var R =r(x,y,z);
				return (6-R)*Math.exp(-R/3);
			}
			function r32(x,y,z){
				var R =r(x,y,z);
				return Math.exp(-R/3);
			}
			function r40(x,y,z){
				var R =r(x,y,z);
				return (1-3*R/4+Math.pow(R,2)/8-Math.pow(R,3)/192)*Math.exp(-R/4);
			}
			function r41(x,y,z){
				var R = r(x,y,z);
				return (1-R/4+Math.pow(R,2)/80)*Math.exp(-R/4);
			}
			function r42(x,y,z){
				var R = r(x,y,z);
				return (1-R/12)*Math.exp(-R/4);
			}
			function r43(x,y,z){
				var R = r(x,y,z);
				return Math.exp(-R/4);
			}
			//Wave functions go here
			function n1l0m0(x,y,z){
				return 10*r10(x,y,z);
			}
			function n2l0m0(x,y,z){
				return r20(x,y,z);
			}
			function n2l1mNeg1(x,y,z){
				return x*r21(x,y,z);
			}
			function n2l1m0(x,y,z){
				return z*r21(x,y,z);
			}
			function n2l1mPos1(x,y,z){
				return y*r21(x,y,z);
			}
			function n3l0m0(x,y,z){
				return 1.2*r30(x,y,z)/40;
			}
			function n3l1mNeg1(x,y,z){
				return x*r31(x,y,z)/30;
			}
			function n3l1m0(x,y,z){
				return z*r31(x,y,z)/30;
			}
			function n3l1mPos1(x,y,z){
				return y*r31(x,y,z)/30;
			}
			function n3l2mNeg2(x,y,z){
				return x*y*r32(x,y,z)/90;
			}
			function n3l2mNeg1(x,y,z){
				return x*z*r32(x,y,z)/90;
			}
			function n3l2m0(x,y,z){
				return (3*Math.pow(z/2,2)-Math.pow(r(x,y,z),2))*r32(x,y,z)/90;
			}
			function n3l2mPos1(x,y,z){
				return y*z*r32(x,y,z)/90;
			}
			function n3l2mPos2(x,y,z){
				return 2*(Math.pow(x/2,2)-Math.pow(y/2,2))*r32(x,y,z)/90;
			}
			function n4l0m0(x,y,z){
				return 2.1*r40(x,y,z)/6;
			}
			function n4l1mNeg1(x,y,z){
				return x*r41(x,y,z)/18;
			}
			function n4l1m0(x,y,z){
				return z*r41(x,y,z)/18;
			}
			function n4l1mPos1(x,y,z){
				return y*r41(x,y,z)/18;
			}
			function n4l2mNeg2(x,y,z){
				return x*y*r42(x,y,z)/120;
			}
			function n4l2mNeg1(x,y,z){
				return x*z*r42(x,y,z)/120;
			}
			function n4l2m0(x,y,z){
				return (3*Math.pow(z/2,2)-Math.pow(r(x,y,z),2))*r42(x,y,z)/150;
			}
			function n4l2mPos1(x,y,z){
				return y*z*r42(x,y,z)/120;
			}
			function n4l2mPos2(x,y,z){
				return 2*(Math.pow(x/2,2)-Math.pow(y/2,2))*r42(x,y,z)/120;
			}
			function n4l3mNeg3(x,y,z){
				return (Math.pow(x/2,2)-Math.pow(y/2,2))*r43(x,y,z);
			}
			function n4l3mNeg3(x,y,z){
				return 2*(Math.pow(x/2,2)-3*Math.pow(y/2,2))*x*r43(x,y,z)/7000;
			}
			function n4l3mNeg2(x,y,z){
				return x*y*z*r43(x,y,z)/4000;
			}
			function n4l3mNeg1(x,y,z){
				return x*(5*Math.pow(z/2,2)- Math.pow(r(x,y,z),2))*r43(x,y,z)/5000;
			}
			function n4l3m0(x,y,z){
				return z*(5*Math.pow(z/2,2)-3*Math.pow(r(x,y,z),2))*r43(x,y,z)/9000;
			}
			function n4l3mPos1(x,y,z){
				return y*(5*Math.pow(z/2,2)- Math.pow(r(x,y,z),2))*r43(x,y,z)/5000;
			}
			function n4l3mPos2(x,y,z){
				return 2*(Math.pow(x/2,2)-Math.pow(y/2,2))*z*r43(x,y,z)/4000;				
			}
			function n4l3mPos3(x,y,z){
				return 2*(3*Math.pow(x/2,2)-Math.pow(y/2,2))*y*r43(x,y,z)/7000;
			}
			</script>
			<script>
			function cubePos1(posArr) {//Creates float arr vertices
				var positions =new Float32Array(posArr.length*3);
				for (i = 0; i < posArr.length; i++) {
					positions[3*i] = (posArr[i][0]);
					positions[3*i+1]=(posArr[i][1]);
					positions[3*i+2] =(posArr[i][2]);
				}
				return positions;
			}
			function cubeCol(posArr) {
				var colors = new Float32Array(posArr.length*3);
				for (i = 0; i < posArr.length; i++) {
					var color = new THREE.Color(posArr[i][4]);
					colors[3*i] = color.r;
					colors[3*i+1] = color.g;
					colors[3*i+2] = color.b;
				}
				return colors;
			}

			function cubeAlpha(posArr){
				var alphas = new Float32Array(posArr.length);
				for(i = 0; i < posArr.length; i++){
					alphas[i] =posArr[i][3];
				}
				return alphas;
			}

			function cubePos(posArr) {//Creates THREE vector from array of vectors
				var cubeVec =[];
				for (i = 0; i < posArr.length; i++) {
					cubeVec.push([new THREE.Vector3(posArr[i][0],posArr[i][1],posArr[i][2]),posArr[i][3],posArr[i][4]]);
				}
				return cubeVec;
			}
			function cubeSize(resolution,posArr) {
				var sizes =new Float32Array(posArr.length);
				for(var i = 0 ; i<posArr.length; i++){
					sizes[i] = 2.5*range/resolution;
				}
				return sizes;
			}		
			var modelContainer=document.getElementById("model-container");
			modelContainer.style.width = 0.65*window.innerWidth+'px';
			modelContainer.style.height = 0.60*window.innerHeight+'px';

			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, modelContainer.offsetWidth / modelContainer.offsetHeight, 0.1, 1000 );
			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(modelContainer.offsetWidth-5,modelContainer.offsetHeight-5);
			modelContainer.appendChild( renderer.domElement );
			console.log(renderer.domElement)


			uniforms = {
				color:     { type: "c", value: new THREE.Color( 0xffffff ) }
			};
			var shaderMaterial = new THREE.ShaderMaterial( {
				uniforms:       uniforms,
				vertexShader:   document.getElementById( 'vertexshader' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				blending:       THREE.AdditiveBlending,
				depthTest:      false,
				transparent:    true
			});




			var light =  new THREE.PointLight(0xffffff);
			light.position.copy(new THREE.Vector3(0,0,30));
			scene.add(light);

			var resolution = 50;
			var range = 8;
			var n =1;
			var l =0;
			var cameraOffset =10+6*Math.pow(n,2)+2*l;
			var posArr =simpsonIntegrate(n1l0m0,-range,range,-range,range,-range,range,resolution);

			var geometry = new THREE.BufferGeometry();

			
			geometry.addAttribute( 'size',new THREE.BufferAttribute(cubeSize(resolution,posArr),1));
			geometry.addAttribute( 'position', new THREE.BufferAttribute( cubePos1(posArr), 3 ) );
			geometry.addAttribute( 'customColor', new THREE.BufferAttribute( cubeCol(posArr), 3 ) );
			geometry.addAttribute('alpha',new THREE.BufferAttribute(cubeAlpha(posArr),1));

			var particleSystem = new THREE.Points(
				geometry,shaderMaterial);


			scene.add(particleSystem);
			var nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.1,10,10),new THREE.MeshBasicMaterial({color:0xffff00, transparent:true}));

			scene.add(nucleus);

			camera.position.z = 16;

			controls = new THREE.OrbitControls( camera,renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.25;
			controls.enableZoom = true;
			controls.noPan = true;


			window.addEventListener( 'resize', onResize, false );

			function onResize() {
				modelContainer.style.height = 0.60*window.innerHeight+'px';
				modelContainer.style.width = 0.65*window.innerWidth+'px';
				camera.aspect = modelContainer.offsetWidth / modelContainer.offsetHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( modelContainer.offsetWidth-5, modelContainer.offsetHeight-5 );
				render();
			}

			function animate() {
				requestAnimationFrame( animate );
				controls.update();
				light.position.copy(camera.position);
				render();
			}
			function render() {
				renderer.render( scene, camera );
			}
			animate();
			
			function reload() {
				console.log("works");
				n = $("#n option:selected").val();
				l = $("#l option:selected").val();

				cameraOffset =10+6*Math.pow(n,2)+2*l;
				camera.position.z = cameraOffset;
				camera.position.x = 0;
				camera.position.y = 0;

				var waveFunc="n"+n+"l"+$("#l option:selected").val()+"m"+$("#m option:selected").val();


				range = 5+4*Math.pow(n,2)+5*l
				resolution =40+10*n;


				var posArr = simpsonIntegrate(eval(waveFunc),-range,range,-range,range,-range,range,resolution);

				geometry.addAttribute( 'size',new THREE.BufferAttribute(cubeSize(resolution,posArr),1));
				geometry.addAttribute( 'position', new THREE.BufferAttribute( cubePos1(posArr), 3 ) );
				geometry.addAttribute( 'customColor', new THREE.BufferAttribute( cubeCol(posArr), 3 ) );
				geometry.addAttribute('alpha',new THREE.BufferAttribute(cubeAlpha(posArr),1));

				var particleSystem = new THREE.Points(
					geometry,shaderMaterial);
				camera.position.z = cameraOffset;
				camera.position.x = 0;
				camera.position.y = 0;

				reloadChart();
			}
			function reloadChart(){
				yscale = 21-parseInt(document.getElementById('chart-slider').value);
				ctxChart = document.getElementById('myChart').getContext("2d");
				ctxChart.clearRect(0,0,300, 200);
				myGraph = new Graph({
			        canvasId: 'myChart',
			        minX: -range,
			        minY: -yscale,
			        maxX: range,
			        maxY: yscale,//$('chart-slider').val(),
			        unitsPerTick: Math.round(range/5)
	      		});
		      	myGraph.drawEquation(eval('r'+n+l), 'red', 2);
			}