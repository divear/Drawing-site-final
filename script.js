
window.addEventListener("load", () => {
    Load();
});

let fs = false;
let f = false;
let rect = false;
let cansize = false;
let firstX;
let firstY;
let circsize = false;
let drawed = true;

let circs = false;
let CfirstX;
let CfirstY;

let trings = false;
let TfirstX;
let TfirstY;
let shouldclose = false;


let firstPosX;
let firstPosY;


function Load(f,thickness,color){

    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");
    
    
    if(f == true){
        c.lineWidth = thickness;
        c.strokeStyle = color;
        
        if(rect == true){

            window.addEventListener("mousedown", () => {
                if(f == true){
                    Drawrect();
                }
                
            });
            window.addEventListener("mousemove", () => {
                if(f == true){
                    Sizerect();
                }
                
            });
            window.addEventListener("mouseup", () => {
                if(f == true){
                    Stoprect();
                }
            });

            function Drawrect(){
                
                
                firstX = mouse.x;
                firstY = mouse.y;
                if(f == true){
                    cansize = true;
                }
            };
            function Sizerect(){
                
                if(cansize == true){
                   
                    document.querySelector("canvas").style.cursor = "nw-resize";
                    let w = mouse.x - firstX;
                    let h = mouse.y - firstY;
                    c.clearRect(firstX,firstY,canvas.width,canvas.height)
                    c.clearRect(firstX,firstY,-canvas.width,-canvas.height)
                    c.clearRect(firstX,firstY,canvas.width,-canvas.height)
                    c.clearRect(firstX,firstY,-canvas.width,canvas.height)
                        
                    c.strokeRect(firstX ,firstY, w, h);
                }
                
            };
            function Stoprect(){
                
                cansize = false;
                document.querySelector("canvas").style.cursor = "cell";
                
            };
            
        }
    }else if(trings == true){

        canvas.addEventListener("click", () => {
                DrawTr();       
        });

        let firstT = true;

        function DrawTr(){
            
            TfirstX = mouse.x;
            TfirstY = mouse.y;

            c.arc(TfirstX,TfirstY,1,0,2*Math.PI)
            
            if(firstT == true){
                firstPosX = TfirstX;
                firstPosY = TfirstY;
                firstT = false;
            }
        }

    }else if(circs == true){


        window.addEventListener("mousedown", () => {
                Drawcirc();
                 
        });
        window.addEventListener("mousemove", () => {
                setInterval(Sizecirc,10);     
        });
        window.addEventListener("mouseup", () => {
                Stopcirc();
        });

        function Drawcirc(){
            console.log("drawing");
            CfirstX = mouse.x;
            CfirstY = mouse.y;
            circsize = true;
        }
        function Clearcirc(){
            c.clearRect(0, 0, canvas.width, canvas.height);
            
        }
        function Sizecirc(){
            
            if(circsize == true){
                let cw = mouse.x - CfirstX;
                let ch = mouse.y - CfirstY;

                if(cw < 0){
                    cw = -cw;
                }
                if(ch < 0){
                    ch = -ch;
                }
                
                console.log("sizing");
                document.querySelector("canvas").style.cursor = "nw-resize";
            
                c.beginPath();
                c.arc(CfirstX,CfirstY,cw+ch,0, 2*Math.PI);
                Clearcirc(); 
            }
        }
        function Stopcirc(){
            circsize = false;
        }

       
            
    
        
    }else{
        
        let painting = false;

        canvas.height = window.innerHeight -50; //1143
        canvas.width = window.innerWidth -40;//2370
    
        function start(e){
            painting = true;
            Draw(e);
        }

        function stop(){
            painting = false;
            c.beginPath()
        }

        function Draw(e){
            if (painting == false) return;
            if(fs == true) return;
            c.strokeStyle = color;
            
            c.lineCap = "round";
            c.lineTo(e.clientX,e.clientY);
            c.stroke();
            moveTo(e.clientX,e.clientY); 
        }

        canvas.addEventListener("mousedown",start);
        canvas.addEventListener("mouseup",stop);
        canvas.addEventListener("mousemove",Draw);
    }
};

function Changer(){
    let f = true;
    let thickness = document.getElementById("range").value;
    
    

    let color = document.getElementById("color").value;


    Load(f,thickness,color);
};

let cc = false;

function PickMode(){
    switch (cc){
        case false:
            fs = true;
            cc = true;
            document.querySelector("canvas").style.cursor = "crosshair";
            document.getElementById("cords").style.visibility = "visible";


            break;
        case true:
            fs = false;
            c = false;
            document.querySelector("canvas").style.cursor = "pointer";
            document.getElementById("cords").style.visibility = "hidden";

            break;

    }
};

window.addEventListener("mousemove", () => {
    Mousemove(event);
});

let mouse = {
    x: undefined,
    x: undefined
}

function Mousemove(event){
    mouse.x = event.x;
    mouse.y = event.y;
    let cordswrite = document.getElementById("cords");
    cordswrite.innerHTML = mouse.x;
    cordswrite.innerHTML += "," + mouse.y; 
};

let sq = false;

function Addsquare(){
    switch (sq){
        case false:
            f = true;
            sq = true;
            rect = true;
            document.querySelector("canvas").style.cursor = "cell";
            Load()
            break;
        case true:
            location.reload();
           
            break;
    }
};

let circlick = false;

function AddCircles(){
    switch (circlick){
        case false:
            circs = true;
            
            document.querySelector("canvas").style.cursor = "cell";
            circlick = true;
            Load()
            break;
        case true:
            location.reload();
            break;
    }
};

let trclick = false;

function AddTriangle(){
    switch (trclick){
        case false:
            trings = true;
            document.getElementById("clbutton").style.visibility = "visible";
            document.querySelector("canvas").style.cursor = "copy";
            trclick = true;
            Load()
            break;
        case true:
            location.reload();
            break;
    }
};

function Closepath(){

    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");


    c.beginPath();
    c.moveTo(firstPosX,firstPosY);
    c.lineTo(TfirstX,TfirstY);
    c.stroke();
    
};



