Meteor.methods({
  'jasmine/environmentInfo': function () {
    var mirrorInfo = {
      isMirror: isMirror(),
      isTestPackagesMode: isTestPackagesMode()
    };

    if (isTestPackagesMode()) {
      mirrorInfo.parentUrl = process.env.ROOT_URL
    } else {
      mirrorInfo.parentUrl = process.env.PARENT_URL
    }

    return mirrorInfo
  }
})
