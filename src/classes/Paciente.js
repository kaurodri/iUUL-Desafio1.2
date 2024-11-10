import VerificarDadosPaciente from './VerificarDadosPaciente.js';

class Paciente {
    constructor() {
        this.pacientes = [];
    }

    verificarCPFExistente(cpf) {
        return this.pacientes.some(paciente => paciente.cpf === cpf);
    }

    cadastrarPaciente(cpf, nome, dataNascimento) {
        const cadastro = new VerificarDadosPaciente();

        const CPF = cadastro.validarCPF(cpf);
        const NOME = cadastro.validarNome(nome);
        const NASCIMENTO = cadastro.validarDataNascimento(dataNascimento);
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
        return this.pacientes;
    }
}

export default Paciente;