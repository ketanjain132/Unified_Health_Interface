const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://satyajeetsjsj:007sj007@cluster0.gwdwnzm.mongodb.net/test', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

