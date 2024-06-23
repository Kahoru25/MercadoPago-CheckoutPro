import { MercadoPagoConfig, Payment, Preference } from "mercadopago"
// import { MERCADOPAGO_API_KEY } from "../config"

const MERCADOPAGO_API_KEY = ''

export const createOrder = async (req, res) => {
    try {
        const client = new MercadoPagoConfig({
            accessToken:
                MERCADOPAGO_API_KEY
        })

        // const payment = new Payment(client)

        const body = {
            items: [
                {
                    title: "Producto",
                    unit_price: 20000,
                    currency_id: "COP",  //tipo de moneda
                    quantity: 1
                }
            ],
            back_urls: {
                success: "localhost:3000/success",
                failure: "localhost:3000/order-failed",
                pending: "localhost:3000/pending"
            },
            auto_return: "approved",
            notification_url: "https://db79-152-174-224-104.ngrok-free.app/webhook"
        }
        

        const preference = new Preference(client)
        const result = await preference.create({ body })

        res.json({
            result
        })

    } catch (error) {
        console.error(error)
    }
}

export const receiveWebhook = (req, res) => {
    try {
        const payload = req.body

        const { data: { id } } = payload

        const client = new MercadoPago({ accessToken: MERCADOPAGO_API_KEY, options: { timeout: 5000 } });

        const payment = new Payment(client)

        payment.get({ id: id, })
            .then(console.log)
            .catch(console.log);

        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ error: error.message })
    }
}



