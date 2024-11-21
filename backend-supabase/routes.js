const express = require('express');
const router = express.Router();
const { insertLocalizacao } = require('./insert.js');
const { getArtigoByBarcode, getArtigoBySearch, getArtigoLocalizacao, getLocais, getSublocais, getPosicoes,  getMarca, getCategoria, getFornecedor, getFamilia, getSubfamilia } = require('./get.js');
const { updateQT, updateLocalArtigo } = require('./update.js');
const { deleteLocalizacao } = require('./delete.js');

function createRouter(db) {
    router.post('/insert/local', (req, res) => insertLocalizacao(req, res, db));

    router.get('/produto', (req, res) => getArtigoByBarcode(req, res, db));

    router.get('/produto/localizacao/:barcode', (req, res) => getArtigoLocalizacao(req, res, db));

    router.get('/filtros/marcas', (req, res) => getMarca(req, res, db) );
      
    router.get('/filtros/fornecedores', (req, res) => getFornecedor(req, res, db));

    router.get('/filtros/categorias', (req, res) => getCategoria(req, res, db));

    router.get('/filtros/familias', (req, res) => getFamilia(req, res, db));

    router.get('/filtros/subfamilias', (req, res) => getSubfamilia(req, res, db));
      
    router.get('/local', (req, res) => getLocais(req, res, db));

    router.get('/local/sublocal/:idLocal', (req, res) => getSublocais(req, res, db));
    
    router.get('/local/sublocal/posicao/:idSubLocal', (req, res) => getPosicoes(req, res, db));
    
    router.get('/produto/search', (req, res) => getArtigoBySearch(req, res, db));

    router.put('/update/qt/:barcode', (req, res) => updateQT(req, res, db));

    router.put('/update/local/:idArtigo', (req, res) => updateLocalArtigo(req, res, db));

    router.delete('/delete/localArtigo', (req, res) => deleteLocalizacao(req, res, db));

    return router;
}

module.exports = createRouter;