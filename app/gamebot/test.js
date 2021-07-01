const bot = require('./gamebot')

function timer(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000)
    })
}


async function testIt() {
    resp = await bot.start()
    if(resp.error || resp.state != 'running') {
        console.log('not working smh')
        return False
    }
    

    resp = await bot.messages([{
        scope: 'local',
        message: '1'
    },{
        scope: 'local',
        message: '2'
    },{
        scope: 'local',
        message: '3'
    },{
        scope: 'local',
        message: '3'
    },{
        scope: 'local',
        message: '2'
    },{
        scope: 'local',
        message: '1'
    },{
        scope: 'local',
        message: '1'
    },{
        scope: 'local',
        message: '2'
    },{
        scope: 'local',
        message: '3'
    },{
        scope: 'local',
        message: '3'
    },{
        scope: 'local',
        message: '2'
    },{
        scope: 'local',
        message: '1'
    }])
    
    console.log(resp)

    resp = await bot.actions({
        dress: true
    })
    
    console.log(resp)
    /*
    
    resp = await bot.actions({
        light: [
            '#Teleport -119367 -68301 36808',
            '#Teleport -105285 -69285 36718'
        ]
    })
    


    resp = await bot.messages([{
        scope: 'local',
        message: '1'
    },{
        scope: 'local',
        message: '2'
    },{
        scope: 'local',
        message: '3'
    },{
        scope: 'global',
        message: '1'
    },{
        scope: 'global',
        message: '2'
    },{
        scope: 'global',
        message: '3'
    }])

    console.log(resp)

    resp = await bot.message('global', '#setweather 0')
    console.log(resp)

    resp = await bot.message('local', 'Hallo')
    console.log(resp)

    resp = await bot.message('global', 'Du Sau')
    console.log(resp)

    resp = await bot.message('global', '1')
    console.log(resp)
    resp = await bot.message('global', '2')
    console.log(resp)
    resp = await bot.message('global', '3')
    console.log(resp)
    resp = await bot.message('global', '4')
    console.log(resp)
    resp = await bot.message('global', '5')
    console.log(resp)
    resp = await bot.message('local', '1')
    console.log(resp)
    resp = await bot.message('local', '2')
    console.log(resp)
    resp = await bot.message('local', '3')
    console.log(resp)
    resp = await bot.message('local', '4')
    console.log(resp)
    resp = await bot.message('local', '5')
    console.log(resp)
    
    
    
    
    
    //await timer(5)
    //await bot.action(['dress'])
    let resp = await bot.action(['mapshot'])
    console.log(resp)

    resp = await bot.message('local', '#Teleport -119367 -68301 36808')
    console.log(resp)
    
    resp = await bot.action(['idle'])
    console.log(resp)
    resp = await bot.action(['dress'])
    console.log(resp)
    await timer(2)
    await bot.message('global', '[AUTH]: >>> blabla is joining <<<')
    //await bot.action(['piss'])
    await bot.message('global', '[AUTH]: >>> blabla left <<<')
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