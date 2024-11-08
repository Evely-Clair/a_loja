const express = require('express');
const router = express.Router();


function executeQuery(sql, params, res, db) {
  console.log('Executing SQL:', sql, params);
  db.query(sql, params, (error, results) => {
    if (error) {
      console.log('Database query error:', error);
      return res.status(500).json({ status: 'error', message: JSON.stringify(error) });
    }
    if (results.length === 0) {
      return res.status(404).json({ status: 'not_found', message: 'Product not found' });
    }
    res.status(200).json(results);
  });
}
function updateQT (req, res, db) {
  const barcode = req.params.barcode; 
  const quantity = req.body.qt; 
  const sql = 'UPDATE Artigos_T SET qt = ? WHERE idArtigo = ?';
  executeQuery(sql, [quantity, barcode], res, db);
};

function updateLocalArtigo (req, res, db) {
  const idLocalizacaoArtigos = req.body.idLocalizacaoArtigos;
  const idArtigo = req.body.idArtigo;
  const idLocalizacao = req.body.idLocalizacao;
  const idSublocalizacao = req.body.idSublocalizacao;
  const idPosicao = req.body.idPosicao;
  const qtLocal = req.body.qtLocal;
  const sql = `
    UPDATE localizacaoartigos_t SET idLocalizacao = ? idSublocalizacao = ? idPosicao = ? qtLocal = ?
    WHERE idArtigo = ? AND idLocalizacaoArtigos = ?;
  `;
  executeQuery(sql,[idLocalizacao,idSublocalizacao,idPosicao, qtLocal, idArtigo, idLocalizacaoArtigos], res, db);
}

module.exports = {
  updateQT,
  updateLocalArtigo
};