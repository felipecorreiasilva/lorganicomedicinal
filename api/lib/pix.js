const https = require('https');

const axios = require('axios');
const fs = require('fs');

const apiProduction = 'https://api-pix.gerencianet.com.br'
const apiStaging = 'https://api-pix-h.gerencianet.com.br'

const baseUrl = process.env.GN_ENV === 'producao' ? apiProduction : apiStaging

const getToken = async() => {

    const certificado = fs.readFileSync('./'+process.env.GN_CERTIFICADO) 
    const credenciais = {

        client_id: process.env.GN_CLIENT_ID,
        client_secret: process.env.GN_CLIENT_SECRET

    }
    const data = JSON.stringify({ grant_type: 'client_credentials' });
    const dataCredenciais = credenciais.client_id + ':' + credenciais.client_secret;
    const auth = Buffer.from(dataCredenciais).toString('base64')

    const agent = new https.Agent({

        pfx: certificado,
        passphrase: ''

    })

    const config = {
        method: 'POST',
        url: baseUrl + '/oauth/token',
        headers: {
            Authorization: 'Basic '+auth,
            'Content-type': 'application/json'
        },
        httpsAgent: agent,
        data: data
    }
    const result = await axios(config)
    return result.data

}

const createCharge = async (accessToken, chargeData) => {
    const certificado = fs.readFileSync('./'+process.env.GN_CERTIFICADO) 
    const data = JSON.stringify(chargeData);

    const agent = new https.Agent({
        pfx: certificado,
        passphrase: ''
    })

    const config = {
        method: 'POST',
        url: baseUrl + '/v2/cob',
        headers: {
            Authorization: 'Bearer '+ accessToken,
            'Content-type': 'application/json'
        },
        httpsAgent: agent,
        data: data
    }
    const result = await axios(config)
    return result.data
}

const getQrCodeByLocId = async (accessToken, locId) => {
    const certificado = fs.readFileSync('./'+process.env.GN_CERTIFICADO) 

    const agent = new https.Agent({
        pfx: certificado,
        passphrase: ''
    })

    const config = {
        method: 'GET',
        url: baseUrl + '/v2/loc/' + locId + '/qrcode',
        headers: {
            Authorization: 'Bearer '+ accessToken,
            'Content-type': 'application/json'
        },
        httpsAgent: agent,
    }
    const result = await axios(config)
    return result.data
}

const getLocById = async (accessToken, locId) => {
    const certificado = fs.readFileSync('./'+process.env.GN_CERTIFICADO) 

    const agent = new https.Agent({
        pfx: certificado,
        passphrase: ''
    })

    const config = {
        method: 'GET',
        url: baseUrl + '/v2/loc/' + locId,
        headers: {
            Authorization: 'Bearer '+ accessToken,
            'Content-type': 'application/json'
        },
        httpsAgent: agent,
    }
    const result = await axios(config)
    return result.data
}

const getAllCob = async (accessToken) => {
    const certificado = fs.readFileSync('./'+process.env.GN_CERTIFICADO) 

    const agent = new https.Agent({
        pfx: certificado,
        passphrase: ''
    })

    const config = {
        method: 'GET',
        url: baseUrl + '/v2/cob/?inicio=2020-10-22T16:01:35Z&fim=2025-10-23T16:01:35Z',
        headers: {
            Authorization: 'Bearer '+ accessToken,
            'Content-type': 'application/json'
        },
        httpsAgent: agent,
    }
    const result = await axios(config)
    return result.data
}

const getCobById = async (accessToken, CobId) => {
    const certificado = fs.readFileSync('./'+process.env.GN_CERTIFICADO) 

    const agent = new https.Agent({
        pfx: certificado,
        passphrase: ''
    })

    const config = {
        method: 'GET',
        url: baseUrl + '/v2/cob/' + CobId,
        headers: {
            Authorization: 'Bearer '+ accessToken,
            'Content-type': 'application/json'
        },
        httpsAgent: agent,
    }
    const result = await axios(config)
    return result.data
}

const createPixCharge = async(order)=>{
    const chave = process.env.GN_CHAVE_PIX
    const token = await getToken();
    const accessToken = token.access_token
    const {cpf,firstname,lastname,totalPrice} = order
    
    const cob =  {
        "calendario": {
          "expiracao": 3600
        },
        "devedor": {
          cpf,
          "nome": firstname+" "+lastname
        },
        "valor": {
          "original": totalPrice.toFixed(2)
        },
        chave,
        "solicitacaoPagador": "Cobrança dos serviços prestados."
        }
        const cobranca = await createCharge(accessToken, cob)
        const qrcode = await getQrCodeByLocId(accessToken, cobranca.loc.id)
        return {cobranca, qrcode};

}

module.exports = {
    createPixCharge,
    getToken,
    getAllCob,
    getQrCodeByLocId,
    getLocById,
    getCobById

}