// migrations/2_deploy.js
const SampleToken = artifacts.require('SampleToken');

module.exports = async function (deployer) {
  await deployer.deploy(SampleToken, 'MAXIRA', 'MXR', '10000000000000000000000');
};