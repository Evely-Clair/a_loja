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

async function deleteLocalizacao(req, res, db) {
    const sql = 'DELETE FROM localizacaoartigos_t WHERE idArtigo =? AND idLocalizacaoArtigos = ?;';
    try {
        const promises = req.body.map(item => {
            return executeQuery(sql, [item.idArtigo, item.idLocalizacaoArtigos], db);
        });
        const results = await Promise.all(promises);
        res.json({ success: true, message: "All updates completed.", results });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ success: false, message: 'An error occurred.', error });
    }
};
  
module.exports = {
    deleteLocalizacao,
};