with (import <nixpkgs> {});
rec {
  quote-server = mkYarnPackage {
    name = "quote-server";
    src = ./.;
    packageJSON = ./package.json;
    yarnLock = ./yarn.lock;
    yarnNix = ./yarn.nix;
  };
}
