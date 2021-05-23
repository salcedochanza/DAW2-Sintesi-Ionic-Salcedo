export class Recursos {
    private _id: string;
    private _titol: string;
    private _descripcio: string;
    private _disponibilitat: string;
    private _categoria: string;
    private _explicacio: string;

    get id(): string {
        return this._id;
    }
    get titol(): string {
        return this._titol;
    }
    get descripcio(): string {
        return this._descripcio;
    }
    get disponibilitat(): string {
        return this._disponibilitat;
    }
    get categoria(): string {
        return this._categoria;
    }
    get explicacio(): string {
        return this._explicacio;
    }

    set id(id:string){
        this._id = id;
    }
    set titol(titol:string){
        this._titol = titol;
    }
    set descripcio(descripcio:string){
        this._descripcio = descripcio;
    }
    set disponibilitat(disponibilitat:string){
        this._disponibilitat = disponibilitat;
    }
    set categoria(categoria:string){
        this._categoria = categoria;
    }
    set explicacio(explicacio:string){
        this._explicacio = explicacio;
    }
}
