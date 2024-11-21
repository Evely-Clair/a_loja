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

async function insertLocalizacao(req, res, db) {
  const sql = 'INSERT INTO LocalizacaoArtigos_T (idLocalizacaoArtigos, idArtigo, idLocalizacao, idSubLocalizacao, idPosicao, qtLocal) VALUES (?,?,?,?,?,?,)';
  try {
    const promises = req.body.map(item => {
      return executeQuery(sql, [ item.idLocalizacaoArtigos, item.idArtigo, item.idLocalizacao, item.idSubLocalizacao, item.idPosicao, item.qtLocal], db);
    });
    
    const results = await Promise.all(promises);
    res.json({ success: true, message: "All updates completed.", results });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ success: false, message: 'An error occurred.', error });
  }
};
  
module.exports = {
    insertLocalizacao,
};