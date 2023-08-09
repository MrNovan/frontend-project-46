import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import ast from './format/index.js';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keysSorted = _.sortBy(_.union(keys1, keys2));

  const result = keysSorted.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: compare(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'changed', value1: data1[key], value2: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });

  return result;
};

const getPath = (filename) => path.resolve(process.cwd(), filename);

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
