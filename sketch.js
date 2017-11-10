/*
* Creation & Computation - Digital Futures, OCAD University
 * Roxanne Baril-Bédard

Uses of two complementary yi Ching APIs activated with data from 
a laser cutted box with two photocels

*/


var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here

var inData; // reading from the photocels

/*
variable for the hexagrams
*/
var sendURL1 = 'https://raw.githubusercontent.com/la11111/willie-modules/master/texts_iching/iching2.json';
var sendURL2 = 'https://cdn.jsdelivr.net/npm/i-ching@0.3.5/lib/data.json';
var tSize = 80;
var rng =0;

var hexTitle, hexDescript, hexJudgement, hexSymbol;
var loaded1 = false;
var loaded2 = false;
var hexs;
var hexa = false;
var renewed = true;

var titlePosi=0 , textPosi=0;

function preload() {
  img1 = loadImage("assets/palmistry-web-bg0.png");
  img2 = loadImage("assets/palmistry-web-bg2.png");
}

/***************************************************
setup
****************************************************/

function setup()
{


createCanvas(windowWidth,windowHeight);
image(img1, 0, 0,windowWidth,windowHeight);

loadJSON(sendURL1,whenJsonLoaded1);
loadJSON(sendURL2,whenJsonLoaded2);


/***********************************************************************************************
serial stuff
*************************************************************************************************/

serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port

} // end of setup



// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}

function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
function serialEvent() {
 inData = Number(serial.read());
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}

/***********************************************************************************************
other functions
*************************************************************************************************/



function draw()
{

  if(inData<=15 && loaded1 && loaded2 && !hexa){
    rng = Math.floor(random(0,63));
    getHexagram();
    hexa = true;
    renewed = false;
    console.log('hexa true');
  }

  if(inData>50 && !renewed){
    hexa = false;
    console.log('hexa false');
    renewed = true;
  }

  } // end of draw

function mouseClicked(){
  rng = Math.floor(random(0,63));
  getHexagram();
}


function whenJsonLoaded1(j){
  loaded1 = true;
  hexs1 = j;
}

function whenJsonLoaded2(j){
  loaded2 = true;
  hexs2 = j;
}

function getHexagram()
{
  console.log(rng);
  hexTitle = hexs2.hexagrams[rng].names[0];
  hexSymbol = hexs2.hexagrams[rng].character;
  hexDescript = hexs1.hexagrams[rng].image;
  hexJudgement = hexs1.hexagrams[rng].judgement;


  //fill(69,38,13);
  image(img2, 0, 0,windowWidth,windowHeight);
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(120);

  titlePosi = (0.205*windowHeight);
  textPosi = (0.43*windowHeight);

  text(hexSymbol + " " + (rng+1),width/2,titlePosi);

  textSize(32);
  text(hexTitle,(width/2), (textPosi));

  textSize(24);
  text(hexDescript + " " + hexJudgement,(width/2-188), (textPosi+20),376,600);
}

