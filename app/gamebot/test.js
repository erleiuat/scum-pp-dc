const bot = require('./gamebot')

function timer(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000)
    })
}


async function testIt() {
    await bot.start()

    await timer(2)
    //await bot.action(['piss'])
    await bot.message('global', '[AUTH]: >>> blabla left <<<')
    
    //await timer(5)
    //await bot.action(['dress'])
    //await bot.message('local', '#Teleport -119367 -68301 36808')
    //await bot.action(['idle'])

    

    await timer(2)
    await bot.message('global', '[AUTH]: >>> blabla is joining <<<')
    await bot.action(['eat'])

    /*
    await bot.action([
        'repair',
        [
            '#Teleport -119367 -68301 36808',
            '#Teleport -105285 -69285 36718'
        ]
        
    ])
    
    await bot.action('trade_count')
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