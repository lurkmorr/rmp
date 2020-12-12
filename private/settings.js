const cfg = {
    rooms : [
        {
            id : 1,
            title : 'Прихожая',
            lightState : true,
            lightIntensity : 100,
            temperature : {
                value : 0,
                max : 30,
                min : 10
            },
        },
        {
            id : 2,
            title: 'Спальная комната',
            lightState : true,
            lightIntensity : 100,
            temperature : {
                value : 0,
                max : 30,
                min : 10
            },
        },
        {
            id : 3,
            title : 'Кухня',
            lightState : true,
            lightIntensity : 100,
            temperature : {
                value : 0,
                max : 30,
                min : 10
            },
        },
    ]
}

setInterval(()=>{
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    cfg.rooms.forEach(el => {
        el.temperature.value = getRandomInt(30)
    })
}, 1000)

export default cfg