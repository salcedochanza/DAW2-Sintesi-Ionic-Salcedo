export class Recursos {
    private _id: string;
    private _titol: string;
    private _descripcio: string;
    private _explicacio: string;
    private _categoria: string;
    private _tipus_disponibilitat: string;
    private _disponibilitat: string;
    private _tipus: string;
    private _canvas: string;
    private _videorecurs: string;
    private _adjunts: string;
    private _propietari: string;

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
    get tipus_disponibilitat(): string {
        return this._tipus_disponibilitat;
    }
    get explicacio(): string {
        return this._explicacio;
    }
    get tipus(): string {
        return this._tipus;
    }
    get canvas(): string {
        return this._canvas;
    }
    get videorecurs(): string {
        return this._videorecurs;
    }
    get adjunts(): string {
        return this._adjunts;
    }
    get propietari(): string {
        return this._propietari;
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
    set tipus_disponibilitat(tipus_disponibilitat:string){
        this._tipus_disponibilitat = tipus_disponibilitat;
    }
    set explicacio(explicacio:string){
        this._explicacio = explicacio;
    }
    set tipus(tipus:string){
        this._tipus = tipus;
    }
    set canvas(canvas:string){
        this._canvas = canvas;
    }
    set videorecurs(videorecurs:string){
        this._videorecurs = videorecurs;
    }
    set adjunts(adjunts:string){
        this._adjunts = adjunts;
    }
    set propietari(propietari:string){
        this._propietari = propietari;
    }
}
