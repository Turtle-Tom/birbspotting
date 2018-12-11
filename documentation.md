
# Birb Spotting

---

Name: Thomas Garbe O'Connor

Date: 11/8/2018

Project Topic: Organize data on birb spottings

URL: https://birbspotting.herokuapp.com/

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: name               `Type: String`
- `Field 2`: state              `Type: String`
- `Field 3`: color              `Type: String`
- `Field 4`: spotter            `Type: String`
- `Field 5`: season             `Type: String`
- `Field 6`: size               `Type: Number`
- `Field 7`: characteristics    `Type: Array`

Schema:
```javascript
{
    var birbSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true
        },

        state:{
            type: String,
            required: true
        },

        color:{
            type: String,
            required: true
        },

        spotter:{
            type: String,
            required: true
        },

        season:{
            type: String,
            required: true
        },

        size:{
            type: Number,
            required: true
        },

        characteristics:{
            type: Array,
            required: true
        }
    });

    var Birb = mongoose.model('Birb', birbSchema);

    module.exports = Birb;
}
```

### 2. Add New Data

HTML form route: `/add`

POST endpoint route: `/api/add/`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/add',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        "name": "Bluejay",
        "state": "Maryland",
        "color": "blue",
        "spotter": "Thomas Marlowe",
        "season": "fall",
        "size": "10",
        "characteristics": ["aggressive", "playful"]
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/`

### 4. Search Data

Search Field: birb name, spotter, state, season, color, size, characteristics

### 5. Navigation Pages

Navigation Filters
1. Home ->          `/`
2. Add Birb ->      `/add`
3. Winter Birbs ->  `/winter`
4. Most Popular ->  `/popular`
5. Featured ->      `/featured`
