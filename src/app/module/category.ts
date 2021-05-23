export class Category {
    private _id:string;
    private _name:string;
    private _parentId:string;

    
    get id() : string {
        return this._id;
    }
    get name() : string {
        return this._name;
    }
    get parentId() : string {
        return this._parentId;
    }
    
    set id(id : string) {
        this._id = id;
    }
    set name(name : string) {
        this._name = name;
    }
    set parentId(parentId : string) {
        this._parentId = parentId;
    }
}
