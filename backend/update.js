const express = require('express');
const router = express.Router();

function executeQuery(sql, params, db) {
  return new Promise((resolve, reject) => {
    console.log('Executing SQL:', sql, params);
    db.query(sql, params, (error, results) => {
      if (error) {
        console.log('Database query error:', error);
        return reject(error);
      }
      resolve(results);
    });
  });
}


function updateQT (req, res, db) {
  const barcode = req.params.barcode; 
  const quantity = req.body.qt; 
  const stock = req.body.stockloja;
  const sql = 'UPDATE Artigos_T SET qt = ?, stockloja = ?  WHERE idArtigo = ?';
  executeQuery(sql, [quantity, stock, barcode], db, res);
};

async function updateLocalArtigo(req, res, db) {
  const idArtigo = req.params.idArtigo;
  const sql = `
    UPDATE localizacaoartigos_t SET idLocalizacao = ?, idSublocalizacao = ?, idPosicao = ?, qtLocal = ?
    WHERE idArtigo = ? AND idLocalizacaoArtigos = ?;
  `;

  try {
    const promises = req.body.map(item => {
      return executeQuery(sql, [item.idLocalizacao, item.idSubLocalizacao, item.idPosicao, item.qtLocal, idArtigo, item.idLocalizacaoArtigos], db);
    });
    
    const results = await Promise.all(promises);
    res.json({ success: true, message: "All updates completed.", results });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ success: false, message: 'An error occurred.', error });
  }
}

module.exports = {
  updateQT,
  updateLocalArtigo
};