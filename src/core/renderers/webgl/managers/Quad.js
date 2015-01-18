var WebGLManager = require('./WebGLManager'),
    utils = require('../../../utils');

/**
 * @class
 * @namespace PIXI
 * @param renderer {WebGLRenderer} The renderer this manager works for.
 */
function Quad(gl)
{
    this.gl = gl;

//    this.textures = new TextureUvs(); 
    
    this.vertices = new Float32Array([
        0,0,
        200,0,
        200,200,
        0,200
    ]);

    this.uvs = new Float32Array([
        0,0,
        1,0,
        1,1,
        0,1
    ]);

    var white = (0xFFFFFF >> 16) + (0xFFFFFF & 0xff00) + ((0xFFFFFF & 0xff) << 16) + (1 * 255 << 24);
    
    this.colors = new Float32Array([
        white,
        white,
        white,
        white
    ])

    this.indices = new Uint16Array([
        0, 1, 2, 0, 3, 2
    ]);

    this.vertexBuffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, (8 + 8 + 4) * 4, gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    this.upload();
}

Quad.prototype.constructor = Quad;

Quad.prototype.map = function(rect, rect2)
{
    var x = 0//rect2.x / rect.width;
    var y = 0//rect2.y / rect.height;

    this.uvs[0] = x;
    this.uvs[1] = y;

    this.uvs[2] = x + rect2.width / rect.width;
    this.uvs[3] = y;

    this.uvs[4] = x + rect2.width / rect.width;
    this.uvs[5] = y + rect2.height / rect.height;

    this.uvs[6] = x;
    this.uvs[7] = y + rect2.height / rect.height;

    /// -----
    x = rect2.x;
    y = rect2.y;
    
    this.vertices[0] = x;
    this.vertices[1] = y;
    
    this.vertices[2] = x + rect2.width;
    this.vertices[3] = y;
    
    this.vertices[4] = x + rect2.width;
    this.vertices[5] = y + rect2.height;

    this.vertices[6] = x;
    this.vertices[7] = y + rect2.height;

    this.upload();
}

Quad.prototype.upload = function()
{
    var gl = this.gl;

    gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);

    gl.bufferSubData(gl.ARRAY_BUFFER, 8 * 4, this.uvs);

    gl.bufferSubData(gl.ARRAY_BUFFER, (8 + 8) * 4, this.colors);
}

module.exports = Quad;


