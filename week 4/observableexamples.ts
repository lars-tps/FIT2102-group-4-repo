/**
 * Surname     | Firstname         | Contribution % | Any issues?
 * =====================================================
 * Person 1... | Pei Sheng         | 20%            |
 * Person 2... | Mohamed Areeb     | 20%            |
 * Person 3... | Jing Wei          | 20%            |
 * Person 4... | Swee Zao          | 20%            |
 * Person 5... | Yu Mei            | 20%            |
 * Please do not hesitate to contact your tutors if there are
 * issues that you cannot resolve within the group.
 *
 * Complete Worksheet 4/5 by entering code in the places marked below...
 *
 * For full instructions and tests open the file observableexamples.html
 * in Chrome browser.  Keep it open side-by-side with your editor window.
 * You will edit this file (observableexamples.ts), save it, build it, and reload the
 * browser window to run the test.
 */

 import { interval, fromEvent, merge, zip } from "rxjs";
 import { map, filter, takeUntil, scan } from "rxjs/operators";
 
 // Simple demonstration
 // ===========================================================================================
 // ===========================================================================================
 /**
  * an example of traditional event driven programming style - this is what we are
  * replacing with observable.
  * The following adds a listener for the mouse event
  * handler, sets p and adds or removes a highlight depending on x position
  */
 function mousePosEvents() {
   const pos = document.getElementById("pos")!;
 
   document.addEventListener("mousemove", ({ clientX, clientY }) => {
     const p = clientX + ", " + clientY;
     pos.innerHTML = p;
     if (clientX > 400) {
       pos.classList.add("highlight");
     } else {
       pos.classList.remove("highlight");
     }
   });
 }
 
 /**
  * constructs an Observable event stream with three branches:
  *   Observable<x,y>
  *    |- set <p>
  *    |- add highlight
  *    |- remove highlight
  */
 function mousePosObservable() {
   const pos = document.getElementById("pos")!,
     o = fromEvent<MouseEvent>(document, "mousemove").pipe(
       map(({ clientX, clientY }) => ({ x: clientX, y: clientY }))
     );
 
   o.pipe(map(({ x, y }) => `${x},${y}`)).subscribe(
     (s: string) => (pos.innerHTML = s)
   );
 
   o.pipe(filter(({ x }) => x > 400)).subscribe((_) =>
     pos.classList.add("highlight")
   );
 
   o.pipe(filter(({ x }) => x <= 400)).subscribe(({ x, y }) => {
     pos.classList.remove("highlight");
   });
 }
 
 // Exercise 5
 // ===========================================================================================
 // ===========================================================================================
 function piApproximation() {
   // a simple, seedable, pseudo-random number generator
   class RNG {
     // LCG using GCC's constants
     readonly m = 0x80000000; // 2**31
     readonly a = 1103515245;
     readonly c = 12345;
     constructor(readonly state: number) {}
     int() {
       return (this.a * this.state + this.c) % this.m;
     }
     float() {
       // returns in range [0,1]
       return this.int() / (this.m - 1);
     }
     next() {
       return new RNG(this.int());
     }
   }
 
   const resultInPage = document.getElementById("value_piApproximation"),
     canvas = document.getElementById("piApproximationVis");
 
   if (!resultInPage || !canvas) {
     console.log("Not on the observableexamples.html page");
     return;
   }
 
   // Some handy types for passing data around
   type Colour = "red" | "green";
   type Point = {x: number, y: number}
   type Dot = { centre: Point; colour: Colour };
   interface Data {
     insideCount: number;
     outsideCount: number;
   }
 
   // an instance of the Random Number Generator with a specific seed
   const rng = new RNG(20);
   // return a random number in the range [-1,1]
   const nextRandom = () => rng.float() * 2 - 1;
   // you'll need the circleDiameter to scale the dots to fit the canvas
   const circleRadius = Number(canvas.getAttribute("width")) / 2;
   // test if a point is inside a unit circle
   const inCircle = ({ x, y }: Point) => x * x + y * y <= 1;
   // you'll also need to set innerText with the pi approximation
   resultInPage.innerText =
     "...Update this text to show the Pi approximation...";
 
   // Your code starts here!
   // =========================================================================================
   function createDot(d: Dot) {
     if (!canvas) throw "Couldn't get canvas element!";
     const dot = document.createElementNS(canvas.namespaceURI, "circle");
     // Set circle properties
    //  const x = 50, y = 50
     dot.setAttribute("cx", String(d.centre.x));
     dot.setAttribute("cy", String(d.centre.y));
     dot.setAttribute("r", "5");
     dot.setAttribute("fill", d.colour);
     // Add the dot to the canvas
     canvas.appendChild(dot);
   }
 
   // A stream of random numbers
   const randomNumberStream = (seed: number) => interval(50).pipe(
     scan((r, _) => r.next(), new RNG(seed)),
     map(r => 1-2*r.float())
   ),
   makeDots = (pred: any, colour: Colour) => point$.pipe(filter(pred), 
      map((p: Point) => <Point>{x: (p.x+1)*circleRadius, y: (p.y+1)*circleRadius}), 
      map(p=><Dot>{centre: p, colour: colour}))

   const point$ = 
     zip(randomNumberStream(1), randomNumberStream(2))
       .pipe(map(([x, y]) => <Point>{x,y})),
     inside$ = makeDots(inCircle, "green"),
     outside$ = makeDots(!(inCircle), "red"),
     dot$ = merge(inside$, outside$)

   const pi$ = dot$.pipe(
     scan<Dot, Data>(({insideCount, outsideCount}, d) =>
       d.colour === 'green' ? {insideCount: insideCount+1, outsideCount} : {insideCount, outsideCount: outsideCount+1},
       {insideCount: 0, outsideCount: 0}),
     map(({insideCount, outsideCount}) => 4 * insideCount / (insideCount + outsideCount))
   )
   dot$.subscribe(createDot)
   pi$.subscribe(pi => resultInPage.innerText = String(pi))
 }
 
 // Exercise 6
 // ===========================================================================================
 // ===========================================================================================
 /**
  * animates an SVG rectangle, passing a continuation to the built-in HTML5 setInterval function.
  * a rectangle smoothly moves to the right for 1 second.
  */
 function animatedRectTimer() {
   // get the svg canvas element
   const svg = document.getElementById("animatedRect")!;
   // create the rect
   const rect = document.createElementNS(svg.namespaceURI, "rect");
   Object.entries({
     x: 100,
     y: 70,
     width: 120,
     height: 80,
     fill: "#95B3D7",
   }).forEach(([key, val]) => rect.setAttribute(key, String(val)));
   svg.appendChild(rect);
 
   const animate = setInterval(
     () => rect.setAttribute("x", String(1 + Number(rect.getAttribute("x")))),
     10
   );
   const timer = setInterval(() => {
     clearInterval(animate);
     clearInterval(timer);
   }, 1000);
 }
 
 /**
  * Demonstrates the interval method
  * You want to choose an interval so the rectangle animates smoothly
  * It terminates after 1 second (1000 milliseconds)
  */
 function animatedRect() {
   // Your code starts here!
   // =========================================================================================
   const svg = document.getElementById("animatedRect");
    const rect = document.createElementNS(svg.namespaceURI, 'rect')
    Object.entries({
      x: 100,
      y: 70,
      width: 120,
      height: 80,
      fill: "#95B3D7",
    }).forEach(([key, val]) => rect.setAttribute(key, String(val)));
    svg.appendChild(rect);

    interval(10)
    .pipe(
      takeUntil(interval(1000))
    ).subscribe(() => rect.setAttribute('x', String(1 + Number(rect.getAttribute('x')))));

 }
 
 // Exercise 7
 // ===========================================================================================
 // ===========================================================================================
 /**
  * Create and control a rectangle using the keyboard! Use only one subscribe call and not the interval method
  * If statements
  */
 function keyboardControl() {
   // get the svg canvas element
   const svg = document.getElementById("moveableRect")!;
 
   // Your code starts here!
   // =========================================================================================
   const rect = document.createElementNS(svg.namespaceURI,'rect');
    Object.entries({
      x: 100, 
      y: 70,
      width: 120, 
      height: 80,
      fill: '#95B3D7',
    }).forEach(([key, val])=>rect.setAttribute(key, String(val)))
    svg.appendChild(rect);
  
    // keystrokes
   const listener = fromEvent<KeyboardEvent>(document,"keydown")
   const speed = 15
   const wUp = listener.pipe(filter((e:KeyboardEvent) => e.key === 'w' || e.key === "ArrowUp"),
                   map(_ =>(obj:Element) => obj.setAttribute('y', String(Number(obj.getAttribute('y')) - speed))
                   )
                 )
   const sDown = listener.pipe(filter((e:KeyboardEvent) => e.key === 's' || e.key === "ArrowDown"),
                   map(_ =>(obj:Element) => obj.setAttribute('y', String(Number(obj.getAttribute('y')) + speed))
                   )
                 )
   const aLeft = listener.pipe(filter((e:KeyboardEvent) => e.key === 'a' || e.key === "ArrowLeft"),
                   map(_ =>(obj:Element) => obj.setAttribute('x', String(Number(obj.getAttribute('x')) - speed))
                   )
                 )
   const dRight = listener.pipe(filter((e:KeyboardEvent) => e.key === 'd' || e.key === "ArrowRight"),
                   map(_ =>(obj:Element) => obj.setAttribute('x', String(Number(obj.getAttribute('x')) + speed))
                   )
                 )
   merge(wUp, sDown, aLeft, dRight).subscribe((f) => f(rect));
}
 
 // Running the code
 // ===========================================================================================
 // ===========================================================================================
 document.addEventListener("DOMContentLoaded", function (event) {
   piApproximation();
 
   // compare mousePosEvents and mousePosObservable for equivalent implementations
   // of mouse handling with events and then with Observable, respectively.
   //mousePosEvents();
   mousePosObservable();
 
 //   animatedRectTimer();
   // replace the above call with the following once you have implemented it:
   animatedRect()
   keyboardControl();
 });
