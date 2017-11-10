/*
 * Creation & Computation - Digital Futures, OCAD University
 * Roxanne Baril-Bédard
 * 
 * Read 2 photocels in order to see if something is obstructing the light of a whole area
 *  
 * 
 * 
 */

int photocelPin1 = A1;  //the analog input pin the sensor is attached to
int rawValue1;   //variable to hold the raw bit value 0 -1023
int scaledVal1; //we'll use this to map the input value to fit in half a byte
int photocelPin2 = A2;  //the analog input pin the sensor is attached to
int rawValue2;   //variable to hold the raw bit value 0 -1023
int scaledVal2; //we'll use this to map the input value to fit in half a byte
int mappedSum; //adding the two half bytes to have a compounded value

void setup() 
{
 
Serial.begin(9600);  //turn on the serial port
}

void loop() 
{

  rawValue1 = analogRead(photocelPin1);  //read the sensor value and store it
  scaledVal1 = map(rawValue1,0,1023,0,255);  //re scale the vale using map()
  rawValue2 = analogRead(photocelPin2);  //read the sensor value and store it
  scaledVal2 = map(rawValue2,0,1023,0,255);  //re scale the vale using map()

  mappedSum = (scaledVal1 /2) + (scaledVal2 /2); //so we have the total that fits in  byte

  delay(1000); 
  Serial.write(mappedSum);  
                                             // slight delay to stabilize the ADC
  
//  Serial.print("Raw Value 1 : ");             //print all of this out of the serial monitor
//  Serial.print(rawValue1);
//  Serial.print(" ");
//  Serial.print("Scaled for brightness 1 : ");
//  Serial.print(scaledVal1);
  
//  Serial.print("Raw Value 2 : ");             //print all of this out of the serial monitor
//  Serial.print(rawValue2);
//  Serial.print(" ");
//  Serial.print("Scaled for brightness 2 : ");
//  Serial.print(scaledVal2);
//  
//  Serial.print(" ");
//  Serial.print("Mapped sum : ");
//  Serial.print(mappedSum);
  
  

}
