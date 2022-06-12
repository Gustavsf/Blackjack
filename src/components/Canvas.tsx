import * as React from 'react'
type Particle = {
    x: number,
    y: number,
    size: number,
    speedX: number,
    speedY: number
}
interface CanvasProps {
    shouldRender: boolean
}

export const Canvas = (props: CanvasProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const [width, setWidth] = React.useState<number>();
    const [heigth, setHeigth] = React.useState<number>();
    const particleArr: Particle[] = []
    const createParticle = () => {
        const h = window.innerHeight
        const w = window.innerWidth
        const particle = {
            x: w / 2 - 300,
            y: h / 2 - 300,
            size: Math.random() * 5 + 1,
            speedX: Math.random() * 10 - 1.5,
            speedY: Math.random() * 10 - 1.5
        }
        return particle
    }
    const updateParticle = (particle: Particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
    }
    const draw = (context: CanvasRenderingContext2D, particle:Particle) => {
        const colors = ['red', 'green', 'yellow', 'purple', 'blue']
        let min = Math.ceil(0);
        let max = Math.floor(4);
        const rand =  Math.floor(Math.random() * (max - min + 1)) + min;
        context.fillStyle = colors[rand];
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size*2, 0, 2 * Math.PI);
        context.fill();
    }
    const init = () => {
        for(let i = 0; i < 100; i++){
            particleArr.push(createParticle())
        }
    }
  React.useEffect(() => {
    let end: boolean = true;
    if(props.shouldRender){
        setWidth(window.innerWidth)
        setHeigth(window.innerHeight)
        const h = window.innerHeight
        const w = window.innerWidth
        init()
        window.addEventListener('resize', ()=>{
            setWidth(window.innerWidth)
            setHeigth(window.innerHeight)
        })
    if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');  
        if (context) {      
            const animate = () => {
                context.clearRect(0, 0, w, h)
                for(let i = 0; i < particleArr.length; i++){
                    const part = particleArr[i];
                    updateParticle(part)
                    draw(context, part)
                }
                if(end){
                    requestAnimationFrame(animate)
                } else {
                    context.clearRect(0, 0, w, h)

                }
            }
            animate();
            setTimeout(()=>{
                end = false
            }, 2000)
        }
    }
    }
    }, [props.shouldRender])
   
  return <canvas ref={canvasRef} id='canvas-explo' height={heigth} width={width} />
}