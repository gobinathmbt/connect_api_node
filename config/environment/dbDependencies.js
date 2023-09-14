let ENV = 'DEV'; //DEV,QA,LIVE,UAT
if (ENV == 'LOCAL') {
    module.exports.dbPort = "27017";
    module.exports.dbURL = "mongodb://localhost/CONNECT";
    module.exports.dbName = "CONNECT";
} else if (ENV == 'DEV') {
    module.exports.dbPort = "27017";
    module.exports.dbURL = "mongodb+srv://montbleuadmin:OUv5S3br4Kf1Yp3f@clusterconnect.hmocyfl.mongodb.net/connect_development?retryWrites=true&w=majority";
    module.exports.dbName = "CONNECT";
}

