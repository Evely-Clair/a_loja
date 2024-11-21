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

function getArtigoByBarcode(req, res, db) {
  const barcode = req.query.barcode;
  const sql = `
    SELECT a.*, m.marca, f.nome AS fornecedor, c.categoriaPrincipal, fa.familia, s.subfamilia
    FROM Artigos_T a
    JOIN Marcas_T m ON a.idMarca = m.idMarca
    JOIN Fornecedores_T f ON a.idFornecedor = f.idFornecedor
    JOIN CategoriasArtigos_T c ON a.idCategoriaP = c.idCategoria
    JOIN FamiliasArtigos_T fa ON a.idFamilia = fa.idFamilia
    JOIN SubFamilias_T s ON a.idSubFamilia = s.idSubFamilia
    WHERE a.idArtigo = ?
    GROUP BY a.idArtigo;
  `;
  executeQuery(sql, [barcode], res, db);
}

function getArtigoByEAN(req, res, db) {
  const barcode = req.params.barcode;
  const sql = `
    SELECT a.*, m.marca, f.nome AS fornecedor, c.categoriaPrincipal, fa.familia, s.subfamilia
    FROM Artigos_T a
    JOIN Marcas_T m ON a.idMarca = m.idMarca
    JOIN Fornecedores_T f ON a.idFornecedor = f.idFornecedor
    JOIN CategoriasArtigos_T c ON a.idCategoriaP = c.idCategoria
    JOIN FamiliasArtigos_T fa ON a.idFamilia = fa.idFamilia
    JOIN SubFamilias_T s ON a.idSubFamilia = s.idSubFamilia
    WHERE a.EAN = ?
    GROUP BY a.idArtigo limit 100;
  `;
  executeQuery(sql, [barcode], res, db);
}

function getArtigoBySearch(req, res, db) {
  console.log('REQ QUERY:',req.query.length);
  const search = `%${req.query.search}%`;
  let params = [search];
  let sql = `
    SELECT a.*, m.marca, f.nome AS fornecedor, c.categoriaPrincipal, fa.familia, s.subfamilia
    FROM Artigos_T a
    JOIN Marcas_T m ON a.idMarca = m.idMarca
    JOIN Fornecedores_T f ON a.idFornecedor = f.idFornecedor
    JOIN CategoriasArtigos_T c ON a.idCategoriaP = c.idCategoria
    JOIN FamiliasArtigos_T fa ON a.idFamilia = fa.idFamilia
    JOIN SubFamilias_T s ON a.idSubFamilia = s.idSubFamilia
    WHERE a.idArtigo LIKE ? `;

  if (Object.keys(req.query).length === 1) {
    sql += ` OR m.marca LIKE ? OR f.nome LIKE ? OR c.categoriaPrincipal LIKE ? OR fa.familia LIKE ? OR s.subfamilia LIKE ?`;
    params = [search, search, search, search, search, search];
  }else{
    if (req.query.marca) {
      sql += ` AND m.idMarca = ?`;
      params.push(req.query.marca);
    }
    if (req.query.fornecedor) {
      sql += ` AND f.idFornecedor = ?`;
      params.push(req.query.fornecedor);
    }
    if (req.query.categoria) {
      sql += ` AND c.idCategoria = ?`;
      params.push(req.query.categoria);
    }
    if (req.query.familia) {
      sql += ` AND fa.idFamilia = ?`;
      params.push(req.query.familia);
    }
    if (req.query.subfamilia) {
      sql += ` AND s.idSubfamilia = ?`;
      params.push(req.query.subfamilia);
    }
  }
  sql += ` GROUP BY a.idArtigo;`;
  executeQuery(sql, params, res, db);
}

function getMarca (req, res, db) {executeQuery('SELECT idMarca, marca FROM Marcas_T', [], res, db);};
function getCategoria(req, res, db) {executeQuery('SELECT idCategoria, categoriaPrincipal FROM CategoriasArtigos_T', [], res, db);}
function getFornecedor(req, res, db) {executeQuery('SELECT idFornecedor, nome FROM Fornecedores_T', [], res, db);}
function getFamilia(req, res, db) {executeQuery('SELECT idFamilia, familia FROM FamiliasArtigos_T', [], res, db);}
function getSubfamilia(req, res, db) {executeQuery('SELECT idSubFamilia, subfamilia FROM SubFamilias_T', [], res, db);}

function getArtigoLocalizacao(req, res, db) {
  const barcode = req.params.barcode;
  const sql = `
    SELECT l.*, lo.localizacao, sub.sublocalizacao, p.posicao
    FROM LocalizacaoArtigos_T l
    JOIN Localizacao_T lo ON l.idLocalizacao = lo.idLocalizacao
    JOIN SubLocalizacao_T sub ON l.idSubLocalizacao = sub.idSubLocalizacao
    JOIN Posicao_T p ON l.idPosicao = p.idPosicao
    WHERE idArtigo = ?;
  `;
  executeQuery(sql, [barcode], res, db);
}

function getLocais(req, res, db) {executeQuery('SELECT * FROM Localizacao_T',[],res, db);}

function getSublocais(req, res, db) {
  const idLocal = req.params.idLocal;
  const sql = `SELECT * FROM SubLocalizacao_T WHERE idLocalizacao = ?;  `;
  executeQuery(sql,[idLocal],res, db);
}

function getPosicoes(req, res, db) {
  const idSubLocal = req.params.idSubLocal;
  const sql = `SELECT * FROM Posicao_T WHERE idSubLocalizacao = ?;`;
  executeQuery(sql,[idSubLocal],res, db);
}

module.exports = {
  getArtigoByBarcode,
  getArtigoBySearch,
  getArtigoLocalizacao,
  getLocais,
  getSublocais,
  getPosicoes,
  getMarca,
  getCategoria,
  getFornecedor,
  getFamilia,
  getSubfamilia,
};