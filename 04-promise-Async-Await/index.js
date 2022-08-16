/*
0 Obter um usuário
1 Obeter o numero de telefone de um usuário a partir de seu ID
2 Obter o endereco do usuario pelo Id
3 Promise - refatorando código
4 Importamos um módulo interno do node.js
*/

const util = require('util')
const getAddrAsync = util.promisify(getAddr)

function getUser() {
    // quando retornar problema -> reject(ERRO)
    // quando sucesso -> RESOLV
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            return resolve({
                id: 1,
                name: 'Tanjiro',
                birthDate: new Date()
            })
         }, 1000);
    })   

}

function getPhone(userId) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                ddd: 19,
                phone: '3223-4567'
            })
        }, 2000);

    })
    
}

function getAddr(userId, callback) {
    setTimeout(() =>{
        return callback(null, {
            street: 'Elm Street',
            number: '2022'
        })
    }, 2000 );

}

main()
async function main() {
    try {
        console.time('time-promise')
        const user = await getUser()
        //const phone = await getPhone(user.id)
        //const address = await getAddrAsync(user.id)
        const result = await Promise.all([
            getPhone(user.id),
            getAddrAsync(user.id)
        ])
        const address = result[1]
        const phone = result[0]
        console.log(`
            Name: ${user.name},
            Phone: (${phone.ddd}), ${phone.phone},
            Address: (${address.street}), ${address.number}
        `)
        console.timeEnd('time-promise')

    } catch (error) {
        console.error('Shit happens', error)
    }
}