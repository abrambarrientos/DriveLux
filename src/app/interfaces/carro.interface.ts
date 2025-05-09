export interface Carro {
    id: number;
    marca : string;
    nombre: string;
    imagen: string;
    caracteristicasIzq: string[];
    caracteristicasDer: string[];
  }
  export interface ApiResponse {
  products: Carro[];
}