import cfg from '../../../../private/settings'

export default (req, res) => {
    if(req.method === 'POST') {
        const {i,value} = req.body
        cfg.rooms[i].temperature.min = value
        res.statusCode = 200
        res.json(cfg.rooms)
        console.log(cfg.rooms[i])
    }
}