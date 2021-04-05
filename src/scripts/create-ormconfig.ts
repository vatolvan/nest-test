import * as fs from 'fs';

const cfg = fs.readFileSync('./ormconfig.json');
const config = JSON.parse(cfg.toString());

// Overwrite config from envs
const updatedConfig = {
  ...config,
  url: process.env.DATABASE_URL || config.url,
};

fs.writeFileSync('./ormconfig.json', JSON.stringify(updatedConfig));
