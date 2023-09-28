module.exports = {
    type: 'get',
    order:0,
    routePath: '/teststhree',
    route: (router) => {
        router.get('/teststhree', (req, res) => {
            res.render('teststhree', {
                title: 'Test Three', //page title
                cssBody: '/assets/css/body.css',
                cssPage: '/assets/css/teststhree.css'
            });
        });
    }
}