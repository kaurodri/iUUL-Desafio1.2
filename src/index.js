import { VerificarDadosPaciente, Paciente, Agendamento } from './classes/index.js';
import promptSync from 'prompt-sync';

const entrada = promptSync({ sigint: true });

const verificando = new VerificarDadosPaciente();
const cadastro = new Paciente();
const consulta = new Agendamento(cadastro);

const menus = [
    {
        chave: 'MenuPrincipal',
        mensagem: `${`-`.padEnd(25, '-')}\nMenu Principal\n1-Cadastro de pacientes\n2-Agenda\n3-Fim\n${`-`.padEnd(12, '-')}`
    },
    {
        chave: 'MenuCadastroPacientes',
        mensagem: `${`-`.padEnd(25, '-')}\nMenu do Cadastro de Pacientes\n1-Cadastrar novo paciente\n2-Excluir paciente\n3-Listar pacientes (ordenado por CPF)\n4-Listar pacientes (ordenado por nome)\n5-Voltar p/ menu principal\n${`-`.padEnd(12, '-')}`
    },
    {
        chave: 'MenuAgenda',
        mensagem: `${`-`.padEnd(25, '-')}\nAgenda\n1-Agendar consulta\n2-Cancelar agendamento\n3-Listar agenda\n4-Voltar p/ menu principal\n${`-`.padEnd(12, '-')}`
    }
];

//Legenda (tela):
// 0 -> Menu Principal
// 1 -> Menu do Cadastro de Pacientes
// 2 -> Menu da Agenda
// 3 -> Cadastrar novo paciente
// 4 -> Excluir paciente
// 5 -> Listar pacientes (ordenado por CPF)
// 6 -> Listar pacientes (ordenado por nome)

function obterMenu(tela, escolha) {
    if (tela === 0 && escolha === 1) return 1;
    if (tela === 0 && escolha === 2) return 2;
    if (tela === 0 && escolha === 3) return 9;
    if (tela === 1 && escolha === 1) return 3;
    if (tela === 1 && escolha === 2) return 4;
    if (tela === 1 && escolha === 3) return 5;
    if (tela === 1 && escolha === 4) return 6;
    if (tela === 1 && escolha === 5) return 0;
    if (tela === 2 && escolha === 4) return 0;
    return null;
}

let tela = 0;
let teste = true;
while (teste == true) {
    if (tela == 9) break;
    let menuAtual = menus[tela].mensagem;
    console.log(menuAtual);
    let escolha = Number(entrada(`Sua escolha: `));
    tela = obterMenu(tela, escolha);
    console.log('');

    if (tela == 3) {
        let cpf = entrada(`CPF: `);
        let nome = entrada(`Nome: `);
        let data = entrada(`Data de nascimento: `);

        let conteudo = `\n${cadastro.cadastrarPaciente(cpf, nome, data).mensagem}.\n`;
        console.log(conteudo);
        
        let final = entrada(`Voltar pro Menu Principal? [ s / n ]: `);
        tela = (final == 's') ? 0 : 9;

    } else if (tela == 5) {
        const colunas = `${`CPF`.padEnd(12)} ${`Nome`.padEnd(20)} ${`Dt.Nasc.`.padEnd(10)} ${`Idade`.padEnd(5)}`;
        const separator = `-`.padEnd(50, '-');
        console.log(separator);
        console.log(colunas);
        console.log(separator);
        console.log( cadastro.listarPacientes() );

        let final = entrada(`Voltar pro Menu Principal? [ s / n ]: `);
        tela = (final == 's') ? 0 : 9;
        
    };
};