import { Component, HostListener, OnInit, OnDestroy, ViewChild,ElementRef} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Carro } from '../../interfaces/carro.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  MAX_FRAMES = 200;
  currentFrame = 1;
  lastFrameUpdate = 0;
  maxScroll = 1;
  currentImageSrc = '';
  textOpacity = 0;
  headerOpacity = 0;
  private destroy$ = new Subject<void>();
  isHomeActive = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateImage(1);
    this.calculateMaxScroll();
    
    // Verificar la ruta actual y sus cambios
    this.checkCurrentRoute();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.checkCurrentRoute());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkCurrentRoute() {
    this.isHomeActive = this.router.url === '/home';
  }

  private calculateMaxScroll() {
    this.maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateMaxScroll();
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isHomeActive) return;
    if (Date.now() - this.lastFrameUpdate < 10) return;
    
    this.lastFrameUpdate = Date.now();
    const scrollPosition = window.scrollY;
    const scrollFraction = scrollPosition / this.maxScroll;
    const frame = Math.min(
      this.MAX_FRAMES,
      Math.max(1, Math.floor(scrollFraction * this.MAX_FRAMES * 1.6))
    );

    if (frame !== this.currentFrame) {
      this.updateImage(frame);
      this.currentFrame = frame;
    }
  }

  private pad(num: number, size = 3): string {
    return num.toString().padStart(size, '0');
  }

  private updateImage(frame: number) {
    this.currentImageSrc = `/FramesHero/ezgif-frame-${this.pad(frame)}.jpg`;
  }

  @ViewChild('contenedorCarrusel') contenedorCarrusel!: ElementRef;

  offsetX = 0;
  visibleThumbnails = 4;
  thumbnailWidth = 120; // w-32 (128px) + gap-4 (16px) = 144px

  carros: Carro[] = [
    {
      nombre: 'Toyota Supra MK5',
      imagen: '/imgCarros/ToyotaSupra2.png',
      caracteristicasIzq: ['Motor 3.0L', 'Tracción trasera'],
      caracteristicasDer: ['340 HP', 'Automático 8 veloc']
    },
    {
      nombre: 'Mazda RX-7 FD',
      imagen: '/imgCarros/mazda2.png',
      caracteristicasIzq: ['Motor Wankel 1.3L', 'Peso: 1300kg'],
      caracteristicasDer: ['276 HP', 'Manual 5 veloc']
    },
    {
      nombre: 'Nissan GT-R R35',
      imagen: '/imgCarros/nissangtr2.png',
      caracteristicasIzq: ['3.8L V6 Twin Turbo', 'AWD'],
      caracteristicasDer: ['565 HP', '0-100 km/h: 2.7s']
    },
    {
      nombre: 'Porsche 911 Turbo S',
      imagen: '/imgCarros/porche2.png',
      caracteristicasIzq: ['3.8L Flat-6 Turbo', 'AWD'],
      caracteristicasDer: ['650 HP', '0-100: 2.7s']
    },
    {
      nombre: 'Ford Mustang Shelby GT500',
      imagen: '/imgCarros/Mustang.png',
      caracteristicasIzq: ['5.2L Supercharged V8', 'Tracción trasera'],
      caracteristicasDer: ['760 HP', 'Manual 7 veloc']
    },
    {
      nombre: 'Chevrolet Corvette C8',
      imagen: '/imgCarros/chevrolet2.png',
      caracteristicasIzq: ['6.2L V8', 'Motor central'],
      caracteristicasDer: ['495 HP', '0-100: 2.9s']
    },

  ];


  hoveredIndex: number | null = null;
  currentIndex: number = 0;

  onThumbnailHover(index: number) {
    this.hoveredIndex = index;

    const maxOffset = -((this.carros.length - this.visibleThumbnails) * this.thumbnailWidth);
    this.offsetX = Math.max(maxOffset, Math.min(0, -index * this.thumbnailWidth + (this.visibleThumbnails / 2) * this.thumbnailWidth));
  }

  onThumbnailLeave() {
    this.hoveredIndex = this.currentIndex;
  }

  seleccionarCarro(index: number) {
    this.currentIndex = index;
    this.hoveredIndex = index;
    this.onThumbnailHover(index);
  }

  anterior() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.carros.length - 1;
    this.seleccionarCarro(this.currentIndex);
  }

  siguiente() {
    this.currentIndex = this.currentIndex < this.carros.length - 1 ? this.currentIndex + 1 : 0;
    this.seleccionarCarro(this.currentIndex);
  }

  get carroSeleccionado(): Carro | null {
    return this.hoveredIndex !== null ? this.carros[this.hoveredIndex] : null;
  }

  verDetalleCarro(id: number) {
    // Navega a la ruta de detalle manteniendo header/footer
    this.router.navigate(['/carro', id]);

    // Opcional: Scroll al inicio de la página
    window.scrollTo(0, 0);
  }
  
}