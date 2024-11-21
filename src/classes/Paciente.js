import VerificarDadosPaciente from './VerificarDadosPaciente.js';
import ListagemPaciente from './ListagemPaciente.js';

class Paciente {
    constructor() {
        this.pacientes = [];
    }

    verificarCPFExistente(cpf) {
        return this.pacientes.some(paciente => paciente.cpf === cpf);
    }

    cadastrarPaciente(cpf, nome, dataNascimento) {
        const verificando = new VerificarDadosPaciente();

        const CPF = verificando.validarCPF(cpf);
        const NOME = verificando.validarNome(nome);
        const NASCIMENTO = verificando.validarDataNascimento(dataNascimento);
        const EXISTENTE = this.verificarCPFExistente(cpf);

        if(CPF.verificar && NOME.verificar && NASCIMENTO.verificar && !EXISTENTE) {
            this.pacientes.push({ cpf, nome, dataNascimento });
            return {
                verificar: true,
                mensagem: 'Paciente cadastrado com sucesso'
            };
        } else {
            let mensagemERRO = !CPF.verificar ? CPF.mensagem : !NOME.verificar ? NOME.mensagem : !NASCIMENTO.verificar ? NASCIMENTO.mensagem : 'CPF Já Cadastrado';
            return {
                verificar: false,
                mensagem: `Erro ao cadastrar o paciente [${mensagemERRO}]`
            };
        }
    }

    listarPacientes() {
        const listar = new ListagemPaciente();
        return {
            porNome: listar.imprimirPorNome(this.pacientes),
            porCPF: listar.imprimirPorCPF(this.pacientes)
        };
    }

    dadosPacientes() {
        return this.pacientes;
    }
}

export default Paciente;