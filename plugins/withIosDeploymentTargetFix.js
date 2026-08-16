const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const MIN_DEPLOYMENT_TARGET = '26.0';

function withIosDeploymentTargetFix(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfilePath, 'utf-8');

      const patch = `    # @generated withIosDeploymentTargetFix
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |build_config|
        if Gem::Version.new(build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] || '0') < Gem::Version.new('${MIN_DEPLOYMENT_TARGET}')
          build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '${MIN_DEPLOYMENT_TARGET}'
        end
      end
    end
`;

      if (!contents.includes('@generated withIosDeploymentTargetFix')) {
        contents = contents.replace(
          /post_install do \|installer\|/,
          `post_install do |installer|\n${patch}`
        );
        fs.writeFileSync(podfilePath, contents);
      }

      return config;
    },
  ]);
}

module.exports = withIosDeploymentTargetFix;