const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('collection1').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists)
    });
}; 

const getSingle = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a Valid contact Id to find Item')
    }
    const ItemId1 = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('collection1').find({_id: ItemId1});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0])
    });
}; 


const createItem = async(req, res) => {
    //const userId = new ObjectId(req.parmas.id);
    const Item = {
        ItemName: req.body.ItemName,
        Department: req.body.Department,
        Store: req.body.Store,
        City: req.body.City,
        Stock: req.body.Stock,
        Price: req.body.Price,
        Aisle: req.body.Aisle
        };
    const response = await mongodb.getDatabase().db().collection('collection1').insertOne(Item);
    if (response.acknowledged){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating Item');
    }
};
const updateItem = async(req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a Valid contact Id for updating Item')
    }
    const ItemId = new ObjectId(req.params.id);
    const Item = {
        ItemName: req.body.ItemName,
        Department: req.body.Department,
        Store: req.body.Store,
        City: req.body.City,
        Stock: req.body.Stock,
        Price: req.body.Price,
        Aisle: req.body.Aisle
    };
    const response = await mongodb.getDatabase().db().collection('collection1').replaceOne({_id: ItemId}, Item);
    if (response.modifiedCount > 0 ){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating Item');
    }
};


const deleteItem = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a Valid contact Id for deleting Item')
    }
    const itemId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('collection1').remove({ _id: itemId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  };

module.exports = {
    getAll,
    getSingle,
    createItem,
    updateItem,
    deleteItem
};