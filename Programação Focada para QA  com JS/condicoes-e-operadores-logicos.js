let Cadastro = {
    nome: 'Tiago Felipe dos Santos',
    usuario: 'tiagosantos0412',
    cargo: 'Analista de QA',
    email: 'tiagosantos0412@gmail.com',
    senha: '123456' 
}


const { stdout } = require('process')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Desativa o eco da senha no terminal (segurança)
rl.on('SIGINT', () => process.exit(0))

console.log('TFS Solutions')
console.log('Sistema de login....')

rl.question('Usuário....: ', (usuario)=>{
    rl.question('senha....: ', { silent: true }, (senha)=>{
        console.log('\nUsuário:', usuario)
        console.log('Senha:', '*'.repeat(senha.length))
        rl.close()

        if(usuario === Cadastro.usuario && senha === Cadastro.senha){
            console.log(`Bem vindo ${Cadastro.nome} | ${Cadastro.cargo}`)
        }else {
            console.log('Acesso negado! Login ou senha inválidos')
        }
    })
})