export class Publicacion {
    id: number;
    user: number;
    nombre: string;
    descripcion: string;
    shiny: boolean;
    ivs: String = "";
    evs: String = "";
    createAt: Date;
    
    // Valores solamente usados en el front
    userImagen: string;
    ivsForm: number[] = [0, 0, 0, 0, 0, 0];
    evsForm: number[] = [0, 0, 0, 0, 0, 0];
}
