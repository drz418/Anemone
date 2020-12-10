let noiseArray = [];
let xOff = 0.0;
let noiseArrayLength = 64
let nub, nub1, nub2, nub3, nubXY, nubXY1;
let nubbin, nubbin1, nubbin2, nubbin3, nubbinB, nubbin1B, nubbin2B, nubbin3B, nubbinC, nubbin1C, nubbin2C, nubbin3C;
let slider;

function setup() {
  createCanvas(2000, 1200);
  // filling the array
  for (let r = 0; r < noiseArrayLength; r++){
    noiseArray[r] = 0


  slider = createSlider(0, 20, 10, 1);
  slider.position(1180, 840);
  slider.style('width', '380px');


    }
// defining variables
  nub = new Nub ();
  nub1 = new Nub1 ();
  nub2 = new Nub2 ();
  nub3 = new Nub3 ();
  nubXY = new NubXY ();
  nubXY1 = new NubXY1 ();
  //bottom right version
  nubbin = new Nubbin ();
  nubbin1 = new Nubbin1 ();
  nubbin2 = new Nubbin2 ();
  nubbin3 = new Nubbin3 ();
  nubbinB = new NubbinB ();
  nubbin1B = new Nubbin1B ();
  nubbin2B = new Nubbin2B ();
  nubbin3B = new Nubbin3B ();
  nubbinC = new NubbinC ();
  nubbin1C = new Nubbin1C ();
  nubbin2C = new Nubbin2C ();
  nubbin3C = new Nubbin3C ();
}

function draw() {
  background(60);


// grid
  stroke (66, 85, 153);
  strokeWeight (2)
  for (let i = 0; i < width; i+=40){
    line (i, 0, i, height);
    for (let k = 0; k < height; k+=40){
		  line (0, k, width, k);
        }
    }

    translate(100, 0);

    let val = slider.value();
    //shifting the contents of the array
      noiseArray = shiftArray(noiseArray, noise(xOff));
        xOff = xOff + val*0.001;


// Box lower left
  fill (60)
  rect (35, height-35, 800, -500);

  //box right
  rect (900, 665, 750, 220);
  //box mid
  rect (900, height-35, 750, -265);

  textSize(15);
  fill (200);
  noStroke();
  let s = 'The anemones are animated based off of Perlin noise values. Figure A. (starting lower left, and moving counter clockwise) shows how they are structured and built up. The next shows how they would move in 2 dimensions, even though the coordinates are derived from one dimensional noise. The third is with the ‘skinned’ version put into a nested for-loop. And the last is the intended behavior of a group, where one worm leads and the next follow both in rows and columns, with that effect ripples outward to the bunch. ';
  text(s, 920, 690, 725, 200);
  text( 'The slider position determines how frenetic the movement of the anemones becomes.',975, 810, 725, 200);

// lower left nubs
  nub.show();
  nub.move();

  nub1.move();
  nub1.lines();
  nub1.show();

  nub2.move();
  nub2.skin();
  nub2.lines();
  nub2.show();

  nub3.move();
  nub3.outline();
  nub3.skin();

  nubXY.move();
  nubXY.moveY();
  nubXY.birdseye ();

  nubXY1.move();
  nubXY1.moveY();
  nubXY1.birdseye ();
  nubXY1.lines ();
  nubXY1.thicklines();
  // lower left nubs
  nubbinC.show();
  nubbin1C.show();
  nubbin2C.show();
  nubbin3C.show();

  nubbinB.show();
  nubbin1B.show();
  nubbin2B.show();
  nubbin3B.show();

  nubbin.show();
  nubbin1.show();
  nubbin2.show();
  nubbin3.show();

  //invisible box lower left
  noStroke();
  fill (60);
  rect (40, height-40, 700, -60);

  for (let y=0; y< 37; y+=8){
      x0 = 980;
      x = map(noiseArray[0+y],0,1, 900, 1020);
      x1 = map(noiseArray[6+y],0,1, 870, 1050);
      x2 = map(noiseArray[10+y],0,1, 830, 1090);
      x3 = map(noiseArray[16+y],0,1, 840, 1080);

        this.xOff = xOff + val*0.001;

      for (let z = 0; z < noiseArrayLength; z+=8){
            noFill();
            strokeWeight(80);
            let b = map(z,0,150, 50,200);
            let a = map(y,0,37, 50,200);
            let c = map(z,0,150, 0, 30);
            stroke (a, 0, b);
            line (x2+(z*10)+c, 70 + (y*5), x3+(z*10)+c, 160 + (y*5)); //top line
            line (x3+(z*10)+c, 160 + (y*5), x1+(z*10)+c, 250 + (y*5)); // 2nd line (red to yellow)
            line (x1+(z*10)+c, 250 + (y*5), x+(z*10)+c, 340 + (y*5)); // 3rd line (yellow to white)
            line (x+(z*10)+c, 340 + (y*5), x0+(z*10)+c, 410 + (y*5));
            }
          }


}

class Nub {
  constructor () {
    this.z = 0
    this.x = map(noiseArray[0],1,0, 120+this.z, 240+this.z);
    this.x1 = map(noiseArray[6],1,0, 90+this.z, 270+this.z);
    this.x2 = map(noiseArray[10],1,0, 50+this.z, 310+this.z);
    this.x3 = map(noiseArray[16],1,0, 60+this.z, 300+this.z);
    this.x0 = 180 + this.z;

    }

    show () {
      // top node
      stroke(0);
        fill (255, 246, 227);
        strokeWeight(2);
        ellipse (this.x2, height-460, 25);

      // Master node (#3)
        fill (255, 0, 0); //red
        ellipse (this.x3, height- 370, 25);

        fill (245, 214, 17); //yellow
        ellipse (this.x1, height-280, 25);

        fill (50); // black
        ellipse (this.x, height- 190, 25);

      // Base node - white - doesnt move
        fill (255);
        ellipse (this.x0, height-100, 25);
      }

    move () {
      this.x = map(noiseArray[0],1,0, 120+this.z, 240+this.z);
      this.x1 = map(noiseArray[6],1,0, 90+this.z, 270+this.z);
      this.x2 = map(noiseArray[10],1,0, 50+this.z, 310+this.z);
      this.x3 = map(noiseArray[16],1,0, 60+this.z, 300+this.z);

      this.xOff = xOff + 0.01;
        }
  }

  class Nub1 extends Nub{
    constructor () {
      super();
      this.x0 = 330;
      this.z = 150;
      }

      lines () {
        // connecting lines
        stroke(0);
        strokeWeight(2);
          line (this.x2, height-460, this.x3, height- 370); //top line
          line (this.x3, height- 370, this.x1, height-280); // 2nd line (red to yellow)
          line (this.x1, height-280, this.x, height- 190); // 3rd line (yellow to white)
          line (this.x, height- 190, this.x0, height-100); // 4th line (white to base)
          }
    }

    class Nub2 extends Nub1 {
      constructor () {
        super();
        this.x0 = 480;
        this.z = 300;
      }
      skin () {
          //filled in area (skin)
          noFill();
          strokeWeight(80);
          stroke(204, 212, 255); // light blue
          line (this.x2, height-460, this.x3, height- 370); //top line
          line (this.x3, height- 370, this.x1, height-280); // 2nd line (red to yellow)
          line (this.x1, height-280, this.x, height- 190); // 3rd line (yellow to white)
          line (this.x, height- 190, this.x0, height-100);
          }
    }

    class Nub3 extends Nub2 {
      constructor (){
        super();
        this.x0 = 650;
        this.z = 470;
      }
      outline() {

        strokeWeight(84);
        stroke(15);
        line (this.x2, height-460, this.x3, height- 370); //top line
        line (this.x3, height- 370, this.x1, height-280); // 2nd line (red to yellow)
        line (this.x1, height-280, this.x, height- 190); // 3rd line (yellow to white)
        line (this.x, height- 190, this.x0, height-100);
        }
    }

    class NubXY extends Nub {
      constructor (){
        super();
        this.height = height-180;
        this.width = 860;
        this.y = map(noiseArray[11],1,0, this.height+60, this.height-60); //black
        this.y1 = map(noiseArray[17],1,0, this.height+90, this.height-90); //yellow
        this.y2 = map(noiseArray[21],1,0, this.height+130, this.height-130); //top
        this.y3 = map(noiseArray[27],1,0,this.height+120, this.height-120); //red

      }

        birdseye (){
          //base node
          stroke (40);
          strokeWeight(2);
          fill (255);
          ellipse (this.x0 + this.width, this.height, 60);
          fill (50, 200); //black
          ellipse (this.x + this.width, this.y, 40);
          fill (245, 214, 17, 200); //yellow
          ellipse (this.x1 +this.width, this.y1, 30);
          fill (255, 0, 0, 200); //red
          ellipse (this.x3+this.width, this.y3, 20);
          strokeWeight(2);
          fill (255, 246, 227); //top
          ellipse (this.x2+this.width, this.y2, 10);
          }
          moveY () {
            this.y = map(noiseArray[11],1,0, this.height+60, this.height-60); //black
            this.y1 = map(noiseArray[17],1,0, this.height+90, this.height-90); //yellow
            this.y2 = map(noiseArray[21],1,0, this.height+130, this.height-130); //top
            this.y3 = map(noiseArray[27],1,0,this.height+120, this.height-120); //red

            this.xOff = xOff + 0.01;
          }
        }

    class NubXY1 extends NubXY {
      constructor (){
        super();
        this.width = 1090;
        }
      lines () {
          // connecting lines
          stroke(120);
          strokeWeight(2);
            line (this.x2+this.width, this.y2, this.x3+this.width, this.y3); //top line
            line (this.x3+this.width, this.y3, this.x1+this.width, this.y1); // 2nd line (red to yellow)
            line (this.x1+this.width, this.y1, this.x+this.width, this.y); // 3rd line (yellow to black)
            line (this.x+this.width, this.y, this.x0+this.width, this.height); // 4th line (black to base)
          }
      thicklines () {
        stroke(204, 212, 255);
        strokeWeight(10);
          line (this.x2+(this.width*1.2), this.y2, this.x3+(this.width*1.2), this.y3); //top line
        strokeWeight(20);
          line (this.x3+(this.width*1.2), this.y3, this.x1+(this.width*1.2), this.y1); // 2nd line (red to yellow)
        strokeWeight(30);
          line (this.x1+(this.width*1.2), this.y1, this.x+(this.width*1.2), this.y); // 3rd line (yellow to black)
        strokeWeight(40);
          line (this.x+(this.width*1.2), this.y, this.x0+(this.width*1.2), this.height); // 4th line (black to base)
          }
      }

      class Nubbin {
        constructor () {
              this.color = (204, 212, 255)
              this.shift = 0;
              this.width = 0;
              this.height = 0;
              this.x = map(noiseArray[0+this.shift],1,0, 220+this.width, 340+this.width);
              this.x1 = map(noiseArray[6+this.shift],1,0, 190+this.width, 370+this.width);
              this.x2 = map(noiseArray[10+this.shift],1,0, 150+this.width, 410+this.width);
              this.x3 = map(noiseArray[16+this.shift],1,0, 160+this.width, 400+this.width);
              this.x0 = 280 + this.width;
      }

        show () {
          this.x = map(noiseArray[0+this.shift],1,0, 220+this.width, 340+this.width);
          this.x1 = map(noiseArray[6+this.shift],1,0, 190+this.width, 370+this.width);
          this.x2 = map(noiseArray[10+this.shift],1,0, 150+this.width, 410+this.width);
          this.x3 = map(noiseArray[16+this.shift],1,0, 160+this.width, 400+this.width);

                this.xOff = xOff + 0.01;
                //filled in outline
             noFill();
                strokeWeight(84);
                stroke(150); // light blue
                line (this.x2, 210+this.height, this.x3, 300+this.height); //top line
                line (this.x3, 300+this.height, this.x1, 390+this.height); // 2nd line (red to yellow)
                line (this.x1, 390+this.height, this.x, 480+this.height); // 3rd line (yellow to white)
                line (this.x, 480+this.height, this.x0+this.width, 520+this.height);
                  //filled in area (skin)
                  noFill();
                  strokeWeight(80);
                  stroke(205, 210, this.color); // light blue
                  line (this.x2, 210+this.height, this.x3, 300+this.height); //top line
                  line (this.x3, 300+this.height, this.x1, 390+this.height); // 2nd line (red to yellow)
                  line (this.x1, 390+this.height, this.x, 480+this.height); // 3rd line (yellow to white)
                  line (this.x, 480+this.height, this.x0+this.width, 520+this.height);
                  }

                  }
      class Nubbin1 extends Nubbin {
        constructor () {
          super ();
          this.shift = 10;
          this.width = 80;
        }
      }

        class Nubbin2 extends Nubbin {
          constructor () {
            super ();
            this.shift = 20;
            this.width = 160;
          }
      }
      class Nubbin3 extends Nubbin {
        constructor () {
          super ();
          this.shift = 30;
          this.width = 240;
        }
      }
      class NubbinB extends Nubbin {
        constructor () {
          super ();
          this.shift = 8;
          this.height = -60;
          this.color = (157, 227, 215)
        }
      }
      class Nubbin1B extends Nubbin {
        constructor () {
          super ();
          this.shift = 18;
          this.height = -60;
          this.width = 80;
          this.color = (157, 227, 215)
        }
      }
      class Nubbin2B extends Nubbin {
        constructor () {
          super ();
          this.shift = 27;
          this.height = -60;
          this.width = 160;
          this.color = (157, 227, 215)
        }
      }
      class Nubbin3B extends Nubbin {
        constructor () {
          super ();
          this.shift = 37;
          this.height = -60;
          this.width = 240;
          this.color = (157, 227, 215);
        }
      }
      class NubbinC extends Nubbin {
        constructor () {
          super ();
          this.shift = 17;
          this.height = -120;
          this.color = (171, 207, 180)
        }
      }
      class Nubbin1C extends Nubbin {
        constructor () {
          super ();
          this.shift = 27;
          this.height = -120;
          this.width = 80;
          this.color = (171, 207, 180)
        }
      }
      class Nubbin2C extends Nubbin {
        constructor () {
          super ();
          this.shift = 36;
          this.height = -120;
          this.width = 160;
          this.color = (171, 207, 180)
        }
      }
      class Nubbin3C extends Nubbin {
        constructor () {
          super ();
          this.shift = 47;
          this.height = -120;
          this.width = 240;
          this.color = (171, 207, 180)
        }
      }

function shiftArray(myArray,myValue){
	myArray.shift(); //shift removes the first position in the array
	myArray.push(myValue); //push adds an element to an array

	return myArray;
}
