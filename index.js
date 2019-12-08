(function() {

  glUtils.SL.init({ callback: function() { main(); } });
  function main() {
    var theta = [0, 0, 0];
    var translate = [0, 0, 0];
    var tengah = [0.5, -0.3, 0];
    var lastX, lastY, dragging;
    var scale = 0;
    var tambah = 0.0027;
    var tambahX = 0.01;
    var tambahY = 0.01;
    var tambahZ = 0.01;
    var xAxis = 0;
    var yAxis = 1;
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
        fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
        fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
        program1 =glUtils.createProgram(gl, vertexShader, fragmentShader);
        program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);

    init1();


    //melakukan inisialisasi yang akan digambar dan fungsi rendernya
    function init1() {    
        clear();
        drawTri(program2);
        drawLine(program1);
        requestAnimationFrame(init1);
    }

    //fungsi untuk membersihkan layar
    function clear()
    {
      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
    }

    //fungsi untuk gambar huruf
    function drawTri(program) {
      var n = initBuffersTri(program);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    }

    //fungsi untuk menggambar kubus
    function drawLine(program) {
      var n = initBuffersLine(program);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(gl.TRIANGLES, 0, n);
    }

    //fungsi untuk pergerakan mouse
    function onMouseDown(event) {
      var x = event.clientX;
      var y = event.clientY;
      var rect = event.target.getBoundingClientRect();
      if (rect.left <= x &&
          rect.right > x &&
          rect.top <= y &&
          rect.bottom > y) {
            lastX = x;
            lastY = y;
            dragging = true;
      }
    }
    function onMouseUp(event) {
      dragging = false;
    }
    function onMouseMove(event) {
      var x = event.clientX;
      var y = event.clientY;
      if (dragging) {
        var factor = 10 / canvas.height;
        var dx = factor * (x - lastX);
        var dy = factor * (y - lastY);
        theta[yAxis] += dx;
        theta[xAxis] += dy;
      }
      lastX = x;
      lastY = y;
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    //fungsi inisialisasi texture untuk cube
    function initTexture(texture) {
      var imageSource = 'images/Group.jpg';
      var image = new Image();
      if (!image) {
        reject(new Error('Gagal membuat objek gambar'));
      }
      image.onload = function() {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      }
      image.src = imageSource;
    }

    //fungsi scale
    function tambahscale()
    {
      if (scale > 1){
        tambah = -0.0027
      }
      else if (scale < -1){
        tambah = 0.0027
      }
      scale += tambah;
    }

    //fungsi transisi
    function perpindahan(translate){
       //translasi terhadap x
       if (translate[0] + 0.2 > 0.55 || translate[0] - 0.2 < -0.55 ) {
        tambahX *= -1;
      }
      translate[0] += tambahX;

      tengah += translate[0];

       //translasi terhadap y
      if (translate[1] + 0.18 > 0.55 || translate[1] - 0.18 < -0.55 ) {
        tambahY *= -1;
      }
      translate[1] += tambahY;

       //translasi terhadap z
      if (translate[2] > 0.55 || translate[2] < -0.55 ) {
        tambahZ *= -1;
      }
      translate[2] += tambahZ;
    }

    //fungsi menambahkan cahaya
    function cahaya(program){
      var lightColorLoc = gl.getUniformLocation(program, 'lightColor');
      var lightPositionLoc = gl.getUniformLocation(program, 'lightPosition');
      var ambientColorLoc = gl.getUniformLocation(program, 'ambientColor');
      var lightColor = [1, 1, 1];
      var lightPosition = [translate[0], translate[1], -2 + translate[2]];
      //nrp 154027
      var ambientColor = glMatrix.vec3.fromValues(0.15, 0.40, 0.27);
      gl.uniform3fv(lightColorLoc, lightColor);
      gl.uniform3fv(lightPositionLoc, lightPosition);
      gl.uniform3fv(ambientColorLoc, ambientColor);
    }

    function initBuffersLine(program) {
              
    var cubeVertices = [

     -0.5, -0.5, -0.5,     0.2, 1.0,  0.0, 0.0, -1.0, 
     -0.5,  0.5, -0.5,     0.2, 0.0,  0.0, 0.0, -1.0,
      0.5,  0.5, -0.5,     0.4, 0.0,  0.0, 0.0, -1.0,
     -0.5, -0.5, -0.5,     0.2, 1.0,  0.0, 0.0, -1.0,
      0.5,  0.5, -0.5,     0.4, 0.0,  0.0, 0.0, -1.0,
      0.5, -0.5, -0.5,     0.4, 1.0,  0.0, 0.0, -1.0,

      0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0, 
      0.5, -0.5,  0.5,     0.0, 0.0,  1.0, 0.0, 0.0,
      0.5, -0.5, -0.5,     0.1, 0.0,  1.0, 0.0, 0.0,
      0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0,
      0.5, -0.5, -0.5,     0.1, 0.0,  1.0, 0.0, 0.0,
      0.5,  0.5, -0.5,     0.1, 1.0,  1.0, 0.0, 0.0,

      0.5, -0.5,  0.5,     0.1, 1.0,  0.0, -1.0, 0.0, 
     -0.5, -0.5,  0.5,     0.1, 0.0,  0.0, -1.0, 0.0,
     -0.5, -0.5, -0.5,     0.2, 0.0,  0.0, -1.0, 0.0,
      0.5, -0.5,  0.5,     0.2, 1.0,  0.0, -1.0, 0.0,
     -0.5, -0.5, -0.5,     0.2, 0.0,  0.0, -1.0, 0.0,
      0.5, -0.5, -0.5,     0.2, 1.0,  0.0, -1.0, 0.0,

     -0.5,  0.5, -0.5,     0.4, 1.0,  -1.0, 0.0, 0.0, 
     -0.5, -0.5, -0.5,     0.4, 0.0,  -1.0, 0.0, 0.0,
     -0.5, -0.5,  0.5,     0.6, 0.0,  -1.0, 0.0, 0.0,
     -0.5,  0.5, -0.5,     0.4, 1.0,  -1.0, 0.0, 0.0,
     -0.5, -0.5,  0.5,     0.6, 0.0,  -1.0, 0.0, 0.0,
     -0.5,  0.5,  0.5,     0.6, 1.0,  -1.0, 0.0, 0.0,

      0.5,  0.5, -0.5,     0.6, 1.0,  0.0, 1.0, 0.0, 
     -0.5,  0.5, -0.5,     0.6, 0.0,  0.0, 1.0, 0.0,
     -0.5,  0.5,  0.5,     0.8, 0.0,  0.0, 1.0, 0.0,
      0.5,  0.5, -0.5,     0.6, 1.0,  0.0, 1.0, 0.0,
     -0.5,  0.5,  0.5,     0.8, 0.0,  0.0, 1.0, 0.0,
      0.5,  0.5,  0.5,     0.8, 1.0,  0.0, 1.0, 0.0
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
      var mmLoc = gl.getUniformLocation(program, 'model');
      var view = glMatrix.mat4.create();
      var projection = glMatrix.mat4.create();

      glMatrix.mat4.lookAt(view,
        glMatrix.vec3.fromValues(0.0, 0.0, -0.5),    // posisi kamera
        glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
        glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
      );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.3;
      var far = 12.0;
      glMatrix.mat4.perspective(projection,
        fovy,
        aspect,
        near,
        far
      );

      gl.uniformMatrix4fv(viewLoc, false, view);
      gl.uniformMatrix4fv(projectionLoc, false, projection);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vNormal = gl.getAttribLocation(program, 'vNormal');
      
      //memberikan cahaya ke cube
      cahaya(program);
      
      var vTexCoord = gl.getAttribLocation(program, 'vTexCoord');
        gl.vertexAttribPointer(
          vPosition,  // variabel yang memegang posisi attribute di shader
          3,          // jumlah elemen per attribute
          gl.FLOAT,   // tipe data atribut
          gl.FALSE,
          8 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
          0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 
          8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(vTexCoord);

        
        var mm = glMatrix.mat4.create();
        glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);
        gl.uniformMatrix4fv(mmLoc, false, mm);
        
        // Uniform untuk tekstur
        var sampler0Loc = gl.getUniformLocation(program, 'sampler0');
        gl.uniform1i(sampler0Loc, 0);

        // Inisialisasi tekstur
        var texture = gl.createTexture();
  
        gl.activeTexture(gl.TEXTURE0);
        initTexture(texture);
      
      gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);

      var nmLoc = gl.getUniformLocation(program, 'normalMatrix');

      //perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

      //rotasi matrix
      var mvpLoc = gl.getUniformLocation(program, 'MVPMatrix');
      var mvp = glMatrix.mat4.create();
      glMatrix.mat4.multiply(mvp,view,mm);
      glMatrix.mat4.multiply(mvp,projection,mvp);
      glMatrix.mat4.rotateY(mvp, mvp, theta[yAxis]);
      glMatrix.mat4.rotateX(mvp, mvp, theta[xAxis]);

      gl.uniformMatrix4fv(mvpLoc, false, mvp);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vNormal);
      return n;
    }

    function initBuffersTri(program) {
      
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

      // Definisi view dan projection
      var viewLoc = gl.getUniformLocation(program, 'view');
      var projectionLoc = gl.getUniformLocation(program, 'projection');
      var mmLoc = gl.getUniformLocation(program, 'model');
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
      var vNormal = gl.getAttribLocation(program, 'vNormal');
      
      //memberikan cahaya pada huruf
      cahaya(program);

      var vColor = gl.getAttribLocation(program, 'vColor');
      //menambah scale pada huruf
      tambahscale();

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

      //perpindahan posisi
       perpindahan(translate);

        var mm = glMatrix.mat4.create();
        glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);
        glMatrix.mat4.translate(mm, mm, translate);
        glMatrix.mat4.scale(mm, mm, [0.2, 0.2, 0.2]);
        glMatrix.mat4.scale(mm, mm, [scale, 1.0, 1.0]);
        gl.uniformMatrix4fv(mmLoc, false, mm);
        
        gl.enableVertexAttribArray(vColor);
      
      gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);

      //perhitungan modelMatrix untuk vektor normal
      var nmLoc = gl.getUniformLocation(program, 'normalMatrix');

      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

      //rotasi matrix
      var mvpLoc = gl.getUniformLocation(program, 'MVPMatrix');
      var mvp = glMatrix.mat4.create();
      glMatrix.mat4.multiply(mvp,view,mm);
      glMatrix.mat4.multiply(mvp,projection,mvp);
      glMatrix.mat4.rotateY(mvp, mvp, theta[yAxis]);
      glMatrix.mat4.rotateX(mvp, mvp, theta[xAxis]);

      gl.uniformMatrix4fv(mvpLoc, false, mvp);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vNormal);
      return n;
    }


  }

})();
