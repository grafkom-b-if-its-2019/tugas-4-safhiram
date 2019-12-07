(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  var theta = [0.0, 0.0, 0.0];
  var translate = [0.0, 0.0, 0.0];

  var scale = 0;
  var tambah = 0.0100;

  var tambahX = 0.01;
  var tambahY = 0.01;
  var tambahZ = 0.01;
  
  var rotasiTambah = 0.5;
  var axis = 0;
  var xAxis = 0;
  var yAxis = 1;
  var zAxis = 2;

  var canvas = document.getElementById("glcanvas");
  var gl = glUtils.checkWebGL(canvas);

  function main() {
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
        fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
        fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);
    init1();
  }

  function init1() {
      clear();
      drawTri(gl.TRIANGLE_STRIP, 1, program2)
      drawLine(gl.LINES, program)
      requestAnimationFrame(init1); 
  }

  function clear()
  {
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
  }

  function drawTri(type, mode, program) {
    var n = initBuffersTri(mode,  program);
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(type, 0, n);
  }

  function drawLine(type, program) {
    var n = initBuffersLine(program);
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(type, 0, n);
  }

  function initBuffersLine(program) {

    var cubeVertices = [
    
      -0.5, 0.5,  0.5,   1.0, 1.0, 1.0, 
      -0.5, -0.5, 0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  0.5,   1.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  0.5,   1.0, 1.0, 1.0,
 
      0.5,  0.5,  0.5,   1.0, 1.0, 1.0, 
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   1.0, 1.0, 1.0,
 
      0.5, -0.5,  0.5,   0.0, 1.0, 1.0, 
      -0.5, -0.5, 0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   0.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   0.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   0.0, 1.0, 1.0,
 
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0, 
      -0.5, 0.5,  -0.5,   0.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   0.0, 1.0, 1.0,
      -0.5, 0.5,  -0.5,   0.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   0.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   0.0, 1.0, 1.0,
 
      -0.5, 0.5,  -0.5,   0.0, 1.0, 1.0, 
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   0.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   0.0, 1.0, 1.0,
      -0.5, 0.5,  -0.5,   0.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   0.0, 1.0, 1.0,
 
       0.5,  0.5, -0.5,  0.0, 1.0, 1.0, 
      -0.5, 0.5,  -0.5,  0.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   0.0, 1.0, 1.0,
      -0.5, 0.5,  -0.5,  0.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   0.0, 1.0, 1.0,
       0.5, 0.5,  0.5,   0.0, 1.0, 1.0,
       0.5,  0.5, -0.5,  0.0, 1.0, 1.0,
       0.5, 0.5,  0.5,   0.0, 1.0, 1.0,
 
     ];

    n = cubeVertices.length/6;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

    // Definisi view dan projection
    var viewLoc = gl.getUniformLocation(program, 'view');
    var projectionLoc = gl.getUniformLocation(program, 'projection');

    var view = glMatrix.mat4.create();
    var projection = glMatrix.mat4.create();
    // console.log(projection);

    glMatrix.mat4.lookAt(view,
      glMatrix.vec3.fromValues(0.0, 0.0, -0.5),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
    );

    var fovy = glMatrix.glMatrix.toRadian(90.0);
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 10.0;
    glMatrix.mat4.perspective(projection,
      fovy,
      aspect,
      near,
      far
    );

    gl.uniformMatrix4fv(viewLoc, false, view);
    gl.uniformMatrix4fv(projectionLoc, false, projection);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');

    function onKeyPress(event) {

      if (event.keyCode == 88 || event.keyCode == 120) {
        axis = xAxis;
      } else if (event.keyCode == 89 || event.keyCode == 121) {
        axis = yAxis;
      } else if (event.keyCode == 90 || event.keyCode == 122) {
        axis = zAxis;
      }
    }
    document.addEventListener('keypress', onKeyPress);

    theta[axis] += rotasiTambah;  // dalam derajat
        gl.vertexAttribPointer(
          vPosition,  // variabel yang memegang posisi attribute di shader
          3,          // jumlah elemen per attribute
          gl.FLOAT,   // tipe data atribut
          gl.FALSE,
          6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
          0                                   // offset dari posisi elemen di array
        );
        
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
          6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

        var thetaLoc = gl.getUniformLocation(program, 'theta');

        gl.uniform3fv(thetaLoc, theta);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);
    return n;
  }

  function initBuffersTri(mode, program) {
    var triangleVertices = new Float32Array([
      -0.3,+0.0,   1.0,1.0,0.0,
      -0.2,+0.1,   0.7,0.0,1.0,
      +0.2,+0.0,    0.1,1.0,0.6,
      +0.12,+0.1,  1.0,1.0,0.0,
      +0.4,+0.3,    0.7,0.0,1.0,
      +0.2,+0.2,   0.1,1.0,0.6,
      +0.1,+0.3,  1.0,1.0,0.0,
      -0.1,+0.2,   0.7,0.0,1.0,
      +0.2,+0.4,   0.1,1.0,0.6,
      +0.2,+0.5,  1.0,1.0,0.0,
      +0.5,+0.4,   0.7,0.0,1.0,
      +0.55,+0.5, 0.1,1.0,0.6, 
    ]);

    var n = triangleVertices.length/5;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var viewLoc = gl.getUniformLocation(program, 'view');
    var projectionLoc = gl.getUniformLocation(program, 'projection');

    var view = glMatrix.mat4.create();
    var projection = glMatrix.mat4.create();

    glMatrix.mat4.lookAt(view,
      glMatrix.vec3.fromValues(0.0, 0.0, -0.5),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
    );

    var fovy = glMatrix.glMatrix.toRadian(90.0);
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 10.0;
    glMatrix.mat4.perspective(projection,
      fovy,
      aspect,
      near,
      far
    );

    gl.uniformMatrix4fv(viewLoc, false, view);
    gl.uniformMatrix4fv(projectionLoc, false, projection);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');

    function onKeyPress(event) {

      if (event.keyCode == 88 || event.keyCode == 120) {
        axis = xAxis;
      } else if (event.keyCode == 89 || event.keyCode == 121) {
        axis = yAxis;
      } else if (event.keyCode == 90 || event.keyCode == 122) {
        axis = zAxis;
      }
    }
    document.addEventListener('keypress', onKeyPress);

    theta[axis] += rotasiTambah;  // dalam derajat

        var scaleLocation = gl.getUniformLocation(program, 'scale');
        gl.uniform1f(scaleLocation, scale);
        if (scale > 1){
          tambah = -0.0027
        }
        else if (scale < -1){
          tambah = 0.0027
        }

        scale += tambah;
        
        gl.vertexAttribPointer(
            vPosition, // Variable yang memegang posisi atribut di shader
            2, // Jumlah element per attribut
            gl.FLOAT, // tipe data attribut
            gl.FALSE, 
            5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
            0 //offset dari posisi elemen di array
        );
    
        gl.vertexAttribPointer(
            vColor,
            3,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            2 * Float32Array.BYTES_PER_ELEMENT
        );
          perpindahan(program, translate);
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);
    return n;
  }

  function perpindahan(program,translate){

        //translasi terhadap x
        if (translate[0] + 0.55 > 0.5*5 || translate[0] + 0.55 < -0.5*5 ) {
          tambahX *= -1;
        }
        translate[0] += tambahX;

        var middleLoc = gl.getUniformLocation(program, 'middle_coorinates');
        middle_coordinates = 0.25 + translate[0];

        gl.uniform1f(middleLoc, middle_coordinates);

        //translasi terhadap y
        if (translate[1] + 0.5 > 0.5*5 || translate[1] + -0.5 < -0.5*5 ) {
          tambahY *= -1;
        }
        translate[1] += tambahY;

        //translasi terhadap z
        if (translate[2] > 0.5*0.5 || translate[2] < -0.5*0.5 ) {
          tambahZ *= -1;
        }
        translate[2] += tambahZ;

        var translationLoc = gl.getUniformLocation(program, 'translate');

        gl.uniform3fv(translationLoc, translate);

        var thetaLoc = gl.getUniformLocation(program, 'theta');

        gl.uniform3fv(thetaLoc, theta);
  }

  function resizer(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

})();