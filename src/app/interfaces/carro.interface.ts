export interface Carro {
  id: number;
  marca: string;
  nombre: string;
  imagen: string;
  caracteristicasIzq: string[];
  caracteristicasDer: string[];
  imagenesAdicionales?: string[];
  video?: string; 
  descripcionTecnica?: string[];
}
export interface ApiResponse {
  products: Carro[];
}