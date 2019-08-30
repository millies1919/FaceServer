const handleImage = (req, res) => {
    const { id } = req.body;
    postgres('users').where("id", '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entires'))
}

module.export = {
    handleImage: handleImage
}