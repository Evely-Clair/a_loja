const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

// Initialize Supabase client
const supabase = createClient('your-supabase-url', 'your-supabase-key');

async function executeQuery(sql, params, res) {
  try {
    const { data, error } = await supabase.rpc(sql, params);  // Use the Supabase RPC or select method based on your query needs
    if (error) {
      console.log('Database query error:', error);
      return res.status(500).json({ status: 'error', message: error.message });
    }
    if (data.length === 0) {
      return res.status(404).json({ status: 'not_found', message: 'Product not found' });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('Query execution error:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
}

async function getArtigoByBarcode(req, res) {
  const barcode = req.query.barcode;
  const { data, error } = await supabase
    .from('Artigos_T')
    .select(`
      *, 
      Marcas_T(marca), 
      Fornecedores_T(nome AS fornecedor),
      CategoriasArtigos_T(categoriaPrincipal),
      FamiliasArtigos_T(familia),
      SubFamilias_T(subfamilia)
    `)
    .eq('idArtigo', barcode)
    .single(); // Use .single() to fetch a single row
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  if (!data) {
    return res.status(404).json({ status: 'not_found', message: 'Product not found' });
  }
  res.status(200).json(data);
}

async function getArtigoByEAN(req, res) {
  const barcode = req.params.barcode;
  const { data, error } = await supabase
    .from('Artigos_T')
    .select(`
      *, 
      Marcas_T(marca), 
      Fornecedores_T(nome AS fornecedor),
      CategoriasArtigos_T(categoriaPrincipal),
      FamiliasArtigos_T(familia),
      SubFamilias_T(subfamilia)
    `)
    .eq('EAN', barcode)
    .limit(100);
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json(data);
}

async function getArtigoBySearch(req, res) {
  const search = `%${req.query.search}%`;
  const query = supabase
    .from('Artigos_T')
    .select(`
      *, 
      Marcas_T(marca), 
      Fornecedores_T(nome AS fornecedor),
      CategoriasArtigos_T(categoriaPrincipal),
      FamiliasArtigos_T(familia),
      SubFamilias_T(subfamilia)
    `)
    .ilike('idArtigo', search); // Use ilike for case-insensitive LIKE queries

  // Add dynamic filters based on query parameters
  if (req.query.marca) {
    query.eq('idMarca', req.query.marca);
  }
  if (req.query.fornecedor) {
    query.eq('idFornecedor', req.query.fornecedor);
  }
  if (req.query.categoria) {
    query.eq('idCategoriaP', req.query.categoria);
  }
  if (req.query.familia) {
    query.eq('idFamilia', req.query.familia);
  }
  if (req.query.subfamilia) {
    query.eq('idSubFamilia', req.query.subfamilia);
  }

  const { data, error } = await query;
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json(data);
}

async function getMarca(req, res) {
  const { data, error } = await supabase.from('Marcas_T').select('idMarca, marca');
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json(data);
}

async function getCategoria(req, res) {
  const { data, error } = await supabase.from('CategoriasArtigos_T').select('idCategoria, categoriaPrincipal');
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json(data);
}

async function getFornecedor(req, res) {
  const { data, error } = await supabase.from('Fornecedores_T').select('idFornecedor, nome');
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json(data);
}

async function getFamilia(req, res) {
  const { data, error } = await supabase.from('FamiliasArtigos_T').select('idFamilia, familia');
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json(data);
}

async function getSubfamilia(req, res) {
  const { data, error } = await supabase.from('SubFamilias_T').select('idSubFamilia, subfamilia');
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json(data);
}

async function getArtigoLocalizacao(req, res) {
  const barcode = req.params.barcode;
  const { data, error } = await supabase
    .from('LocalizacaoArtigos_T')
    .select(`
      *, 
      Localizacao_T(localizacao), 
      SubLocalizacao_T(sublocalizacao), 
      Posicao_T(posicao)
    `)
    .eq('idArtigo', barcode);
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json(data);
}

async function getLocais(req, res) {
  const { data, error } = await supabase.from('Localizacao_T').select('*');
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json(data);
}

async function getSublocais(req, res) {
  const idLocal = req.params.idLocal;
  const { data, error } = await supabase
    .from('SubLocalizacao_T')
    .select('*')
    .eq('idLocalizacao', idLocal);
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json(data);
}

async function getPosicoes(req, res) {
  const idSubLocal = req.params.idSubLocal;
  const { data, error } = await supabase
    .from('Posicao_T')
    .select('*')
    .eq('idSubLocalizacao', idSubLocal);
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json(data);
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
