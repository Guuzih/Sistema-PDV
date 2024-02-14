const aws = require('aws-sdk')

const endpoint = new aws.Endpoint(process.env.ENDPOINT);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
});

const upload = async (path, buffer, mimetype) => {
    const upload = await s3.upload({
        Bucket: process.env.BB_BUCKET,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promise();

    return{            
            url: `http://${process.env.BB_BUCKET}.${process.env.ENDPOINT}/${upload.Key}`,
            path: upload.Key
        };
    
};

const excluirArquivo = async (path) => {

    await s3.deleteObject({
        Bucket: process.env.BB_BUCKET,
        Key: path
    }).promise();

};

module.exports = {
    excluirArquivo,
    upload
};
