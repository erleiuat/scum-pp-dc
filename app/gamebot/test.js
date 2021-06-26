const bot = require('./gamebot')

function timer(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000)
    })
}


async function testIt() {
    await bot.start()

    await timer(2)
    await bot.action('dress')
    
    /*
    await bot.message('global', '#Teleport -116369 -65906 37144')
    await bot.message('global', '1')
    await bot.message('global', '2')
    await bot.message('local', '1')
    await bot.message('global', '3')
    await bot.message('global', '4')
    #Teleport -116369 -65906 37144
    #Teleport -81703 38939 68214
    await bot.message('global', '2')
    await bot.message('global', '3')


    await bot.message('global', '2')
    await bot.message('global', '3')
    await bot.message('global', '4')
    await bot.message('global', '5')
    await bot.message('global', '6')
    await bot.message('global', '[AUTH]: >>> blabla is joining <<<')

    await timer(5)

    await bot.message('local', 'aaa aaa aaa')
    await bot.message('local', 'bbb bbb bbb')
    await bot.message('local', 'ccc ccc ccc')

    await timer(2)

    await bot.message('local', '#settime 8')
    */
}

testIt()