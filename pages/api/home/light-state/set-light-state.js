import cfg from '../../../../private/settings'

export default (req, res) => {
    if(req.method === 'POST') {
        const {i,flag} = req.body
        cfg.rooms[i].lightState = !flag
        res.statusCode = 200
        res.json(cfg.rooms)
    }
}