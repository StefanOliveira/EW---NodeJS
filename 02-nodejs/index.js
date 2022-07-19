/*
0 Obter um usuário
1 Obeter o numero de telefone de um usuário a partir de seu ID
2 Obter o endereco do usuario pelo Id
*/

function getUser(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            name: 'Tanjiro',
            dataNascimento: new Date()
        })
    }, 1000);

}

function getPhone(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            phone: '3223-4567',
            ddd: 19
        })
    }, 2000);

}

function getAddr(userId, callback) {
    setTimeout(() =>{
        return callback(null, {
            street: 'Elm Street'
        })
    }, 2000 );

}

function userResolv(erro, user) {
    console.log('User', user)
}

getUser(function userResolv(error, user) {
    if (error) {
        console.error('Shit Happens no User', error)
        return;
    }
    getPhone(user.id, function phoneResolv(error1, phone) {
        if (error1) {
            console.error('Shit Happens no Phone', error)
            return;
        }
        getAddr(user.id, function addResolv(error2, address) {
            if (error2) {
                console.error('Shit Happens no Address', error)
                return;
            }

            console.log(`
             Name: ${user.name},
             Address: ${address.street},
             Phone: (${phone.ddd})${phone.phone}
            `)
        })

    })

})

