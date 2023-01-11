import { InputText, Label } from "../../../utils/HtmlComponents";

export function CadPatologia() {
    return (
        <div>
            <h2>Cadastro de Patologias</h2>
            <form>
                <Label>Nome</Label>
                <InputText />
                <Label>Código</Label>
                <InputText />
                <Label>Descrição</Label>
                <InputText />
            </form>
        </div>
    )
}