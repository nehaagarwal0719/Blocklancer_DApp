const freelancer = artifacts.require("freelancer");

module.exports = function(deployer) {
  deployer.deploy(freelancer);
};