const Generator = require('yeoman-generator');
const DotfilesGenerator = require.resolve('generator-dotfiles/generators/app');
const augmentPackageJson = require('generator-dotfiles/utilities/augmentPackageJson');

const MyBase = class extends Generator {
  copyTemplateFiles() {
    // Copy all non-dotfiles
    this.fs.copy(
      // If dotfiles are reintroduced
      // then repeat this section with '.*'
      this.templatePath('**/*'),
      this.destinationRoot()
    );
  };
  decoratePackageJsonBeforeInstall() {
    const packageJsonAugmentation = {
      name: 'express',
      description: 'A basic express project',
      main: 'app.js',
      dependencies: {
        express: '^4.16.4'
      },
    };
    augmentPackageJson(packageJsonAugmentation, this.destinationPath('package.json'));
  };
};

module.exports = class extends MyBase {
  initializing() {
    this.composeWith(DotfilesGenerator);
  };

  writing() {
    this.copyTemplateFiles();
    this.config.save();
  }

  install() {
    this.decoratePackageJsonBeforeInstall();
    this.npmInstall();
  }
};

