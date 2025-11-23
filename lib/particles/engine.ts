export type ParticleEngineOptions = {
  color?: string;
  density?: number;
  parallaxStrength?: number;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
};

const defaultOptions: Required<ParticleEngineOptions> = {
  color: 'rgba(139, 92, 255, 0.8)',
  density: 120,
  parallaxStrength: 0.12,
};

export class ParticleEngine {
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private pointer = { x: 0, y: 0 };
  private dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  private logicalWidth = 0;
  private logicalHeight = 0;

  constructor(private canvas: HTMLCanvasElement, private options: Required<ParticleEngineOptions>) {}

  static create(canvas: HTMLCanvasElement, opts?: ParticleEngineOptions) {
    return new ParticleEngine(canvas, { ...defaultOptions, ...opts });
  }

  init() {
    this.ctx = this.canvas.getContext('2d');
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    this.pointer = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    this.spawnInitialParticles();
  }

  destroy = () => {
    window.removeEventListener('resize', this.handleResize);
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  };

  handleResize = () => {
    if (!this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    this.logicalWidth = rect.width;
    this.logicalHeight = rect.height;
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
  };

  spawnInitialParticles() {
    const width = this.logicalWidth || this.canvas.width / this.dpr;
    const height = this.logicalHeight || this.canvas.height / this.dpr;
    const total = Math.min(this.options.density, (width * height) / 4000);
    for (let i = 0; i < total; i += 1) {
      this.particles.push(this.createParticle(Math.random() * width, Math.random() * height));
    }
  }

  createParticle(x: number, y: number): Particle {
    return {
      x,
      y,
      size: Math.random() * 2.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      life: 0,
      ttl: 600 + Math.random() * 600,
    };
  }

  updatePointer(x: number, y: number) {
    this.pointer = { x, y };
  }

  start() {
    const loop = () => {
      this.animationId = requestAnimationFrame(loop);
      this.tick();
    };
    loop();
  }

  private tick() {
    const ctx = this.ctx;
    if (!ctx) return;

    const width = this.logicalWidth || ctx.canvas.width / this.dpr;
    const height = this.logicalHeight || ctx.canvas.height / this.dpr;
    ctx.clearRect(0, 0, width, height);

    this.particles.forEach((particle) => {
      particle.life += 1;
      if (particle.life > particle.ttl) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.life = 0;
      }

      const dx = (this.pointer.x - particle.x) * this.options.parallaxStrength;
      const dy = (this.pointer.y - particle.y) * this.options.parallaxStrength;
      particle.x += particle.vx + dx;
      particle.y += particle.vy + dy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = this.options.color;
      ctx.globalAlpha = 0.7;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
