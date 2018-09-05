let itemData = {
    name: req.body.name,
    type: req.body.type,
    strength: req.body.strength,
    userId: req.body.userId,
    countryOrigin: req.body.countryOrigin,

};

Item.create(itemData).then(function (newItem) {
    if (newItem) {
        console.log(newItem.toString());
    }


});


$('#addItemButton').click(function () {
    $.ajax({
        url: "/addItem",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {
            name: $('#name').val(),
            type: $('#type').val(),
            strength: $('#strength').val(),
            userId: $('#userId').val(),
            countryOrigin: $('#countryOfOrigin').val(),
        },

        cache: false,
        timeout: 5000,
        complete: function() {

        },

        success: function (data) {
            console.log(data);
            $('#addItem')[0].reset();

        },

        error: function(error) {
            console.log(error);
        }
    });

});


.then(function () {
    return Item
        .all()
        .then(items => res.render('dashboard', {
            title: 'ghT Bar',
            username: req.user.username,
            items: items
        })
            .catch(error => res.status(400).send(error)));
}).catch(error => res.status(400).send(error));