#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-v, --version', 'output the version number')
  .action((filepath1, filepath2) => {
    const options = program.opts().format;
    const result = gendiff(filepath1, filepath2, options);
    console.log(result);
  });
program.parse();