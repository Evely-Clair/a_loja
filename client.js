const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');  
const createRouter = require('./backend/routes.js');

const supabase = createClient(
  process.env.SUPABASE_URL,    
  process.env.SUPABASE_KEY     
);

const port = process.env.PORT || 3001;
const app = express()
  .use(cors({ origin: '*' }))
  .use(bodyParser.json())
  .use('/api', createRouter(supabase));  

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

testConnection();