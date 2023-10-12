const database = 'GreenMile';
const collection = 'Hotels';


use(database);

//db.Hotels.updateMany({}, {$set: {country: 'Israel'},{$set: {checkIn: '12:30'}}})
db.Hotels.updateMany({}, {$set: {country: 'Israel', checkIn: '12:30',checkOut: '8:45',city:'Tel Aviv'}})
