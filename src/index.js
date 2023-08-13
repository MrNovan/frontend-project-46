import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import ast from './format/index.js';
import compare from './build.js';

const fixturesPrefix = '__fixtures__/';

const getPath = (filename) => path.resolve(process.cwd(), fixturesPrefix + filename);

const getFileFormat = (filename) => path.extname(filename).slice(1);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

const getDiff = (file1, file2, formatName = 'stylish') => {
  const path1 = getPath(file1);
  const data1 = parse(readFile(path1), getFileFormat(file1));

  const path2 = getPath(file2);
  const data2 = parse(readFile(path2), getFileFormat(file2));

  const diff = compare(data1, data2);
  const formattedDiff = ast(diff, formatName);
  return formattedDiff;
};

export default getDiff;
