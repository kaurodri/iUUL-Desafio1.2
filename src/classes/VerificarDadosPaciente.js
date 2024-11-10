class VerificarDadosPaciente {
    validarCPF(CPF) {
        if (CPF.length !== 11 || /^(\d)\1{10}$/.test(CPF)) {
            return {
                verificar: false,
                mensagem: 'Formato de CPF Inválido'
            };
        };
    
        function calcularDigitoVerificador(CPF, multiplicadores) {
            let soma = 0;
            for (let i = 0; i < CPF.length; i++) {
                soma += parseInt(CPF[i]) * multiplicadores[i];
            }
            let resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        };
    
        const tabela = {
            multiplicadoresJ : [10, 9, 8, 7, 6, 5, 4, 3, 2],
            multiplicadoresK : [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
        };
    
        const primeiroDV = calcularDigitoVerificador(CPF.slice(0, 9), tabela.multiplicadoresJ);
        const segundoDV = calcularDigitoVerificador(CPF.slice(0, 10), tabela.multiplicadoresK);

        let verificar = CPF[9] == primeiroDV && CPF[10] == segundoDV;

        return {
            verificar: verificar,
            mensagem: verificar ? 'CPF Válido' : 'CPF Inválido'
        };
    };

    validarNome(nome) {
        let verificar = nome.length >= 5;
        return {
            verificar: verificar,
            mensagem: verificar ? 'Nome Válido' : 'O nome deve ter pelo menos 5 caracteres'
        };
    }

    validarDataNascimento(dataNascimento) {
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = dataNascimento.match(regex);
        if (!match) {
            return {
                verificar: false,
                mensagem: 'Formatação de Data Inválida'
            };
        }

        const [_, dia, mes, ano] = match;
        const dataNascimentoObj = new Date(`${ano}-${mes}-${dia}`);
        const idade = new Date().getFullYear() - dataNascimentoObj.getFullYear();
        const mesAtual = new Date().getMonth() + 1;
        const diaAtual = new Date().getDate();

        let verificar = idade < 13 || (idade === 13 && (mesAtual < mes || (mesAtual === mes && diaAtual < dia)));
        return {
            verificar: !verificar,
            mensagem: verificar ? 'Idade Insuficiente' : 'Idade Suficiente'
        };
    }
}

export default VerificarDadosPaciente;