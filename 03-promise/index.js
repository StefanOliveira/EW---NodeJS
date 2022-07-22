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
            street: 'Elm Street'
        })
    }, 2000 );

}

const userPromise = getUser()
// para manipular sucesso usamos a função .then
// para manipular erros, .catch
// usuario -> telefone -> telefone
userPromise
    .then(function(user){
        return getPhone(user.id)
            .then(function resolvPhone(result){
                return {
                    user: {
                        name: user.name,
                        id: user.id
                    },
                    phone: result
                }
            })
    })
    .then(function (resultUser){
        const address = getAddrAsync(resultUser.user.id)
        return address.then(function resolvAddr(result){
            return {
                user: resultUser.user,
                phone: resultUser.phone,
                address: result
            }
        })
    })
    .then(function (resultUser){
        console.log(`
            Name: ${resultUser.user.name},
            Phone: ${resultUser.phone.ddd} ${resultUser.phone.phone},
            Address: ${resultUser.address.street}
        `)
    })
    .catch(function (error){
        console.error('Shit Happens', error)
    })
   