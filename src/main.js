var cubeRotation = 0.0;

//
// Start here
//

var player;
var police1;
var floor1 = [];
var floor2 = [];
var floor3 = [];

var wall1 = [];
var wall2 = [];

var wall1_amb = [];
var wall2_amb = [];

var coin_array = [];

var barricade_array = [];
var barricade_s_array = [];
var barricade_u_array = [];

var train_array = [];

var flyBoost1;
var flyBoost2;

var jumpBoost_array = [];

var rightPressed = false;
var leftPressed = false;
var jumpPressed = false;
var downPressed = false;
var GPressed = false;

var timer = 300;
var timer2 = 300;
var count_hit = 0;

var hit = 0;

var gray = 0;
var score = 0;

var change = 0;
main();

function main() {


  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  const texture1 = loadTexture(gl, '../src/i1.jpg');
  const texture2 = loadTexture(gl, '../src/train_track.jpg');
  const texture3 = loadTexture(gl, '../src/wall.jpeg');
  const texture4 = loadTexture(gl, '../src/yellow.jpg');
  const texture5 = loadTexture(gl, '../src/b1.jpeg');
  const texture6 = loadTexture(gl, '../src/iron.jpeg');
  const texture7 = loadTexture(gl, '../src/red.jpg');
  const texture8 = loadTexture(gl, '../src/box1.png');
  const texture9 = loadTexture(gl, '../src/box2.png');
  const texture10 = loadTexture(gl, '../src/crate.jpeg')


  player = new cube(gl, [0, -4.0, 0.0]);
  police1 = new police(gl, [0, -4.0, 3.0]);

  flyBoost1 = new flyBoost(gl, [-2.0, -4.0, -40.0]);
  flyBoost2 = new flyBoost(gl, [2.0, -4.0, -100.0]);

  // jumpBoost1 = new jumpBoost(gl, [2.0, -4.0, -40.0]);
  // floor1 = new ground(gl, [0, -5.0, 0.0]);
  for (var i = 0; i <= 1000; i+= 2) 
  {
    floor1.push(new ground(gl, [0, -5.0, -i]));
  }

  for (var i = 0; i <= 1000; i+= 2) 
  {
    floor2.push(new ground(gl, [-2, -5.0, -i]));
  }

  for (var i = 0; i <= 1000; i+= 2) 
  {
    floor3.push(new ground(gl, [2, -5.0, -i]));
  }

  for (var i = 0; i <= 1000; i+= 2) 
  {
    wall1.push(new wall(gl, [3.0, -5.0, -i]));
  }

  for (var i = 0; i <= 1000; i+= 2) 
  {
    wall2.push(new wall(gl, [-3.0, -5.0, -i]));
  }

  for (var i = 0; i <= 1000; i+= 2) 
  {
    wall1_amb.push(new wall_amb(gl, [3.0, -5.0, -i]));
  }

  for (var i = 0; i <= 1000; i+= 2) 
  {
    wall2_amb.push(new wall_amb(gl, [-3.0, -5.0, -i]));
  }

  for (var i = 10; i <= 1000; i+= 50) 
  {
    coin_array.push(new coin(gl, [2.0, -4.0, -i]));
    coin_array.push(new coin(gl, [2.0, -4.0, -(i+2)]));
    coin_array.push(new coin(gl, [2.0, -4.0, -(i+4)]));
  }

  for (var i = 30; i <= 1000; i+= 60) 
  {
    coin_array.push(new coin(gl, [-2.0, -4.0, -i]));
    coin_array.push(new coin(gl, [-2.0, -4.0, -(i+2)]));
    coin_array.push(new coin(gl, [-2.0, -4.0, -(i+4)]));
  }

  for (var i = 20; i <= 1000; i+= 70) 
  {
    coin_array.push(new coin(gl, [0.0, -4.0, -i]));
    coin_array.push(new coin(gl, [0.0, -4.0, -(i+2)]));
    coin_array.push(new coin(gl, [0.0, -4.0, -(i+4)]));
  }

  for (var i = 10; i <= 1000; i+= 50) 
  {
    coin_array.push(new coin(gl, [2.0, 1.0, -i]));
    coin_array.push(new coin(gl, [2.0, 1.0, -(i+2)]));
    coin_array.push(new coin(gl, [2.0, 1.0, -(i+4)]));
  }

  for (var i = 30; i <= 1000; i+= 60) 
  {
    coin_array.push(new coin(gl, [-2.0, 1.0, -i]));
    coin_array.push(new coin(gl, [-2.0, 1.0, -(i+2)]));
    coin_array.push(new coin(gl, [-2.0, 1.0, -(i+4)]));
  }

  for (var i = 20; i <= 1000; i+= 70) 
  {
    coin_array.push(new coin(gl, [0.0, 1.0, -i]));
    coin_array.push(new coin(gl, [0.0, 1.0, -(i+2)]));
    coin_array.push(new coin(gl, [0.0, 1.0, -(i+4)]));
  }

  for (var i = 0; i <= 1000; i+= 100) 
  {
    barricade_array.push(new barricade(gl, [-2.0, -5.0, -i]));
  }

  for (var i = 50; i <= 1000; i+= 80) 
  {
    barricade_array.push(new barricade(gl, [2.0, -5.0, -i]));
  }

  for (var i = 30; i <= 1000; i+= 70) 
  {
    barricade_array.push(new barricade(gl, [0.0, -5.0, -i]));
  }

  for (var i = 30; i <= 1000; i+= 100) 
  {
    barricade_s_array.push(new barricade_s(gl, [-2.0, -4.8, -i]));
  }

  for (var i = 60; i <= 1000; i+= 80) 
  {
    barricade_s_array.push(new barricade_s(gl, [2.0, -4.8, -i]));
  }

  for (var i = 50; i <= 1000; i+= 70) 
  {
    barricade_s_array.push(new barricade_s(gl, [0.0, -4.8, -i]));
  }

  for (var i = 10; i <= 1000; i+= 150) 
  {
    barricade_u_array.push(new barricade_u(gl, [-2.0, -3.8, -i]));
  }

  for (var i = 25; i <= 1000; i+= 200) 
  {
    barricade_u_array.push(new barricade_u(gl, [2.0, -3.8, -i]));
  }

  for (var i = 15; i <= 1000; i+= 80) 
  {
    barricade_u_array.push(new barricade_u(gl, [0.0, -3.8, -i]));
  }

  for (var i = 100; i < 1000; i+= 200) 
  {
    train_array.push(new train(gl, [0.0, -4.0, -i]));
  }

  for (var i = 50; i < 1000; i+= 200) 
  {
    train_array.push(new train(gl, [2.0, -4.0, -i]));
  }

  for (var i = 250; i < 1000; i+= 200) 
  {
    train_array.push(new train(gl, [-2.0, -4.0, -i]));
  }

  for (var i = 40; i < 1000; i+=300) 
  {
    jumpBoost_array.push(new jumpBoost(gl, [2.0, -4.0, -i]));
  }

  for (var i = 20; i < 1000; i+=300) 
  {
    jumpBoost_array.push(new jumpBoost(gl, [0.0, -4.0, -i]));
  }

  for (var i = 100; i < 1000; i+=300) 
  {
    jumpBoost_array.push(new jumpBoost(gl, [-2.0, -4.0, -i]));
  }
  // If we don't have a GL context, give up now


  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  // const vsSource = `
  //   attribute vec4 aVertexPosition;
  //   attribute vec4 aVertexColor;

  //   uniform mat4 uModelViewMatrix;
  //   uniform mat4 uProjectionMatrix;

  //   varying lowp vec4 vColor;

  //   void main(void) {
  //     gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  //     vColor = aVertexColor;
  //   }
  // `;
  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
    }
  `;

   const vsSource_amb = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;
  // Fragment shader program

  // const fsSource = `
  //   varying lowp vec4 vColor;

  //   void main(void) {
  //     gl_FragColor = vColor;
  //   }
  // `;

  const fsSource = `
    varying highp vec2 vTextureCoord;

    uniform sampler2D uSampler;

    void main(void) {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
  `;

  const fsSourceGray = `
    varying highp vec2 vTextureCoord;

    uniform sampler2D uSampler;

    void main(void) {
      gl_FragColor = texture2D(uSampler, vTextureCoord).rrra;
    }
  `;

  const fsSource_amb = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;
      // gl_FragColor = texture2D(uSampler, vTextureCoord);

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const shaderProgramGray = initShaderProgram(gl, vsSource, fsSourceGray);
  const shaderProgram_amb = initShaderProgram(gl, vsSource_amb, fsSource_amb);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  // const programInfo = {
  //   program: shaderProgram,
  //   attribLocations: {
  //     vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
  //     vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
  //   },
  //   uniformLocations: {
  //     projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
  //     modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
  //   },
  // };
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };

  const programInfoGray = {
    program: shaderProgramGray,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgramGray, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgramGray, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgramGray, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgramGray, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgramGray, 'uSampler'),
    },
  };

  const programInfo_amb = {
    program: shaderProgram_amb,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram_amb, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram_amb, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram_amb, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram_amb, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram_amb, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram_amb, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram_amb, 'uSampler'),
    },
  };
  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  //const buffers

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    if(gray == 1)
    {
      drawSceneGray(gl, programInfoGray, programInfo_amb,deltaTime, texture1, texture2, texture3, texture4, texture5, texture6, texture7, texture8, texture9, texture10);
    }
    else if(gray == 0)
    {
      drawScene(gl, programInfo, programInfo_amb,deltaTime, texture1, texture2, texture3, texture4, texture5, texture6, texture7, texture8, texture9, texture10);
    }
    if (player.pos[2] < -900) 
    {
      return;
    }
    document.getElementById("scr").innerHTML = score;
    //Collect coins
    for (var i = 0; i < coin_array.length; i++) 
    {
      if (detect_collision(player, coin_array[i]) == 1)
      {
        console.log("MONEY");
        coin_array.splice(i, 1);
        score += 100;
      }
    }
    // console.log("score=" + score);
    //Tall Barricade- end game
    for (var i = 0; i < barricade_array.length; i++) 
    {
      if (detect_collision(player, barricade_array[i]) == 1)
      {
        console.log("HIT 1");
        return;
        //end game
      }
    }

    //Small Barricade- decrease score
    for (var i = 0; i < barricade_s_array.length; i++) 
    {
      if (detect_collision(player, barricade_s_array[i]) == 1)
      {
        console.log("HIT 2");
        score -= 1;
        // decrease score
      }
    }

    //Hanging Barricade- slow down
    for (var i = 0; i < barricade_u_array.length; i++) 
    {
      if (detect_collision(player, barricade_u_array[i]) == 1)
      {
        console.log("HIT 3");
        count_hit ++;
        barricade_u_array.splice(i,1);
        hit = 1;
        //slow player down
      }
    }
    change ++;
    if (count_hit == 1)
    {
      timer --;
      timer2 --;
    }

      // console.log("timer = " + timer);


    if(timer < 0)
    {
      timer = 300;
      count_hit = 0;
    }

    if(count_hit == 2 && timer > 0)
    {
      count_hit = 0;
      // console.log(timer);
      // console.log(count_hit);
      return;
      // timer = 100;
      hit = 0;
    }
    if (count_hit == 1)
    {
      police1.pos[2] = player.pos[2] + 3;
    }

    // if(timer2 == 0)
    // {
    //   hit = 0;
    //   timer2 = 100;
    // }
    //Train collision
    for (var i = 0; i < train_array.length; i++) 
    {
      if (detect_collision(player, train_array[i]) == 1)
      {
        console.log("HIT Train");
        return;
        //end game
      }
    }

    //Flying powerup
    if (detect_collision(player, flyBoost1) == 1)
    {
      console.log("Holy shit");
      player.flyBoostOn = 1;
    }

    if (detect_collision(player, flyBoost2) == 1)
    {
      console.log("Holy shit");
      player.flyBoostOn = 1;
    }

    //JumpBoost powerup
    for (var i = 0; i < jumpBoost_array.length; i++) 
    {
      if (detect_collision(player, jumpBoost_array[i]) == 1)
      {
        console.log("jump higher");
        jumpBoost_array.splice(i, 1);
        player.jumpBoostOn = 1;
      }
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, programInfo_amb,deltaTime, texture1, texture2, texture3, texture4, texture5, texture6, texture7, texture8, texture9, texture10) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
    var cameraMatrix = mat4.create();
    mat4.translate(cameraMatrix, cameraMatrix, [0, 0, player.pos[2] + 15]);
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    var up = [0, 1, 0];

    mat4.lookAt(cameraMatrix, cameraPosition, [0, 0, -10000], up);

    var viewMatrix = cameraMatrix;//mat4.create();

    //mat4.invert(viewMatrix, cameraMatrix);

    var viewProjectionMatrix = mat4.create();

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

  player.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, texture1);
  police1.drawPolice(gl, viewProjectionMatrix, programInfo, deltaTime, texture10);
  for (var i = 0; i < floor1.length; i++) 
  {
    floor1[i].drawGround(gl, viewProjectionMatrix, programInfo, deltaTime, texture2);
  }

  for (var i = 0; i < floor2.length; i++) 
  {
    floor2[i].drawGround(gl, viewProjectionMatrix, programInfo, deltaTime, texture2);
  }

  for (var i = 0; i < floor3.length; i++) 
  {
    floor3[i].drawGround(gl, viewProjectionMatrix, programInfo, deltaTime, texture2);
  }
  if(change%4 == 0)
  {
    for (var i = 0; i < wall1.length; i++) 
    {
      wall1[i].drawWall(gl, viewProjectionMatrix, programInfo, deltaTime, texture3);
    }

    for (var i = 0; i < wall2.length; i++) 
    {
      wall2[i].drawWall(gl, viewProjectionMatrix, programInfo, deltaTime, texture3);
    }
  }
  else
  {
    for (var i = 0; i < wall1_amb.length; i++) 
    {
      wall1_amb[i].drawWall_amb(gl, viewProjectionMatrix, programInfo_amb, deltaTime, texture3);
    }

    for (var i = 0; i < wall2_amb.length; i++) 
    {
      wall2_amb[i].drawWall_amb(gl, viewProjectionMatrix, programInfo_amb, deltaTime, texture3);
    }
  }
  

  for (var i = 0; i < coin_array.length; i++) 
  {
    coin_array[i].drawCoin(gl, viewProjectionMatrix, programInfo, deltaTime, texture4);
  }

  for (var i = 0; i < barricade_array.length; i++) 
  {
    barricade_array[i].drawBarricade(gl, viewProjectionMatrix, programInfo, deltaTime, texture5);
  }

  for (var i = 0; i < barricade_s_array.length; i++) 
  {
    barricade_s_array[i].drawBarricade_s(gl, viewProjectionMatrix, programInfo, deltaTime, texture5);
  }

  for (var i = 0; i < barricade_u_array.length; i++) 
  {
    barricade_u_array[i].drawBarricade_u(gl, viewProjectionMatrix, programInfo, deltaTime, texture7);
  }

  for (var i = 0; i < train_array.length; i++) 
  {
    train_array[i].drawTrain(gl, viewProjectionMatrix, programInfo, deltaTime, texture6);
  }

  // train1.drawTrain(gl, viewProjectionMatrix, programInfo, deltaTime, texture6);
  flyBoost1.drawFlyBoost(gl, viewProjectionMatrix, programInfo, deltaTime, texture8);
  flyBoost2.drawFlyBoost(gl, viewProjectionMatrix, programInfo, deltaTime, texture8);

  for (var i = 0; i < jumpBoost_array.length; i++) 
  {
    jumpBoost_array[i].drawJumpBoost(gl, viewProjectionMatrix, programInfo, deltaTime, texture9);
  }

}

function drawSceneGray(gl, programInfoGray, programInfo_amb,deltaTime, texture1, texture2, texture3, texture4, texture5, texture6, texture7, texture8, texture9, texture10) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
    var cameraMatrix = mat4.create();
    mat4.translate(cameraMatrix, cameraMatrix, [0, 0, player.pos[2] + 15]);
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    var up = [0, 1, 0];

    mat4.lookAt(cameraMatrix, cameraPosition, [0, 0, -10000], up);

    var viewMatrix = cameraMatrix;//mat4.create();

    //mat4.invert(viewMatrix, cameraMatrix);

    var viewProjectionMatrix = mat4.create();

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

  player.drawCube(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture1);
  police1.drawPolice(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture10);
  for (var i = 0; i < floor1.length; i++) 
  {
    floor1[i].drawGround(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture2);
  }

  for (var i = 0; i < floor2.length; i++) 
  {
    floor2[i].drawGround(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture2);
  }

  for (var i = 0; i < floor3.length; i++) 
  {
    floor3[i].drawGround(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture2);
  }

  for (var i = 0; i < wall1.length; i++) 
  {
    wall1[i].drawWall(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture3);
  }

  for (var i = 0; i < wall2.length; i++) 
  {
    wall2[i].drawWall(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture3);
  }

  for (var i = 0; i < wall1_amb.length; i++) 
  {
    wall1_amb[i].drawWall_amb(gl, viewProjectionMatrix, programInfo_amb, deltaTime, texture3);
  }

  for (var i = 0; i < wall2_amb.length; i++) 
  {
    wall2_amb[i].drawWall_amb(gl, viewProjectionMatrix, programInfo_amb, deltaTime, texture3);
  }

  for (var i = 0; i < coin_array.length; i++) 
  {
    coin_array[i].drawCoin(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture4);
  }

  for (var i = 0; i < barricade_array.length; i++) 
  {
    barricade_array[i].drawBarricade(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture5);
  }

  for (var i = 0; i < barricade_s_array.length; i++) 
  {
    barricade_s_array[i].drawBarricade_s(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture5);
  }

  for (var i = 0; i < barricade_u_array.length; i++) 
  {
    barricade_u_array[i].drawBarricade_u(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture7);
  }

  for (var i = 0; i < train_array.length; i++) 
  {
    train_array[i].drawTrain(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture6);
  }

  // train1.drawTrain(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture6);
  flyBoost1.drawFlyBoost(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture8);
  flyBoost2.drawFlyBoost(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture8);

  for (var i = 0; i < jumpBoost_array.length; i++) 
  {
    jumpBoost_array[i].drawJumpBoost(gl, viewProjectionMatrix, programInfoGray, deltaTime, texture9);
  }

}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn off mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function keyDownHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = true;
    }
    else if(event.keyCode == 37) {
        leftPressed = true;
    }
    if(event.keyCode == 32)
    {
        jumpPressed = true;
    }
    if(event.keyCode == 40) {
      downPressed = true;
    }
    if (event.keyCode == 71) 
    {
      GPressed = true;
    }
    if(rightPressed == true && player.pos[0] == 0)
      player.pos[0] = 2;
    if(leftPressed == true && player.pos[0] == 0)
      player.pos[0] = -2;
    if(leftPressed == true && player.pos[0] == 2)
      player.pos[0] = 0;
    if(rightPressed == true && player.pos[0] == -2)
      player.pos[0] = 0;

    if(rightPressed == true && police1.pos[0] == 0)
      police1.pos[0] = 2;
    if(leftPressed == true && police1.pos[0] == 0)
      police1.pos[0] = -2;
    if(leftPressed == true && police1.pos[0] == 2)
      police1.pos[0] = 0;
    if(rightPressed == true && police1.pos[0] == -2)
      police1.pos[0] = 0;

    if(jumpPressed == true && player.pos[1] == -4 && player.jumpBoostOn == 0)
    {
      player.velocityY = 1.5;
    }
    if(jumpPressed == true && player.pos[1] == -4 && player.jumpBoostOn == 1)
    {
      player.velocityY = 3;
    }
    if(downPressed == true && player.pos[1] == -4.0)
    {
      console.log("Duck");
      player.duck = 1;
    }
    if (GPressed == true) 
    {
      console.log("On");
      gray = 1;
    }

}

function keyUpHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = false;
    }
    else if(event.keyCode == 37) {
        leftPressed = false;
    }
    if(event.keyCode == 32)
    {
        jumpPressed = false;
    }
    if(event.keyCode == 40) {
      downPressed = false;
    }
    if (downPressed == false) 
    {
      player.duck = 0;
    }
    if (event.keyCode == 71) 
    {
      GPressed = false;
    }
    if (GPressed == false) 
    {
      console.log("Off");
      gray = 0;
    }
    // if(jumpPressed == false)
    //   player.velocityY = 0.0;
}

function detect_collision(a, b) {
    return ( Math.abs(a.pos[0] - b.pos[0]) * 2 < (a.w + b.w) ) &&
           ( Math.abs(a.pos[1] - b.pos[1]) * 2 < (a.h + b.h) ) &&
           ( Math.abs(a.pos[2] - b.pos[2]) * 2 < (a.d + b.d) );
}
