class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (let i in this) {
            if (this[i] === undefined || this[i] === '' || this[i] === null) {
                return false;
            }
        }
        return true;
    }
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id');

        if (id === null || isNaN(parseInt(id))) {
            localStorage.setItem('id', '0');
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(d) {
        let id = this.getProximoId();
        localStorage.setItem(id.toString(), JSON.stringify(d));
        localStorage.setItem('id', id.toString());
    }

    getDespesas() {
        let despesas = [];

        for (let i = 1; i <= parseInt(localStorage.getItem('id')); i++) {
            let despesa = JSON.parse(localStorage.getItem(i.toString()));
            if (despesa !== null) {
                despesas.push(despesa);
            }
        }

        return despesas;
    }
}

let bd = new Bd();

function cadastrarDespesa() {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

    if (despesa.validarDados()) {
        bd.gravar(despesa);

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso';
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!';
        document.getElementById('modal_btn').innerHTML = 'Voltar';
        document.getElementById('modal_btn').className = 'btn btn-success';

        // dialog de sucesso
        $('#modalRegistraDespesa').modal('show');
    } else {
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro';
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_conteudo').innerHTML =
            'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!';
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir';
        document.getElementById('modal_btn').className = 'btn btn-danger';

        // dialog de erro
        $('#modalRegistraDespesa').modal('show');
    }
}

// Função para preencher a tabela com as despesas
function preencherTabelaDespesas(despesas) {
    let tabelaBody = document.getElementById('tabelaDespesas').getElementsByTagName('tbody')[0];
    tabelaBody.innerHTML = ''; // Limpar a tabela antes de preenchê-la novamente

    for (let i = 0; i < despesas.length; i++) {
        let despesa = despesas[i];

        // Criar uma nova linha na tabela
        let newRow = tabelaBody.insertRow();

        // Preencher as células da linha com os dados da despesa
        let cellAno = newRow.insertCell(0);
        let cellMes = newRow.insertCell(1);
        let cellDia = newRow.insertCell(2);
        let cellTipo = newRow.insertCell(3);
        let cellDescricao = newRow.insertCell(4);
        let cellValor = newRow.insertCell(5);

        cellAno.innerHTML = despesa.ano;
        cellMes.innerHTML = despesa.mes;
        cellDia.innerHTML = despesa.dia;
        cellTipo.innerHTML = despesa.tipo;
        cellDescricao.innerHTML = despesa.descricao;
        cellValor.innerHTML = despesa.valor;
    }
}

// No seu código onde obtém todas as despesas
let todasDespesas = bd.getDespesas();
console.log(todasDespesas);

// Preencher a tabela com as despesas recuperadas
preencherTabelaDespesas(todasDespesas);
