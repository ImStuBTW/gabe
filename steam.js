module.exports.populate = function() {
    console.log('Populating Export.');
    return new Promise(function(resolve, reject) {
        console.log('Populating Database.');
        fetchApps().then(populateDB).then(function() {
            console.log('Done Populating Export.');
            resolve();
        });
    });
};

module.exports.find = function(searchPattern) {
    console.log('Find Export For:' + searchPattern);
    return new Promise(function(resolve, reject) {
        findAppid(searchPattern).then(fetchDetails).then(function(details) {
            if(details) {
                var slackMessage = {
                    "text": "Here's what I could find about <" + details.steam_applink + "|" + details.name + "> on Steam.",
                    "unfurl_links": false,
                    "attachments": [
                        {
                            "fallback": "Here's what I could find about " + details.name + " on Steam. It's $" + (details.price_overview.final/100).toFixed(2) + " and can be found here: " + details.steam_applink,
                            "color": "#818182",
                            "fields": [
                                {
                                    "title": "Price",
                                    "value": "$" + (details.price_overview.final/100).toFixed(2) + " (" + details.price_overview.discount_percent + "% Off)",
                                    "short": true
                                },
                                {
                                    "title": "Release Date",
                                    "value": details.release_date.date,
                                    "short": true
                                },
                                {
                                    "title": "Genres",
                                    "value": genresConstructor(details.genres),
                                    "short": true
                                },
                                {
                                    "title": "Platforms",
                                    "value": platformConstructor(details.platforms),
                                    "short": true
                                }
                            ],
                            "image_url": details.header_image
                        }
                    ]
                };
            }
            else {
                if(searchPattern.toLowerCase() === 'help') {
                        var slackMessage = {
                            "text": "Howdy! I'm Gabe, the Steam searching slack bot.\nTo use me, just type '/steam' and then the exact name of a game title.",
                            "unfurl_links": false,
                        };
                }
                else {
                    var slackMessage = {
                        "text": "Sorry, I couldn't find any games matching: " + searchPattern,
                        "unfurl_links": false,
                    };
                }
            }
            console.log('Done Find Export For: ' + searchPattern);
            resolve(slackMessage);
        });
    });
}

// File IO.
var fs = require("fs");
var file = "apps.db";
var exists = fs.existsSync(file);

// Configure SQLite
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(file);

// Configure steam-store
var SteamStore = require('steam-store');
var store = new SteamStore({
  country:  'US',
  language: 'en'
});

var fetchApps = function() {
    console.log('> Fetching App List.');
    return new Promise(function(resolve, reject) {
        var apps = store.steam('getAppList');
        console.log('> Done Fetching App List.');
        resolve(apps);
    });
};

var populateDB = function(result) {
    console.log('> Populating DB.');
    return new Promise(function(resolve, reject) {
        db.serialize(function() {
            if(!exists) {
                db.run("DROP TABLE IF EXISTS Apps");
                db.run("CREATE TABLE Apps (name TEXT, appid INT)");
                var stmt = db.prepare("INSERT INTO Apps VALUES (?,?)");

                result.applist.apps.forEach(function(element, index, array) {
                    stmt.run(element.name, element.appid);
                });

                stmt.finalize(function() {
                    console.log('> Populated DB.');
                    resolve();
                });
            }
            else {
                console.log('> DB Already Populated.');
                resolve();
            }
        });
    });
};

var findAppid = function(searchPattern) {
    console.log('> Appid of: ' + searchPattern);
    return new Promise(function(resolve, reject) {
        db.serialize(function() {
            var gameid = -1;
            db.get("SELECT rowid AS id, name, appid FROM Apps WHERE name LIKE '" + searchPattern + "'", function(err, row) {
                if(row) { gameid = row.appid };
                console.log('> Done Appid of: ' + searchPattern);
                resolve(gameid);
            });
        });
    });
};

var fetchDetails = function(appid) {
    console.log('> Details of Appid: ' + appid);
    return new Promise(function(resolve, reject) {
        if(appid !== -1) {
            store.steam('appDetails', appid).then(function(result) {
                console.log('> Done Details of Appid: ' + appid);
                //console.log(result);
                resolve(result);
            });
        }
        else {
            resolve(false);
        }
    });
};

var platformConstructor = function(platforms) {
    var string = "";
    var consoles = [];
    if(platforms.windows) {
        consoles.push("PC");
    }
    if(platforms.mac) {
        consoles.push("Mac");
    }
    if(platforms.linux) {
        consoles.push("Linux");
    }
    string = consoles.join([separator = ', ']);
    return(string);
};

var genresConstructor = function(genres) {
    var string = "";
    var array = [];
    genres.forEach(function(genre) {
        array.push(genre.description);
    });
    string = array.join([separator = ', ']);
    return(string);
};
