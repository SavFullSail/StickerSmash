const { withXcodeProject } = require('@expo/config-plugins');

const APP_DEPLOYMENT_TARGET = '26.0';

function setAppDeploymentTarget(project, deploymentTarget) {
  const { Target } = require('@expo/config-plugins').IOSConfig;
  const { getBuildConfigurationsForListId } = require('@expo/config-plugins').IOSConfig.XcodeUtils;

  const targetBuildConfigListIds = Target.getNativeTargets(project)
    .filter(([, target]) => Target.isTargetOfType(target, Target.TargetType.APPLICATION))
    .map(([, target]) => target.buildConfigurationList);

  for (const buildConfigListId of targetBuildConfigListIds) {
    for (const [, configurations] of getBuildConfigurationsForListId(project, buildConfigListId)) {
      const { buildSettings } = configurations;
      if (buildSettings?.IPHONEOS_DEPLOYMENT_TARGET) {
        buildSettings.IPHONEOS_DEPLOYMENT_TARGET = deploymentTarget;
      }
    }
  }

  return project;
}

function withIosDeploymentTargetFix(config) {
  return withXcodeProject(config, (config) => {
    config.modResults = setAppDeploymentTarget(config.modResults, APP_DEPLOYMENT_TARGET);
    return config;
  });
}

module.exports = withIosDeploymentTargetFix;
