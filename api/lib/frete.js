const axios = require('axios');
require('dotenv').config()

const calcFrete = async(args) => {
  
    const options = {
        method: 'POST',
        url: 'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmYxOWViNDYwMGIyMWFlN2ZmZDczMzI1MWY3MTBkZmY0NGEwOWQ1MzI0MzExNjFhNTAwMGFlNTUwNDc5NTRhZTM4NjBhMDJlYTI5ZGUwNzEiLCJpYXQiOjE3Mzc5ODQxNDYuMTQwNjQxLCJuYmYiOjE3Mzc5ODQxNDYuMTQwNjQyLCJleHAiOjE3Njk1MjAxNDYuMDkxMDc3LCJzdWIiOiI5Y2NjNmY5Ny01MTlkLTRlMjctYjhhOS00NGVjZDU5YWNkMzciLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.UAh4Fok1_3UQ2IfuPBijG4t_AqeRwSWpKyZF5kxE64ssEFyfTef8qZsFEJ7lDyMotrbcKoL1Sf3uMV6kTlLSnXPk9m0fMGDtfxH6YF3zhFqpgzqUHze48cUKBQ78er1UOf3RBzbag_jBc7hyOC1YsQ1CEkw-tQc98NtfIwjbA0FZEI_LWIdAnq1LX0IPxgblg9zz9m6v7CmK7xJaVKBX_XPmhSou-lAR5l1p-351K6QkNz-FAJvX80RL2MVBfMRxm124iK4NHKAwMR4KjWGxLsy_OjliK6jXlYP02lFx8x4yQ34PqecHKkKQJLnPUppRVZ9eUjvwdQ7hXY53mERN5iptk10PMGo9eXpvhVrUy71VMLfa5E-qtC9yL3U0L3I6LYMWpp9ZryLnL2mptBSVcJboz3CM2I03JU_73y7Niutx7l_sbbMKpqnpKY1nqMywMzYSHrqMOCiuohS54n4Ke9pK2rZ90n8pAnkSpvZehTM2Lo0Os389AwoSuMMtl7QREhBsei20udpHIEd8RyJn5ULCRgCY_66_MEeI0mzmQ5LR5QOsXZOzMWuUOEOUwDNgL5w0cfaqODmF0TbyxlK8SvlnJf9tQs0IO1IrMyCHdQkSsg2m7f2wiRAdwYolIRBASIg521N13vtjFGqKynpbDZZKMPgtj3fzkWoNf1vh7sg`,
          'User-Agent': `Aplicação ${process.env.AUTH_EMAIL}`
        },
        data: {
          from: {postal_code: process.env.ENV_MY_CEP},
          to: {postal_code: `${args.cep}`},
          products: args.products
        }
    }

      
      
      const result = await axios.request(options)

      return result
    
      
}

const allItemsCart = async(args) => {
  
    const options = {
        method: 'GET',
        url: 'https://www.melhorenvio.com.br/api/v2/me/cart',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.ENV_TOKEN}`,
          'User-Agent': `Aplicação ${process.env.AUTH_EMAIL}`
        },
      }

      
      
      const result = await axios.request(options)

      return result
    
      
}

const addFreteCart = async(args) => {
  const {firstname,lastname,emailContact,country,cep,adresses,houseNumber,cityComplement,
    neighborhood,city,uf,deliveryMethod,identificationType,cpf,cnpj,phone,products,totalPrice,paymentMethod} = args

    const newProducts = products.map((product,i)=>{
      const newObj = {
        name: String(product.name),
        quantity: String(product.amountProduct),
        unitary_value: String(product.price),
        weight: String(product.weight)
      }

      return newObj
    })

    console.log('newProducts: ', newProducts)

    const volumes = products.map((product,i)=>{
      const newObj = {
        height: product.height,
        width: product.width,
        length: product._length,
        weight: product.weight,
      }

      return newObj
    })

    console.log('volumes: ', volumes)

    const data = {
      service: 1,
      from: {
        name: `Felipe Correia`,
        phone: '75983446135',
        email: 'felipecorreiasilva@outlook.com',
        document: '07408791540',
        state_register: '',
        address: 'Rua Guaratatuba',
        complement: '',
        number: '456',
        district: 'Tomba',
        city: 'Feira de Santana',
        country_id: 'BR',
        postal_code: process.env.ENV_MY_CEP,
        state_abbr: 'BA',
        note: ''
      },
      to: {
        name: `${firstname} ${lastname}`,
        phone: phone,
        email: 'felipecorreiasilva@hotmail.com',
        document: cpf,
        state_register: '',
        address: adresses,
        complement: cityComplement,
        number: houseNumber,
        district: neighborhood,
        city: city,
        country_id: 'BR',
        postal_code: cep,
        state_abbr: uf,
        note: ''
      },
      products: newProducts,
      volumes: [
        {
          height: 43,
          width: 60,
          length: 70,
          weight: 30
        },
      ],
      
    }

    const options = {
      method: 'POST',
      url: 'https://www.melhorenvio.com.br/api/v2/me/cart',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ENV_TOKEN}`,
        'User-Agent': `Aplicação ${process.env.AUTH_EMAIL}`
      },
      data
      
    };    
      
      const result = await axios.request(options)

      return result
    
      
}

const getFreteCartById = async(id) => {
  const options = {
    method: 'GET',
    url: `https://www.melhorenvio.com.br/api/v2/me/cart/${id}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.ENV_TOKEN}`,
      'User-Agent': `Aplicação ${process.env.AUTH_EMAIL}`
    }
  };
  
  const result = await axios.request(options)
      return result.data

}

const getLabelById = async(params) => {
  const options = {
    method: 'GET',
    url: 'https://www.melhorenvio.com.br/api/v2/me/orders/search',
    params: {q: params},
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${process.env.ENV_TOKEN}`,
      'User-Agent': `Aplicação ${process.env.AUTH_EMAIL}`
    }
  };
  
  const result = await axios.request(options)
  console.log('asdasdssa',result)
      return result.data

}

module.exports = {
    calcFrete,
    allItemsCart,
    addFreteCart,
    getFreteCartById,
    getLabelById
}