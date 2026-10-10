{
  description = "Patient preparation app: Axum and Svelte development environment";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-26.05";
    nixpkgs-unstable.url = "nixpkgs/nixos-unstable";

    surrealdb = {
      url = "github:surrealdb/surrealdb";
      flake = true;
    };
  };

  outputs = {
    nixpkgs,
    nixpkgs-unstable,
    surrealdb,
    ...
  }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {
      inherit system;
      config.allowUnfree = true;
    };
    pkgs-unstable = import nixpkgs-unstable {
      inherit system;
      config.allowUnfree = true;
    };
  in {
    devShells.${system}.default = pkgs.mkShell {
      packages = with pkgs; [
        cargo
        rustc
        rustfmt
        openssl
        pkg-config
        websocat
        # surrealdb.packages.${system}.default
        mkcert
        clippy
        nodejs_24
        # Keep rustup's proxy binaries after the matching Nix tools.
        rustup
      ];
      # ++ (with pkgs-unstable; [
      #   surrealist
      # ]);
    };
  };
}
