const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let parallaxSpeed = 4;

const backgroundLayer1 = new Image();
backgroundLayer1.src = '/assets/img/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = '/assets/img/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = '/assets/img/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = '/assets/img/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = '/assets/img/layer-5.png';

window.addEventListener('load', ()=>{
    const slider = document.getElementById('slider');
    slider.value = parallaxSpeed;
    const showParallaxSpeed = document.getElementById('parallaxspeed');
    showParallaxSpeed.innerHTML = parallaxSpeed;
    slider.addEventListener('change', (e)=> {
        parallaxSpeed = e.target.value;
        showParallaxSpeed.innerHTML = e.target.value;
    });

    class Layer {
        constructor(image, speedModifier){
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = parallaxSpeed * this.speedModifier;
        }
        update(){
            this.speed = parallaxSpeed * this.speedModifier;
            if(this.x <= -this.width){
                this.x = 0;
            }
            this.x = this.x - this.speed;
        }
        draw(){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    
    
    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);
    
    const parallaxObject = [layer1, layer2, layer3, layer4, layer5];
    
    const animate = () => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        parallaxObject.forEach(object => {
            object.update();
            object.draw();
            // console.log(object.x);
        });
        requestAnimationFrame(animate);
    };
    animate();
});

