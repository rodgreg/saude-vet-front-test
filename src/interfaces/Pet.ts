export interface Pet {
    petID:Number | null;
    nome:String;
    especie:String;
    raca:String;
    cor:String;
    genero:String;
    nascimento:Date | null;
    pedigree:boolean;
    fertil:boolean;
}