import { InputText, Label } from "../../../utils/HtmlComponents";

export function CadMedicamento() {
    return (
        <div>
            <h2>Cadastro de Medicamentos</h2>
            <form>
                <Label>Nome</Label>
                <InputText />
                <Label>Descrição</Label>
                <InputText />
                <Label>Posologia</Label>
                <InputText />
                <Label>Indicação</Label>
                <InputText />
            </form>
        </div>
    )
}