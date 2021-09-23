//https://javascript.plainenglish.io/bundling-monorepos-the-right-way-34116aa50433
import path from 'path';
import fs from 'fs';
import minimist from 'minimist';
import { getPackages } from '@lerna/project';
import {filterPackages} from '@lerna/filter-packages';
import batchPackages from '@lerna/batch-packages';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import buble from '@rollup/plugin-buble'

import ts from 'rollup-plugin-typescript2'

/**
 * @param {string}[scope] - packages to only build (if you don't
 *    want to build everything)
 * @param {string}[ignore] - packages to not build
 *
 * @returns {string[]} - sorted list of Package objects that
 *    represent packages to be built.
 */
async function getSortedPackages(scope, ignore) {    
  const packages = await getPackages(__dirname);    
  let filtered = filterPackages(packages,
    scope,
    ignore,
    false,);     
  //console.info('filtered', filtered);
  return batchPackages(filtered)
    .reduce((arr, batch) => arr.concat(batch), []);
}

async function main() {
    const config = [];
    // Support --scope and --ignore globs if passed in via commandline
    const { scope, ignore } = minimist(process.argv.slice(2));
    const packages = await getSortedPackages(scope, ignore);
    packages.forEach(pkg => {
      /* Absolute path to package directory */
      const basePath = path.relative(__dirname, pkg.location);
      /* Absolute path to input file */
      const input = path.join(basePath, 'src/index.ts');
      if (!fs.existsSync(input)) {
        console.error('Main Input Not Found For ' + input);
        return;
      }
      /* "main" field from package.json file. */
      const { main, module } = pkg.toJSON();

      const plugins = [
        nodeResolve(),
        ts({
          objectHashIgnoreUnknownHack: true,
          tsconfig: 'tsconfig.json',
          tsconfigOverride: {
            include: [path.join(basePath, 'src'), path.resolve(__dirname, '@types')],
            compilerOptions: {
                moduleResolution: 'node',
                target: 'esnext',
                module: 'esnext',
                jsx: 'react',
                lib: ['esnext'],
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
                declaration: true,
                rootDir: path.join(basePath, 'src'),
                baseUrl: path.join(basePath, 'src'),
            },
        },
        }),
        buble({ transforms: { asyncAwait: false }, objectAssign: true }),
      ];

      const outputs = [];
      if (main) {
        outputs.push({
          file: path.join(basePath, main),
          format: 'cjs',
          exports: 'named',
          sourcemap: true,
      })
      } else {
        outputs.push({
            dir: path.resolve(basePath, 'dist'),
        })
    }

    if (module) {
      outputs.push({
          file: path.join(basePath, module),
          format: 'esm',
          sourcemap: true,
      })
  }

      /* Push build config for this package. */
      config.push({
        input,
        output: outputs,
        plugins,
        external(name) {
          return (
              (pkg.dependencies && name in pkg.dependencies) ||
              (pkg.peerDependencies && name in pkg.peerDependencies) ||
              (pkg.optionalDependencies && name in pkg.optionalDependencies)
          )
      },
    });
  })
    return config;
  }

export default main();