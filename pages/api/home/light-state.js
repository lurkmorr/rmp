import cfg from '../../../private/settings'

export default (req, res) => {
    if(req.method === 'GET') {
        res.statusCode = 200
        res.json({cfg})
    }else {
        console.log('post')
    }
}