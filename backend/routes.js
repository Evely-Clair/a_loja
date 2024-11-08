const express = require('express');
const router = express.Router();
const { getArtigoByBarcode, getArtigoBySearch, getArtigoLocalizacao, getLocais, getSublocais, getPosicoes } = require('./get.js');
const { updateQT, updateLocalArtigo } = require('./update.js')

function createRouter(db) {
    router.get('/produto', (req, res) => getArtigoByBarcode(req, res, db));

    router.get('/produto/localizacao/:barcode', (req, res) => getArtigoLocalizacao(req, res, db));

    router.get('/local', (req, res) => getLocais(req, res, db));

    router.get('/local/sublocal/:idLocal', (req, res) => getSublocais(req, res, db));
    
    router.get('/local/sublocal/posicao/:idSubLocal', (req, res) => getPosicoes(req, res, db));
    
    router.get('/produto/search/:search', (req, res) => getArtigoBySearch(req, res, db));

    router.put('/update/qt/:barcode', (req, res) => updateQT(req, res, db));

    router.put('/update/local/', (req, res) => updateLocalArtigo(req, res, db));

    router.delete('/produto/barcode/delete/:barcode', (req, res) => deleteProduto(req, res, db));

    return router;
}

module.exports = createRouter;