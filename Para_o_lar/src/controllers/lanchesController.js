const lanchesSchema = require("../models/lanchesModel") 

const getAll = async (req, res) => {
    try {
        const allLanches = await lanchesSchema.find()
        res.status(200).send(allLanches)
    } catch (err) {
        console.log(err)
    }
};

const createLanche = async (req, res) => {        
    try {
        const newLanche = new lanchesSchema({                       
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category
        })
        console.log("NOVO LANCHE", newLanche);

        const savedLanche = await newLanche.save();

        if(savedLanche){
        res.status(201).send({
            "message": "Lanche criado com Sucesso!",
            savedLanche
            })
        }

    } catch(err) {
        console.log(err);
    }
    
}

const updateLanche = async (req, res) => {
    try{

        const findLanche = await lanchesSchema.findById(req.params.id)

        if(!findLanche) {
            res.status(404).send({
                "message": "Lnche não encontrado!",
                "statusCode": 404
            })
        }       
        findLanche.title = req.body.title || findLanche.title
        findLanche.price = req.body.price || findLanche.price
        findLanche.description = req.body.description || findLanche.description
        findLanche.category = req.body.category || findLanche.category        
        
        console.log("Lanche Atualizado", findLanche)
        const savedLanche = await findLanche.save()
        
        res.status(200).send({
            "message": "Lanche Atualizado com Sucesso!",
            findLanche
        })
    } catch(err) {
        console.log(err);
    }
}

const deleteLanche = async (req, res) => {
    try {
    // acessar o documento a ser deletado
    const findLanche = await lanchesSchema.findById(req.params.id)
    // deletar o documento
    await findLanche.delete()

    res.status(200).send({
        "message": "Lanche deletado com sucesso!",
        findLanche
    })
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    getAll,
    createLanche,
    updateLanche,
    deleteLanche
}